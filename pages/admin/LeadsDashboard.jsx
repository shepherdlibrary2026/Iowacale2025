import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search, RefreshCw, User, Mail, Phone, Calendar,
  ChevronDown, ChevronUp, Building2, FileText, MessageSquare, Save
} from "lucide-react";

const STATUSES = ["New", "Contacted", "Quoted", "Won", "Lost"];

const STATUS_COLORS = {
  "New": "bg-blue-100 text-blue-700 border-blue-200",
  "Contacted": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Quoted": "bg-purple-100 text-purple-700 border-purple-200",
  "Won": "bg-green-100 text-green-700 border-green-200",
  "Lost": "bg-red-100 text-red-700 border-red-200",
};

const SOURCE_LABELS = {
  Lead: "Lead Form",
  QuoteRequest: "Quote Request",
};

function LeadRow({ lead, entityName, onStatusChange }) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(lead.status || "New");
  const [notes, setNotes] = useState(lead.notes || "");
  const [saving, setSaving] = useState(false);
  const [notesDirty, setNotesDirty] = useState(false);

  const handleStatusChange = async (newStatus) => {
    setSaving(true);
    await base44.entities[entityName].update(lead.id, { status: newStatus });
    setStatus(newStatus);
    onStatusChange(lead.id, newStatus);
    setSaving(false);
  };

  const handleSaveNotes = async () => {
    setSaving(true);
    await base44.entities[entityName].update(lead.id, { notes: notes });
    setNotesDirty(false);
    setSaving(false);
  };

  const name = lead.name || `${lead.firstName || ""} ${lead.lastName || ""}`.trim();
  const service = lead.service_type || lead.serviceType || "—";
  const date = lead.created_date ? new Date(lead.created_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Summary Row */}
      <div className="flex items-center gap-3 p-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-heading font-semibold text-sm truncate">{name}</p>
            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border hidden sm:inline">
              {SOURCE_LABELS[entityName] || entityName}
            </span>
          </div>
          {lead.company && (
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <Building2 className="w-3 h-3" /> {lead.company}
            </p>
          )}
        </div>
        <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground shrink-0">
          <Mail className="w-3 h-3" /> {lead.email}
        </div>
        <div className="hidden lg:flex items-center gap-1 text-xs text-muted-foreground shrink-0">
          <Phone className="w-3 h-3" /> {lead.phone}
        </div>
        <div className="hidden xl:flex items-center gap-1 text-xs text-muted-foreground shrink-0">
          <Calendar className="w-3 h-3" /> {date}
        </div>
        <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium shrink-0 ${STATUS_COLORS[status]}`}>
          {status}
        </span>
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="text-xs rounded-md border border-input bg-background px-2 py-1 focus:outline-none focus:ring-1 focus:ring-ring font-medium shrink-0"
        >
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {saving && <RefreshCw className="w-3 h-3 animate-spin text-muted-foreground" />}
        <button onClick={() => setExpanded(!expanded)} className="text-muted-foreground hover:text-foreground transition-colors">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-border bg-muted/20 p-5 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <Detail label="Email" value={lead.email} />
            <Detail label="Phone" value={lead.phone} />
            {lead.company && <Detail label="Company" value={lead.company} />}
            <Detail label="Service Type" value={service} />
            {lead.timeline && <Detail label="Timeline" value={lead.timeline} />}
            {lead.square_footage && <Detail label="Square Footage" value={lead.square_footage} />}
            {lead.infrastructure_status && <Detail label="Infrastructure" value={lead.infrastructure_status} />}
            {lead.project_address && <Detail label="Project Address" value={lead.project_address} />}
            {lead.description && <Detail label="Project Description" value={lead.description} span />}
            <Detail label="Submitted" value={date} />
          </div>

          {/* Internal Notes */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-semibold">Internal Notes</p>
            </div>
            <textarea
              value={notes}
              onChange={(e) => { setNotes(e.target.value); setNotesDirty(true); }}
              placeholder="Add internal notes about this lead (visible to admins only)..."
              rows={3}
              className="w-full rounded-lg border border-input bg-background text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ring resize-none"
            />
            {notesDirty && (
              <Button size="sm" onClick={handleSaveNotes} disabled={saving} className="mt-2 gap-1.5">
                <Save className="w-3.5 h-3.5" />
                {saving ? "Saving..." : "Save Notes"}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
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

export default function LeadsDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterSource, setFilterSource] = useState("All");
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser);
    loadLeads();
  }, []);

  const loadLeads = async () => {
    setLoading(true);
    const [leadData, quoteData] = await Promise.all([
      base44.entities.Lead.list("-created_date", 200),
      base44.entities.QuoteRequest.list("-created_date", 200),
    ]);
    const combined = [
      ...leadData.map((l) => ({ ...l, _source: "Lead" })),
      ...quoteData.map((q) => ({ ...q, _source: "QuoteRequest" })),
    ].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    setLeads(combined);
    setLoading(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status: newStatus } : l));
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

  const filtered = leads.filter((l) => {
    const name = l.name || `${l.firstName || ""} ${l.lastName || ""}`;
    const matchSearch = search === "" ||
      `${name} ${l.email} ${l.company || ""} ${l.service_type || ""}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || l.status === filterStatus;
    const matchSource = filterSource === "All" || l._source === filterSource;
    return matchSearch && matchStatus && matchSource;
  });

  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = leads.filter((l) => l.status === s || (!l.status && s === "New")).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-muted/30 pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-heading font-bold text-2xl md:text-3xl">Leads & Quote Requests</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{leads.length} total submissions</p>
          </div>
          <Button variant="outline" size="sm" onClick={loadLeads} className="gap-2">
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
              placeholder="Search by name, email, company, or service..."
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
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="All">All Sources</option>
            <option value="Lead">Contact Form</option>
            <option value="QuoteRequest">Quote Requests</option>
          </select>
        </div>

        {/* Leads List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No leads found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((lead) => (
              <LeadRow
                key={`${lead._source}-${lead.id}`}
                lead={lead}
                entityName={lead._source}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}