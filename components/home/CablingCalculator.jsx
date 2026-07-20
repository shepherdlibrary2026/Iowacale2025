import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calculator, ArrowRight, TrendingDown, Clock, Shield, Zap, Info } from "lucide-react";

const FACILITY_TYPES = [
  { label: "Office", value: "office", dropDensity: 1, downtimeCost: 150 },
  { label: "Warehouse", value: "warehouse", dropDensity: 0.3, downtimeCost: 200 },
  { label: "Retail", value: "retail", dropDensity: 0.5, downtimeCost: 300 },
  { label: "Healthcare", value: "healthcare", dropDensity: 1.2, downtimeCost: 400 },
  { label: "Education", value: "education", dropDensity: 0.8, downtimeCost: 100 },
];

function Slider({ label, value, min, max, step, onChange, format, hint }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="text-sm font-bold text-primary">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-primary"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function ResultCard({ icon: Icon, label, value, sub, highlight }) {
  return (
    <div className={`rounded-xl border p-4 flex flex-col gap-1 ${highlight ? "bg-primary/5 border-primary/20" : "bg-card border-border"}`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`w-4 h-4 ${highlight ? "text-primary" : "text-muted-foreground"}`} />
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className={`font-heading font-bold text-xl ${highlight ? "text-primary" : "text-foreground"}`}>{value}</p>
      {sub && <p className="text-xs text-muted-foreground leading-tight">{sub}</p>}
    </div>
  );
}

