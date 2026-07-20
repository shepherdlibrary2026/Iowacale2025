import { Shield, Award, Clock, Wrench, CheckCircle, Zap } from "lucide-react";
import SectionHeading from "../SectionHeading";

const REASONS = [
  { icon: Shield, title: "Licensed & Insured", desc: "Fully licensed low-voltage contractor with comprehensive insurance for every project." },
  { icon: Award, title: "Quality Workmanship", desc: "Clean, organized installs that meet industry standards and exceed client expectations." },
  { icon: Clock, title: "Fast Response Time", desc: "Quick turnaround on quotes, site visits, and project starts — we respect your timeline." },
  { icon: Wrench, title: "Full-Service Capability", desc: "From initial cable pull to final testing and labeling, we handle the complete scope." },
  { icon: CheckCircle, title: "Tested & Certified", desc: "Every cable drop is tested, labeled, and certified to ensure reliable performance." },
  { icon: Zap, title: "Scalable Solutions", desc: "Infrastructure designed for growth — easily add drops, access points, and capacity." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="Why Choose Us"
          title="Clean Installs. Organized Racks. Strong Connections."
          description="Iowa Structure Cabling Solution LLC delivers dependable infrastructure you can rely on."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {REASONS.map((r) => (
            <div key={r.title} className="flex gap-4">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <r.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-base mb-1.5">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}