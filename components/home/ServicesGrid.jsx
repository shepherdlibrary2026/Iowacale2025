import { Link } from "react-router-dom";
import { Cable, Network, Zap, Server, Wifi, Camera, ArrowRightLeft, LayoutGrid } from "lucide-react";
import SectionHeading from "../SectionHeading";

const SERVICES = [
  { icon: Cable, title: "Structured Cabling", desc: "Complete commercial cabling installs for new construction, renovations, and expansions." },
  { icon: Network, title: "CAT6 / CAT6A Drops", desc: "High-performance copper drops for workstations, phones, printers, and network devices." },
  { icon: Zap, title: "Fiber Optic Runs", desc: "Single-mode and multi-mode fiber backbone installs with precision terminations." },
  { icon: Server, title: "Patch Panels & Racks", desc: "Organized rack buildouts, patch panel installs, and cable management solutions." },
  { icon: LayoutGrid, title: "Network Closet Buildout", desc: "Turn-key network closet design, organization, and equipment mounting." },
  { icon: Wifi, title: "Wi-Fi AP Installation", desc: "Commercial access point mounting, cabling, and deployment for seamless coverage." },
  { icon: Camera, title: "Camera / CCTV Prewire", desc: "Security camera prewire for IP and analog surveillance systems." },
  { icon: ArrowRightLeft, title: "MAC Work", desc: "Moves, adds, and changes for existing structured cabling systems." },
];

export default function ServicesGrid() {
  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="Our Services"
          title="Commercial Cabling & Low-Voltage Solutions"
          description="From cable drops to fiber terminations, we build dependable network foundations for Iowa businesses."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s) => (
            <Link
              key={s.title}
              to="/services"
              className="group bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-base mb-2 text-foreground group-hover:text-primary transition-colors">
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}