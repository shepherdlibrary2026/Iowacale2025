import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import usePageSEO from "../hooks/usePageSEO";
import CTABanner from "../components/CTABanner";
import { SERVICES } from "./services/serviceData";

export default function Services() {
  usePageSEO({
    title: "Cabling Services | CAT6, Fiber, Wi-Fi & Low-Voltage — Iowa Structure Cabling Solution",
    description: "Commercial structured cabling services in Iowa: CAT6/CAT6A drops, fiber optic runs & terminations, patch panels, rack cleanup, Wi-Fi AP installation, CCTV prewire, and low-voltage MAC work.",
    keywords: "CAT6 cabling Iowa, fiber optic termination Iowa, patch panel installation Iowa, rack cleanup Iowa, Wi-Fi AP installation Iowa, CCTV prewire Iowa, structured cabling services Iowa, low-voltage MAC work Iowa",
  });
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-xs font-heading font-semibold uppercase tracking-widest text-primary mb-3">Services</span>
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Structured Cabling & Low-Voltage Services
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg">
            Professional commercial cabling services for Iowa businesses. From cable drops to fiber terminations, we deliver clean, reliable infrastructure.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
          {SERVICES.map((s, i) => (
            <div key={s.title} id={s.title.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-24">
              <div className={`grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <s.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="font-heading font-bold text-xl md:text-2xl">{s.title}</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">{s.desc}</p>

                  <div className="mb-6">
                    <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground mb-3">What's Included</h3>
                    <ul className="space-y-2">
                      {s.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-muted/50 rounded-xl p-5 border border-border">
                    <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-2">Ideal For</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.ideal}</p>
                  </div>
                  <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                    <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-primary mb-3">Key Benefits</h3>
                    <ul className="space-y-2">
                      {s.benefits.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-foreground/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to={`/services/${s.slug}`} className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-primary hover:text-primary/80 transition-colors">
                    Learn more about this service
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {i < SERVICES.length - 1 && <hr className="mt-16 border-border" />}
            </div>
          ))}
        </div>
      </section>

      <CTABanner
        title="Need a Custom Cabling Solution?"
        subtitle="Every project is different. Tell us about yours and we'll provide a detailed estimate."
        primaryText="Get an Estimate"
      />
    </>
  );
}