import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { CheckCircle, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SERVICES = [
  { label: "Structured Cabling Install", icon: "🔧" },
  { label: "CAT6 / CAT6A Drops", icon: "🌐" },
  { label: "Fiber Runs & Terminations", icon: "💡" },
  { label: "Patch Panels & Rack Cleanup", icon: "🗄️" },
  { label: "Network Closet Buildout", icon: "🏗️" },
  { label: "Wi-Fi AP Installation", icon: "📡" },
  { label: "Camera / CCTV Prewire", icon: "📷" },
  { label: "Low-Voltage MAC Work", icon: "⚡" },
  { label: "Other", icon: "📋" },
];

const SQFT = [
  "Under 2,000 sq ft",
  "2,000–5,000 sq ft",
  "5,000–15,000 sq ft",
  "15,000–50,000 sq ft",
  "50,000+ sq ft",
];

const TIMELINES = [
  { label: "Immediately", sub: "ASAP — urgent need" },
  { label: "Within 2 weeks", sub: "Very soon" },
  { label: "Within 1 month", sub: "Upcoming project" },
  { label: "1–3 months", sub: "Planning ahead" },
  { label: "Planning stage", sub: "Just exploring options" },
];

const INFRA = [
  { label: "New construction — no cabling yet", sub: "Brand new build" },
  { label: "Existing cabling — needs upgrade", sub: "Replacing old infrastructure" },
  { label: "Partial — some cabling in place", sub: "Expanding existing setup" },
  { label: "Unknown / Need assessment", sub: "Not sure what's there" },
];

const STEPS = ["Service", "Facility", "Timeline", "Infrastructure", "Contact"];

function OptionCard({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
        selected
          ? "border-primary bg-primary/5 text-foreground"
          : "border-border bg-background hover:border-primary/40 hover:bg-muted/50"
      }`}
    >
      {children}
    </button>
  );
}

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-1 mb-8">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-1">
          <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold transition-all ${
            i < current ? "bg-primary text-primary-foreground" :
            i === current ? "bg-primary text-primary-foreground ring-4 ring-primary/20" :
            "bg-muted text-muted-foreground"
          }`}>
            {i < current ? "✓" : i + 1}
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-6 h-0.5 ${i < current ? "bg-primary" : "bg-border"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function MultiStepQuoteForm() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [data, setData] = useState({
    service_type: "",
    square_footage: "",
    timeline: "",
    infrastructure_status: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    notes: "",
  });

  const set = (field, value) => setData((p) => ({ ...p, [field]: value }));

  const canNext = () => {
    if (step === 0) return !!data.service_type;
    if (step === 1) return !!data.square_footage;
    if (step === 2) return !!data.timeline;
    if (step === 3) return !!data.infrastructure_status;
    if (step === 4) return data.name && data.email && data.phone;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    await base44.functions.invoke("submitLead", data);
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="py-10 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-heading font-bold text-xl">Request Submitted!</h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Thanks, <strong>{data.name}</strong>! We'll review your project details and get back to you within 24 hours.
        </p>
        <p className="text-xs text-muted-foreground">Check your email for a confirmation from us.</p>
      </div>
    );
  }

  return (
    <div>
      <StepIndicator current={step} />

      {/* Step 0 — Service */}
      {step === 0 && (
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-lg mb-1">What service do you need?</h3>
          <p className="text-sm text-muted-foreground mb-4">Select the option that best fits your project.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SERVICES.map((s) => (
              <OptionCard key={s.label} selected={data.service_type === s.label} onClick={() => set("service_type", s.label)}>
                <span className="mr-2">{s.icon}</span>
                <span className="text-sm font-medium">{s.label}</span>
              </OptionCard>
            ))}
          </div>
        </div>
      )}

      {/* Step 1 — Square Footage */}
      {step === 1 && (
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-lg mb-1">How large is your facility?</h3>
          <p className="text-sm text-muted-foreground mb-4">This helps us estimate project scope and pricing.</p>
          <div className="space-y-2">
            {SQFT.map((s) => (
              <OptionCard key={s} selected={data.square_footage === s} onClick={() => set("square_footage", s)}>
                <span className="text-sm font-medium">{s}</span>
              </OptionCard>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 — Timeline */}
      {step === 2 && (
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-lg mb-1">What's your project timeline?</h3>
          <p className="text-sm text-muted-foreground mb-4">When are you hoping to get started?</p>
          <div className="space-y-2">
            {TIMELINES.map((t) => (
              <OptionCard key={t.label} selected={data.timeline === t.label} onClick={() => set("timeline", t.label)}>
                <p className="text-sm font-medium">{t.label}</p>
                <p className="text-xs text-muted-foreground">{t.sub}</p>
              </OptionCard>
            ))}
          </div>
        </div>
      )}

      {/* Step 3 — Infrastructure */}
      {step === 3 && (
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-lg mb-1">What's your current infrastructure status?</h3>
          <p className="text-sm text-muted-foreground mb-4">Tell us what you're working with.</p>
          <div className="space-y-2">
            {INFRA.map((i) => (
              <OptionCard key={i.label} selected={data.infrastructure_status === i.label} onClick={() => set("infrastructure_status", i.label)}>
                <p className="text-sm font-medium">{i.label}</p>
                <p className="text-xs text-muted-foreground">{i.sub}</p>
              </OptionCard>
            ))}
          </div>
        </div>
      )}

      {/* Step 4 — Contact */}
      {step === 4 && (
        <div className="space-y-4">
          <h3 className="font-heading font-bold text-lg mb-1">Almost done — how do we reach you?</h3>
          <p className="text-sm text-muted-foreground mb-4">We'll send your quote summary to this information.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm mb-1.5 block">Full Name <span className="text-destructive">*</span></Label>
              <Input value={data.name} onChange={(e) => set("name", e.target.value)} placeholder="John Smith" />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">Company</Label>
              <Input value={data.company} onChange={(e) => set("company", e.target.value)} placeholder="Acme Corp" />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">Email <span className="text-destructive">*</span></Label>
              <Input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="john@example.com" />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">Phone <span className="text-destructive">*</span></Label>
              <Input type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(515) 000-0000" />
            </div>
          </div>
          <div>
            <Label className="text-sm mb-1.5 block">Additional Notes</Label>
            <textarea
              value={data.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Anything else we should know about your project..."
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <Button variant="outline" onClick={() => setStep((s) => s - 1)} disabled={step === 0} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        {step < 4 ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext()} className="gap-2">
            Next <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={!canNext() || loading} className="gap-2 px-6">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        )}
      </div>
    </div>
  );
}