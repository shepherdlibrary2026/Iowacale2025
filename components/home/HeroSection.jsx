import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, CheckCircle } from "lucide-react";

const TRUST_POINTS = [
  "Licensed & Insured",
  "Commercial Focused",
  "Clean Installations",
];

export default function HeroSection({ heroImage }) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Professional structured cabling installation" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/85 to-secondary/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full pt-32 pb-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px w-10 bg-primary" />
            <span className="text-primary text-sm font-heading font-semibold uppercase tracking-widest">
              Iowa's Trusted Cabling Partner
            </span>
          </div>

          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Structured Cabling &{" "}
            <span className="text-primary">Low-Voltage Solutions</span>{" "}
            for Iowa Businesses
          </h1>

          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
            We install reliable network and cabling infrastructure for commercial spaces — from cable drops
            and fiber terminations to organized racks and network closets. Professional installations built for business growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link to="/quote">
              <Button size="lg" className="font-heading font-semibold gap-2 px-8 text-base">
                Request a Quote
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="tel:+16515511174">
              <Button size="lg" variant="outline" className="font-heading font-semibold gap-2 px-8 text-base border-white/20 text-white hover:bg-white/10 hover:text-white">
                <Phone className="w-4 h-4" />
                Call Now
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {TRUST_POINTS.map((point) => (
              <div key={point} className="flex items-center gap-2 text-sm text-white/60">
                <CheckCircle className="w-4 h-4 text-primary" />
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}