export default function CablingCalculator() {
  const [sqft, setSqft] = useState(5000);
  const [drops, setDrops] = useState(50);
  const [facilityType, setFacilityType] = useState("office");
  const [age, setAge] = useState(5);

  const facility = FACILITY_TYPES.find((f) => f.value === facilityType);

  const results = useMemo(() => {
    // Suggested drops based on sq footage + facility type
    const suggestedDrops = Math.round(sqft * facility.dropDensity * 0.01);

    // Annual downtime cost savings (professional vs DIY)
    // DIY installations avg 3x more downtime incidents, each incident = 2hrs
    const incidentsPerYear = drops * 0.08; // 8% of drops cause issues/year in poor installs
    const hoursPerIncident = 2;
    const annualDowntimeHours = incidentsPerYear * hoursPerIncident;
    const annualDowntimeSavings = annualDowntimeHours * facility.downtimeCost;

    // Troubleshooting time savings (labeled, documented infrastructure)
    const troubleshootingHoursSaved = drops * 0.5; // ~30min saved per drop per year
    const itHourlyRate = 75;
    const troubleshootingSavings = troubleshootingHoursSaved * itHourlyRate;

    // 5-year lifespan benefit (pro install lasts 15-20 yrs vs 5-8 for DIY)
    const reinstallCostPerDrop = 85;
    const lifespan5YrSavings = drops * reinstallCostPerDrop * 0.4; // 40% chance DIY needs redo in 5 yrs

    const totalAnnualSavings = annualDowntimeSavings + troubleshootingSavings;
    const total5YrSavings = totalAnnualSavings * 5 + lifespan5YrSavings;

    // Scalability: how many more drops the infrastructure can support
    const scalabilityHeadroom = Math.round(drops * 1.5);

    // Est install time for professional vs DIY
    const professionalDays = Math.ceil(drops / 20);
    const diyDays = Math.ceil(drops / 5);

    return {
      suggestedDrops,
      annualDowntimeSavings: Math.round(annualDowntimeSavings),
      troubleshootingSavings: Math.round(troubleshootingSavings),
      totalAnnualSavings: Math.round(totalAnnualSavings),
      total5YrSavings: Math.round(total5YrSavings),
      scalabilityHeadroom,
      professionalDays,
      diyDays,
      dropsPerAP: Math.max(1, Math.round(sqft / 2500)),
    };
  }, [sqft, drops, facilityType, age]);

  const fmt = (n) => `$${n.toLocaleString()}`;

  return (
    <section className="py-16 md:py-24 bg-muted/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold uppercase tracking-widest text-primary mb-3">
            <Calculator className="w-3.5 h-3.5" /> ROI Calculator
          </span>
          <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl mb-4">
            See What Professional Cabling Saves You
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            Adjust the inputs below to estimate your annual savings, downtime reduction, and long-term infrastructure benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Inputs */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-8">
            <div>
              <h3 className="font-heading font-semibold text-base mb-1">Your Facility</h3>
              <p className="text-xs text-muted-foreground mb-5">Tell us about your space to get tailored estimates.</p>

              {/* Facility Type */}
              <div className="mb-6">
                <label className="text-sm font-medium block mb-2">Facility Type</label>
                <div className="flex flex-wrap gap-2">
                  {FACILITY_TYPES.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFacilityType(f.value)}
                      className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                        facilityType === f.value
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-7">
                <Slider
                  label="Square Footage"
                  value={sqft}
                  min={500}
                  max={50000}
                  step={500}
                  onChange={setSqft}
                  format={(v) => `${v.toLocaleString()} sq ft`}
                  hint={`Recommended: ~${results.suggestedDrops} drops for this space`}
                />
                <Slider
                  label="Number of Cable Drops"
                  value={drops}
                  min={5}
                  max={500}
                  step={5}
                  onChange={setDrops}
                  format={(v) => `${v} drops`}
                />
                <Slider
                  label="Current Infrastructure Age"
                  value={age}
                  min={0}
                  max={20}
                  step={1}
                  onChange={setAge}
                  format={(v) => v === 0 ? "New / None" : `${v} yrs`}
                  hint={age >= 10 ? "⚠️ Infrastructure over 10 years old may be limiting your network speeds." : undefined}
                />
              </div>
            </div>

            {/* Disclaimer */}
            <div className="flex gap-2 bg-muted/60 rounded-lg p-3 text-xs text-muted-foreground">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>Estimates based on industry averages for commercial environments. Actual savings vary by facility, current infrastructure quality, and IT environment.</span>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {/* Big number */}
            <div className="bg-secondary text-secondary-foreground rounded-2xl p-6 md:p-8 text-center">
              <p className="text-white/60 text-sm font-medium mb-2">Estimated 5-Year Value</p>
              <p className="font-heading font-bold text-4xl md:text-5xl text-white mb-1">
                {fmt(results.total5YrSavings)}
              </p>
              <p className="text-white/50 text-xs">in savings, avoided downtime & deferred reinstall costs</p>
            </div>

            {/* Result grid */}
            <div className="grid grid-cols-2 gap-3">
              <ResultCard
                icon={TrendingDown}
                label="Annual Savings"
                value={fmt(results.totalAnnualSavings)}
                sub="Downtime + IT troubleshooting time saved"
                highlight
              />
              <ResultCard
                icon={Clock}
                label="Install Time"
                value={`${results.professionalDays}–${results.professionalDays + 1} days`}
                sub={`vs. ${results.diyDays}+ days for DIY`}
              />
              <ResultCard
                icon={Zap}
                label="Scale Headroom"
                value={`+${results.scalabilityHeadroom} drops`}
                sub="Capacity your infrastructure can grow into"
              />
              <ResultCard
                icon={Shield}
                label="Wi-Fi APs Supported"
                value={`${results.dropsPerAP} APs`}
                sub="Recommended for full coverage"
              />
            </div>

            {/* Breakdown */}
            <div className="bg-card border border-border rounded-xl p-5 space-y-3">
              <h4 className="font-heading font-semibold text-sm">Annual Savings Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Downtime prevention</span>
                  <span className="font-medium">{fmt(results.annualDowntimeSavings)}/yr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">IT troubleshooting time</span>
                  <span className="font-medium">{fmt(results.troubleshootingSavings)}/yr</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between text-sm font-semibold">
                  <span>Total Annual</span>
                  <span className="text-primary">{fmt(results.totalAnnualSavings)}/yr</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/quote"
              className="flex items-center justify-between w-full bg-primary text-primary-foreground rounded-xl px-5 py-4 hover:bg-primary/90 transition-colors group"
            >
              <div>
                <p className="font-heading font-semibold text-sm">Ready to get started?</p>
                <p className="text-xs text-primary-foreground/70">Get a free quote for your {sqft.toLocaleString()} sq ft project</p>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}