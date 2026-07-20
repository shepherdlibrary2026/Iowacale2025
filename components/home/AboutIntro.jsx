import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const HIGHLIGHTS = [
  "Organized, labeled, and documented cabling",
  "Commercial environments — offices, retail, warehouses",
  "Scalable infrastructure for business growth",
  "Tested and certified cable drops",
];

export default function AboutIntro({ rackImage }) {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden">
              <img
                src={rackImage}
                alt="Organized network rack with clean cable management"
                className="w-full h-80 md:h-96 object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-xl p-4 md:p-5 shadow-xl hidden sm:block">
              <p className="font-heading font-bold text-2xl">100%</p>
              <p className="text-xs text-primary-foreground/80">Tested & Certified</p>
            </div>
          </div>

          <div>
            <span className="inline-block text-xs font-heading font-semibold uppercase tracking-widest text-primary mb-3">
              About Our Company
            </span>
            <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
              Commercial Structured Cabling Done Right
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Iowa Structure Cabling Solution LLC is a dedicated low-voltage contractor serving commercial clients throughout Iowa. We specialize in structured cabling installations, fiber optic runs, network closet buildouts, and everything in between.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our focus is simple: deliver clean, professional installations that businesses can depend on for years. Every cable is labeled, every drop is tested, and every rack is organized.
            </p>

            <ul className="space-y-3 mb-8">
              {HIGHLIGHTS.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-foreground/80">{h}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Learn more about us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}