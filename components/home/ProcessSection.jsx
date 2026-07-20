import SectionHeading from "../SectionHeading";
import { ClipboardList, Eye, HardHat, CheckCircle } from "lucide-react";

const STEPS = [
  { icon: ClipboardList, step: "01", title: "Request a Quote", desc: "Tell us about your project — scope, timeline, and building details." },
  { icon: Eye, step: "02", title: "Site Visit & Assessment", desc: "We visit your location, assess the layout, and finalize the scope of work." },
  { icon: HardHat, step: "03", title: "Professional Installation", desc: "Our team installs your cabling with clean, organized, and labeled runs." },
  { icon: CheckCircle, step: "04", title: "Testing & Handoff", desc: "Every drop is tested, certified, and documented before final handoff." },
];

export default function ProcessSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="Our Process"
          title="From Quote to Completion — Simple & Reliable"
          description="We make structured cabling easy. Here's how a typical project works with Iowa Structure Cabling Solution."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <div key={s.step} className="relative">
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-px border-t-2 border-dashed border-primary/20 -translate-x-6" />
              )}
              <div className="bg-card rounded-xl p-6 border border-border h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="font-heading font-bold text-2xl text-primary/20">{s.step}</span>
                </div>
                <h3 className="font-heading font-semibold text-base mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}