import { Cable, Camera, Server, Zap, LayoutGrid, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CTABanner from "../components/CTABanner";
import SectionHeading from "../components/SectionHeading";

const RACK_IMG = "https://media.base44.com/images/public/69dd0ff6dee1d6f234d81e0d/430ee6219_generated_e1936405.png";
const INSTALL_IMG = "https://media.base44.com/images/public/69dd0ff6dee1d6f234d81e0d/e1ad8b444_generated_5f1337c6.png";
const FIBER_IMG = "https://media.base44.com/images/public/69dd0ff6dee1d6f234d81e0d/f711406e9_generated_0266877d.png";
const OFFICE_IMG = "https://media.base44.com/images/public/69dd0ff6dee1d6f234d81e0d/38ad82376_generated_43637402.png";
const WIFI_IMG = "https://media.base44.com/images/public/69dd0ff6dee1d6f234d81e0d/31cdd77b9_generated_0dc46246.png";

const PROJECTS = [
  {
    title: "Office Network Cabling — Corporate Headquarters",
    service: "Structured Cabling Install",
    icon: Cable,
    image: INSTALL_IMG,
    result: "120+ CAT6A drops across 3 floors with full patch panel installation, organized racks, and complete documentation. Project completed on schedule with zero rework.",
    scope: ["120+ cable drops", "3-floor buildout", "Patch panel termination", "Cable testing & certification"],
  },
  {
    title: "Retail Camera Prewire — Multi-Location Rollout",
    service: "Camera / CCTV Prewire",
    icon: Camera,
    image: OFFICE_IMG,
    result: "Prewired 45 IP camera locations across 3 retail stores. Clean, concealed runs coordinated with the security vendor for seamless camera installation.",
    scope: ["45 camera locations", "3 retail stores", "Concealed cable runs", "Vendor coordination"],
  },
  {
    title: "Rack Cleanup & Patch Panel Organization",
    service: "Patch Panels & Rack Cleanup",
    icon: Server,
    image: RACK_IMG,
    result: "Transformed a tangled network closet into an organized, documented, and manageable system. Reduced troubleshooting time by 80% and improved airflow significantly.",
    scope: ["Full rack reorganization", "New patch panel install", "Cable management", "Complete re-labeling"],
  },
  {
    title: "Fiber Backbone Install — Industrial Campus",
    service: "Fiber Runs & Terminations",
    icon: Zap,
    image: FIBER_IMG,
    result: "Installed single-mode fiber backbone connecting 4 buildings on a manufacturing campus. Fusion spliced and tested with OTDR results documented.",
    scope: ["4-building campus", "Single-mode fiber", "Fusion splicing", "OTDR testing"],
  },
  {
    title: "Network Closet Upgrade — Medical Office",
    service: "Network Closet Buildout",
    icon: LayoutGrid,
    image: RACK_IMG,
    result: "Designed and built a dedicated network closet for a medical office, including wall-mount rack, UPS, patch panels, and organized cabling for 60+ drops.",
    scope: ["Wall-mount rack install", "UPS placement", "60+ drop termination", "Full documentation"],
  },
  {
    title: "Wi-Fi AP Deployment — Educational Facility",
    service: "Wi-Fi AP Installation",
    icon: Wifi,
    image: WIFI_IMG,
    result: "Deployed 24 commercial-grade access points across a school campus. Cable drops to each AP location, ceiling-mounted, and tested for signal coverage.",
    scope: ["24 access points", "Campus-wide coverage", "Ceiling mount install", "Coverage testing"],
  },
];

export default function Projects() {
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-xs font-heading font-semibold uppercase tracking-widest text-primary mb-3">Our Work</span>
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Featured Projects
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg">
            See examples of the structured cabling and low-voltage work we've completed for Iowa businesses.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          {PROJECTS.map((p, i) => (
            <div key={p.title} className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className={`grid grid-cols-1 lg:grid-cols-2 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className="relative h-64 lg:h-auto">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-secondary/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    <p.icon className="w-3.5 h-3.5" />
                    {p.service}
                  </div>
                </div>
                <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                  <h2 className="font-heading font-bold text-lg md:text-xl mb-3">{p.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{p.result}</p>
                  <div>
                    <h3 className="text-xs font-heading font-semibold uppercase tracking-wider text-foreground mb-3">Project Scope</h3>
                    <div className="flex flex-wrap gap-2">
                      {p.scope.map((s) => (
                        <span key={s} className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABanner
        title="Have a Project Like These?"
        subtitle="Let's discuss your cabling needs. We provide free estimates for commercial projects across Iowa."
        primaryText="Schedule a Site Visit"
      />
    </>
  );
}