import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle, Loader2 } from "lucide-react";

const SERVICE_OPTIONS = [
  "Structured Cabling Install",
  "CAT6 / CAT6A Drops",
  "Fiber Runs & Terminations",
  "Patch Panels & Rack Cleanup",
  "Network Closet Buildout",
  "Wi-Fi AP Installation",
  "Camera / CCTV Prewire",
  "Low-Voltage MAC Work",
  "Other",
];

const TIMELINE_OPTIONS = [
  "Immediately",
  "Within 2 weeks",
  "Within 1 month",
  "1-3 months",
  "Planning stage",
];

export default function QuoteForm({ compact = false }) {
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "",
    project_address: "", service_type: "", timeline: "", description: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.functions.invoke("submitLead", form);
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-heading font-bold text-xl mb-2">Quote Request Received!</h3>
        <p className="text-muted-foreground">
          Thank you! Our team will review your project details and get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className={`grid gap-4 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
        <div>
          <Label htmlFor="name" className="text-sm font-medium mb-1.5 block">Full Name *</Label>
          <Input id="name" required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="John Smith" />
        </div>
        <div>
          <Label htmlFor="company" className="text-sm font-medium mb-1.5 block">Company</Label>
          <Input id="company" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Company name" />
        </div>
        <div>
          <Label htmlFor="email" className="text-sm font-medium mb-1.5 block">Email *</Label>
          <Input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="email@company.com" />
        </div>
        <div>
          <Label htmlFor="phone" className="text-sm font-medium mb-1.5 block">Phone *</Label>
          <Input id="phone" type="tel" required value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(555) 123-4567" />
        </div>
      </div>

      {!compact && (
        <>
          <div>
            <Label htmlFor="address" className="text-sm font-medium mb-1.5 block">Project Address</Label>
            <Input id="address" value={form.project_address} onChange={(e) => update("project_address", e.target.value)} placeholder="123 Main St, Des Moines, IA" />
          </div>

          <div className={`grid gap-4 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Service Needed</Label>
              <Select value={form.service_type} onValueChange={(v) => update("service_type", v)}>
                <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
                <SelectContent>
                  {SERVICE_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Project Timeline</Label>
              <Select value={form.timeline} onValueChange={(v) => update("timeline", v)}>
                <SelectTrigger><SelectValue placeholder="Select timeline" /></SelectTrigger>
                <SelectContent>
                  {TIMELINE_OPTIONS.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </>
      )}

      <div>
        <Label htmlFor="desc" className="text-sm font-medium mb-1.5 block">Project Details</Label>
        <Textarea
          id="desc"
          rows={compact ? 3 : 4}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Tell us about your project — number of drops, building type, any special requirements..."
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full font-heading font-semibold gap-2" size="lg">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {loading ? "Submitting..." : "Get a Free Estimate"}
      </Button>
    </form>
  );
}