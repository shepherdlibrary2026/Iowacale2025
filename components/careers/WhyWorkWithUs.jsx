import { TrendingUp, Shield, Users, Clock, DollarSign, Wrench } from "lucide-react";

const PERKS = [
  { icon: DollarSign, title: "Competitive Pay", desc: "Above-market wages with performance-based increases and project bonuses." },
  { icon: TrendingUp, title: "Growth Opportunities", desc: "Clear career paths from apprentice to lead technician, foreman, and beyond." },
  { icon: Shield, title: "Benefits Package", desc: "Health insurance, paid time off, and tool allowances for eligible positions." },
  { icon: Wrench, title: "Quality Tools & Equipment", desc: "We provide industry-standard tools so you can focus on doing great work." },
  { icon: Clock, title: "Consistent Work", desc: "Steady project pipeline across Iowa with no seasonal gaps." },
  { icon: Users, title: "Team Culture", desc: "A tight-knit crew that works hard, communicates well, and takes pride in every job." },
];

export default function WhyWorkWithUs() {
  return (
    <section className="py-16 md:py-20 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-heading font-semibold uppercase tracking-widest text-primary mb-3">
            Why Iowa Structure Cabling
          </span>
          <h2 className="font-heading font-bold text-2xl md:text-3xl">Why Work With Us</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PERKS.map((perk) => (
            <div key={perk.title} className="bg-card border border-border rounded-xl p-6 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <perk.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-sm mb-1">{perk.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}