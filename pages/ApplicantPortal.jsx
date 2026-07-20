import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  User, Mail, Phone, MapPin, FileText, Upload,
  RefreshCw, CheckCircle, Clock, XCircle, Star,
  Calendar, LogIn, ChevronDown, ChevronUp, Save, Loader2
} from "lucide-react";

const STATUS_CONFIG = {
  "New":                { color: "bg-blue-100 text-blue-700 border-blue-200",   icon: Clock },
  "Reviewing":          { color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: RefreshCw },
  "Interview Scheduled":{ color: "bg-purple-100 text-purple-700 border-purple-200", icon: Calendar },
  "Hired":              { color: "bg-green-100 text-green-700 border-green-200",  icon: CheckCircle },
  "Not Selected":       { color: "bg-red-100 text-red-700 border-red-200",      icon: XCircle },
};

const STATUS_MESSAGES = {
  "New": "Your application has been received and is in the queue for review.",
  "Reviewing": "Our hiring team is currently reviewing your application.",
  "Interview Scheduled": "Great news! You have been selected for an interview. Check your email for details.",
  "Hired": "Congratulations! You have been selected for this position.",
  "Not Selected": "Thank you for applying. We have decided to move forward with other candidates at this time.",
};

function ApplicationCard({ app, onUpdated }) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    phone: app.phone || "",
    address: app.address || "",
    city: app.city || "",
    state: app.state || "",
    zip: app.zip || "",
  });
  const [resumeUrl, setResumeUrl] = useState(app.resumeUrl || "");

  const status = app.status || "New";
  const StatusIcon = STATUS_CONFIG[status]?.icon || Clock;

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setResumeUrl(file_url);
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await base44.functions.invoke("updateApplicantProfile", {
      applicationId: app.id,
      ...form,
      resumeUrl,
    });
    setSaving(false);
    setEditing(false);
    onUpdated({ ...app, ...form, resumeUrl });
  };

  const set = (field, val) => setForm((p) => ({ ...p, [field]: val }));

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      {/* Status banner */}
      <div className={`px-5 py-3 flex items-center gap-2 text-sm font-medium border-b ${STATUS_CONFIG[status]?.color}`}>
        <StatusIcon className="w-4 h-4" />
        <span>{status}</span>
      </div>

      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-heading font-bold text-lg">{app.positionApplied}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Applied {new Date(app.created_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 mt-1"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Status message */}
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed bg-muted/40 rounded-lg px-4 py-3">
          {STATUS_MESSAGES[status]}
        </p>
      </div>

      {/* Expanded section */}
      {expanded && (
        <div className="border-t border-border px-5 pb-5 pt-4 space-y-5">

          {/* Contact Info */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-heading font-semibold text-sm uppercase tracking-wider">Contact Information</h4>
              {!editing && (
                <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => setEditing(true)}>
                  Edit
                </Button>
              )}
            </div>

            {editing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs mb-1 block">Phone</Label>
                  <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(515) 000-0000" className="h-8 text-sm" />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">Street Address</Label>
                  <Input value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="123 Main St" className="h-8 text-sm" />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">City</Label>
                  <Input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Des Moines" className="h-8 text-sm" />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">State</Label>
                  <Input value={form.state} onChange={(e) => set("state", e.target.value)} placeholder="IA" className="h-8 text-sm" />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">ZIP Code</Label>
                  <Input value={form.zip} onChange={(e) => set("zip", e.target.value)} placeholder="50301" className="h-8 text-sm" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{app.phone || "—"}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{[app.address, app.city, app.state, app.zip].filter(Boolean).join(", ") || "—"}</span>
                </div>
              </div>
            )}
          </div>

          {/* Resume */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-3">Resume</h4>
            <div className="flex items-center gap-3 flex-wrap">
              {(resumeUrl || app.resumeUrl) ? (
                <a
                  href={resumeUrl || app.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <FileText className="w-4 h-4" />
                  View Current Resume
                </a>
              ) : (
                <span className="text-sm text-muted-foreground">No resume uploaded</span>
              )}
              <label className="flex items-center gap-1.5 cursor-pointer text-xs font-medium text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md px-3 py-1.5 hover:border-primary/40">
                {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                {uploading ? "Uploading..." : "Upload New Resume"}
                <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleResumeUpload} disabled={uploading} />
              </label>
            </div>
          </div>

          {/* Save / Cancel buttons */}
          {editing && (
            <div className="flex gap-2 pt-1">
              <Button size="sm" onClick={handleSave} disabled={saving} className="gap-1.5">
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ApplicantPortal() {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    base44.auth.isAuthenticated().then(async (authed) => {
      if (authed) {
        const me = await base44.auth.me();
        setUser(me);
        await loadApplications();
      }
      setAuthChecked(true);
      setLoading(false);
    });
  }, []);

  const loadApplications = async () => {
    const res = await base44.functions.invoke("getMyApplications", {});
    setApplications(res.data.applications || []);
  };

  const handleUpdated = (updated) => {
    setApplications((prev) => prev.map((a) => a.id === updated.id ? updated : a));
  };

  if (!authChecked || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <User className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-heading font-bold text-2xl mb-2">Applicant Portal</h1>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            Sign in to view your application status, upload an updated resume, and manage your contact information.
          </p>
          <Button
            size="lg"
            className="font-heading font-semibold gap-2 w-full"
            onClick={() => base44.auth.redirectToLogin(window.location.pathname)}
          >
            <LogIn className="w-4 h-4" />
            Sign In to View Your Applications
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Use the same email address you provided on your application.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-heading font-semibold uppercase tracking-widest text-primary">Applicant Portal</span>
          <h1 className="font-heading font-bold text-2xl md:text-3xl mt-1">My Applications</h1>
          <div className="flex items-center gap-2 mt-1.5 text-sm text-muted-foreground">
            <Mail className="w-3.5 h-3.5" />
            <span>{user.email}</span>
          </div>
        </div>

        {/* Applications */}
        {applications.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-10 text-center">
            <FileText className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-40" />
            <p className="font-heading font-semibold text-lg mb-1">No Applications Found</p>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              We couldn't find any applications associated with <strong>{user.email}</strong>. Make sure you applied using this email address.
            </p>
            <Button variant="outline" className="mt-5" onClick={() => window.location.href = "/careers"}>
              Browse Open Positions
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <ApplicationCard key={app.id} app={app} onUpdated={handleUpdated} />
            ))}
          </div>
        )}

        {/* Help */}
        <div className="mt-8 bg-card border border-border rounded-xl p-5 text-sm text-center text-muted-foreground">
          Questions about your application? Contact us at{" "}
          <a href="tel:+15152009559" className="text-primary font-medium">(515) 200-9559</a> or{" "}
          <a href="mailto:info@iowastructurecabling.com" className="text-primary font-medium">info@iowastructurecabling.com</a>
        </div>
      </div>
    </div>
  );
}