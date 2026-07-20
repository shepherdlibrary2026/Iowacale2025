import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, User, Mail, Phone, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import InterviewSchedulerModal from "@/components/admin/InterviewSchedulerModal";

const STATUSES = ["New", "Reviewing", "Interview Scheduled", "Hired", "Not Selected"];

const STATUS_COLORS = {
  "New": "bg-blue-100 text-blue-700 border-blue-200",
  "Reviewing": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Interview Scheduled": "bg-purple-100 text-purple-700 border-purple-200",
  "Hired": "bg-green-100 text-green-700 border-green-200",
  "Not Selected": "bg-red-100 text-red-700 border-red-200",
};

function StatusSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-xs rounded-md border border-input bg-background px-2 py-1 focus:outline-none focus:ring-1 focus:ring-ring font-medium"
    >
      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
    </select>
  );
}

function ApplicationRow({ app, onStatusChange }) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(app.status || "New");
  const [saving, setSaving] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);

  const handleStatusChange = async (newStatus) => {
    if (newStatus === "Interview Scheduled") {
      setPendingStatus(newStatus);
      return;
    }
    setSaving(true);
    await base44.entities.JobApplication.update(app.id, { status: newStatus });
    setStatus(newStatus);
    onStatusChange(app.id, newStatus);
    setSaving(false);
  };

  const handleInterviewConfirm = async () => {
    setSaving(true);
    await base44.entities.JobApplication.update(app.id, { status: "Interview Scheduled" });
    setStatus("Interview Scheduled");
    onStatusChange(app.id, "Interview Scheduled");
    setPendingStatus(null);
    setSaving(false);
  };

  return (
    <>
    {pendingStatus === "Interview Scheduled" && (
      <InterviewSchedulerModal
        app={app}
        onConfirm={handleInterviewConfirm}
        onCancel={() => setPendingStatus(null)}
      />
    )}
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Summary Row */}
      <div className="flex items-center gap-4 p-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <p className="font-heading font-semibold text-sm">{app.firstName} {app.lastName}</p>
          <p className="text-xs text-muted-foreground truncate">{app.positionApplied}</p>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
          <Mail className="w-3 h-3" />{app.email}
        </div>
        <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
          <Phone className="w-3 h-3" />{app.phone}
        </div>
        <div className="hidden lg:flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />{new Date(app.created_date).toLocaleDateString()}
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[status]}`}>{status}</span>
        <StatusSelect value={status} onChange={handleStatusChange} />
        {saving && <RefreshCw className="w-3 h-3 animate-spin text-muted-foreground" />}
        <button onClick={() => setExpanded(!expanded)} className="text-muted-foreground hover:text-foreground transition-colors">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

    {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-border bg-muted/30 p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <Detail label="Email" value={app.email} />
          <Detail label="Phone" value={app.phone} />
          <Detail label="Address" value={[app.address, app.city, app.state, app.zip].filter(Boolean).join(", ")} />
          <Detail label="Desired Pay" value={app.desiredPay} />
          <Detail label="Available Start" value={app.availableStart} />
          <Detail label="Employment Type" value={app.employmentType} />
          <Detail label="Authorized to Work (US)" value={app.authorizedToWork} />
          <Detail label="Requires Sponsorship" value={app.requireSponsorship} />
          <Detail label="Prev. Employed Here" value={app.everWorkedHere} />
          <Detail label="Education" value={app.highestEducation} />
          <Detail label="School" value={app.schoolName} />
          <Detail label="Field of Study" value={app.fieldOfStudy} />
          <Detail label="Years Experience" value={app.yearsExperience} />
          <Detail label="Current Employer" value={app.currentEmployer} />
          <Detail label="Current Title" value={app.currentTitle} />
          <Detail label="Reason for Leaving" value={app.reasonForLeaving} />
          <Detail label="Certifications" value={app.certifications} />
          <Detail label="Tools" value={app.tools} />
          <Detail label="Driver's License" value={app.driversLicense} />
          <Detail label="Own Vehicle" value={app.ownVehicle} />
          <Detail label="Available Days" value={Array.isArray(app.availableDays) ? app.availableDays.join(", ") : app.availableDays} />
          <Detail label="Hours/Week" value={app.hoursPerWeek} />
          <Detail label="Willing to Travel" value={app.willingToTravel} />
          <Detail label="Conviction Record" value={app.convictionRecord} />
          {app.convictionDetails && <Detail label="Conviction Details" value={app.convictionDetails} />}
          <Detail label="Military Service" value={app.militaryService} />
          <Detail label="Ref 1" value={app.ref1Name ? `${app.ref1Name} (${app.ref1Relation}) — ${app.ref1Phone}` : null} />
          <Detail label="Ref 2" value={app.ref2Name ? `${app.ref2Name} (${app.ref2Relation}) — ${app.ref2Phone}` : null} />
          <Detail label="How They Heard" value={app.hearAboutUs} />
          {app.additionalInfo && <Detail label="Additional Info" value={app.additionalInfo} span />}
          {app.resumeUrl && (
            <div className="col-span-full">
              <p className="text-xs text-muted-foreground mb-1">Resume</p>
              <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-primary text-xs underline">View Resume</a>
            </div>
          )}
        </div>
      )}
    </div>
    </>
  );
}

function Detail({ label, value, span }) {
  if (!value) return null;
  return (
    <div className={span ? "col-span-full" : ""}>
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}

export default function ApplicationsDashboard() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then((u) => setUser(u));
    loadApps();
  }, []);

  const loadApps = async () => {
    setLoading(true);
    const data = await base44.entities.JobApplication.list("-created_date", 200);
    setApps(data);
    setLoading(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setApps((prev) => prev.map((a) => a.id === id ? { ...a, status: newStatus } : a));
  };

  if (user && user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-2xl font-heading font-bold mb-2">Access Denied</p>
          <p className="text-muted-foreground text-sm">This page is restricted to admins only.</p>
        </div>
      </div>
    );
  }

  const filtered = apps.filter((a) => {
    const matchSearch = search === "" ||
      `${a.firstName} ${a.lastName} ${a.email} ${a.positionApplied}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = apps.filter((a) => a.status === s).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-muted/30 pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-heading font-bold text-2xl md:text-3xl">Job Applications</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{apps.length} total applications</p>
          </div>
          <Button variant="outline" size="sm" onClick={loadApps} className="gap-2">
            <RefreshCw className="w-4 h-4" /> Refresh
          </Button>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(filterStatus === s ? "All" : s)}
              className={`rounded-xl border p-3 text-left transition-all ${filterStatus === s ? "border-primary bg-primary/5" : "bg-card border-border hover:border-primary/30"}`}
            >
              <p className="text-lg font-heading font-bold">{counts[s] || 0}</p>
              <p className="text-xs text-muted-foreground leading-tight">{s}</p>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or position..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="All">All Statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <User className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No applications found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((app) => (
              <ApplicationRow key={app.id} app={app} onStatusChange={handleStatusChange} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}