import { useParams, Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Phone, ArrowLeft, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import CTABanner from "../../components/CTABanner";
import { SERVICES } from "./serviceData";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading font-bold text-2xl mb-4">Service Not Found</h1>
          <Link to="/services"><Button>Back to Services</Button></Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link to="/services" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to All Services
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <span className="text-xs font-heading font-semibold uppercase tracking-widest text-primary">Service</span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4 max-w-3xl">
            {service.title}
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl">{service.tagline}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div>
                <h2 className="font-heading font-bold text-xl md:text-2xl mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{service.desc}</p>
                <p className="text-muted-foreground leading-relaxed">{service.longDesc}</p>
              </div>

              {/* What's Included */}
              <div>
                <h2 className="font-heading font-bold text-xl mb-4">What's Included</h2>
                <ul className="space-y-3">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gallery */}
              <div>
                <h2 className="font-heading font-bold text-xl mb-4">Project Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {service.gallery.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden aspect-video sm:aspect-square">
                      <img src={img} alt={`${service.title} project ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Case Study */}
              <div className="bg-secondary rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Quote className="w-5 h-5 text-primary" />
                  <span className="text-xs font-heading font-semibold uppercase tracking-widest text-primary">Case Study</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-3">{service.caseStudy.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">{service.caseStudy.summary}</p>
                <div className="inline-flex items-center gap-2 bg-primary/20 text-primary text-sm font-heading font-semibold rounded-lg px-4 py-2">
                  {service.caseStudy.result}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-5">
              {/* Ideal For */}
              <div className="bg-muted/50 rounded-xl p-5 border border-border">
                <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-3">Ideal For</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.ideal}</p>
              </div>

              {/* Key Benefits */}
              <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-primary mb-3">Key Benefits</h3>
                <ul className="space-y-2">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Card */}
              <div className="bg-secondary rounded-xl p-5 space-y-4">
                <h3 className="font-heading font-bold text-white text-base">Ready to get started?</h3>
                <p className="text-white/60 text-sm">Get a free estimate for your {service.title.toLowerCase()} project. We respond within 24 hours.</p>
                <Link to="/quote">
                  <Button className="w-full font-heading font-semibold gap-2">
                    Request a Quote
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href="tel:+15152009559" className="flex items-center justify-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
                  <Phone className="w-4 h-4" />
                  (515) 200-9559
                </a>
              </div>

              {/* Other Services */}
              <div className="rounded-xl border border-border p-5">
                <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-3">Other Services</h3>
                <ul className="space-y-2">
                  {SERVICES.filter((s) => s.slug !== slug).slice(0, 5).map((s) => (
                    <li key={s.slug}>
                      <Link to={`/services/${s.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ArrowRight className="w-3 h-3 shrink-0" />
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to="/services" className="inline-flex items-center gap-1 text-xs text-primary font-semibold mt-3 hover:underline">
                  View all services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title={`Get a Free Estimate for ${service.title}`}
        subtitle="Our team will review your project and respond with a detailed quote within 24 hours."
        primaryText="Request a Quote"
      />
    </>
  );
}