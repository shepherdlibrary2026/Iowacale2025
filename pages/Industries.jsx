import { Building2, Store, Warehouse, GraduationCap, Church, Building, Briefcase, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import usePageSEO from "../hooks/usePageSEO";
import CTABanner from "../components/CTABanner";

const INDUSTRIES = [
  {
    icon: Building2,
    title: "Offices",
    desc: "From single-room offices to multi-floor corporate spaces, we install the cabling backbone that keeps your team connected.",
    services: ["Workstation cable drops", "Conference room connectivity", "Network closet buildout", "Wi-Fi AP installation"],
  },
  {
    icon: Store,
    title: "Retail Stores",
    desc: "POS systems, security cameras, and Wi-Fi all depend on reliable cabling. We wire retail spaces for performance and security.",
    services: ["POS system cabling", "Camera prewire", "Wi-Fi access points", "Back-office network drops"],
  },
  {
    icon: Warehouse,
    title: "Warehouses & Distribution",
    desc: "Large-scale cable runs, fiber backbones, and Wi-Fi coverage for warehouse operations, inventory systems, and shipping areas.",
    services: ["Long-distance cable runs", "Fiber backbone installs", "Warehouse Wi-Fi coverage", "Loading dock connectivity"],
  },
  {
    icon: GraduationCap,
    title: "Schools & Education",
    desc: "Support modern learning environments with reliable network cabling for classrooms, labs, admin offices, and common areas.",
    services: ["Classroom cable drops", "Lab connectivity", "Campus Wi-Fi", "Administrative network"],
  },
  {
    icon: Church,
    title: "Churches & Houses of Worship",
    desc: "Network infrastructure for livestreaming, sound systems, office spaces, and security — installed with respect for your facility.",
    services: ["Sanctuary connectivity", "Office network drops", "Camera prewire", "AV system cabling"],
  },
  {
    icon: Building,
    title: "Property Management",
    desc: "We partner with property managers to keep commercial spaces move-in ready with reliable cabling infrastructure for tenants.",
    services: ["Tenant improvement cabling", "Common area Wi-Fi", "Building-wide fiber", "MAC work for tenant changes"],
  },
  {
    icon: Briefcase,
    title: "Commercial Buildouts",
    desc: "Working alongside general contractors, we deliver the low-voltage cabling scope on new construction and renovation projects.",
    services: ["New construction cabling", "Renovation cable installs", "GC coordination", "Code-compliant installations"],
  },
  {
    icon: MapPin,
    title: "Multi-Location Clients",
    desc: "Consistent cabling standards across all your locations. One trusted contractor for every site — simplifying your vendor management.",
    services: ["Standardized installations", "Multi-site coordination", "Consistent labeling", "Centralized documentation"],
  },
];

export default function Industries() {
  usePageSEO({
    title: "Industries Served | Iowa Structured Cabling for Offices, Warehouses & More",
    description: "Iowa Structure Cabling Solution provides low-voltage cabling for offices, retail stores, warehouses, schools, churches, and commercial buildouts across Iowa.",
    keywords: "office cabling Iowa, warehouse network cabling Iowa, retail cabling contractor, school structured cabling Iowa, commercial buildout low-voltage Iowa, Iowa cabling industries",
  });
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-xs font-heading font-semibold uppercase tracking-widest text-primary mb-3">Industries</span>
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Industries We Serve
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg">
            From offices and retail stores to warehouses and schools — we deliver professional cabling solutions tailored to your industry.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INDUSTRIES.map((ind) => (
              <div key={ind.title} className="bg-card rounded-2xl border border-border p-6 md:p-8 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ind.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-heading font-bold text-lg md:text-xl">{ind.title}</h2>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{ind.desc}</p>
                <div>
                  <h3 className="text-xs font-heading font-semibold uppercase tracking-wider text-foreground mb-2.5">Common Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {ind.services.map((s) => (
                      <span key={s} className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Serving Your Industry Across Iowa"
        subtitle="No matter your industry, we deliver professional cabling solutions built for your environment."
        primaryText="Talk About Your Project"
      />
    </>
  );
}