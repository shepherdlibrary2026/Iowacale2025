import { Link } from "react-router-dom";
import { Building2, Store, Warehouse, GraduationCap, Church, Building, Briefcase, MapPin, ArrowRight } from "lucide-react";
import SectionHeading from "../SectionHeading";

const INDUSTRIES = [
  { icon: Building2, label: "Offices" },
  { icon: Store, label: "Retail" },
  { icon: Warehouse, label: "Warehouses" },
  { icon: GraduationCap, label: "Schools" },
  { icon: Church, label: "Churches" },
  { icon: Building, label: "Property Mgmt" },
  { icon: Briefcase, label: "Commercial" },
  { icon: MapPin, label: "Multi-Location" },
];

export default function IndustriesServed() {
  return (
    <section className="py-20 md:py-28 bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="Industries We Serve"
          title="Cabling Solutions for Every Commercial Space"
          description="We partner with businesses, contractors, and property managers across Iowa to deliver reliable network infrastructure."
          light
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.label}
              className="flex flex-col items-center gap-3 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-white/10 transition-all duration-300"
            >
              <ind.icon className="w-7 h-7 text-primary" />
              <span className="text-sm font-medium text-white/80">{ind.label}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/industries"
            className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            See all industries we serve
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}