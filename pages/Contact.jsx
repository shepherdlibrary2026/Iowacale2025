import usePageSEO from "../hooks/usePageSEO";
import QuoteForm from "../components/QuoteForm";
import { Phone, Mail, Clock, MapPin, Zap } from "lucide-react";
import CTABanner from "../components/CTABanner";

const CONTACT_INFO = [
  { icon: Phone, label: "Phone", value: "(515) 200-9559", href: "tel:+15152009559", desc: "Mon–Fri, 7AM–5PM" },
  { icon: Mail, label: "Email", value: "info@iowacabling.com", href: "mailto:info@iowacabling.com", desc: "We respond within 24 hours" },
  { icon: MapPin, label: "Service Area", value: "All of Iowa", desc: "Des Moines, Cedar Rapids, Davenport & more" },
  { icon: Clock, label: "Business Hours", value: "Monday – Friday", desc: "7:00 AM – 5:00 PM" },
];

export default function Contact() {
  usePageSEO({
    title: "Contact Us | Iowa Structure Cabling Solution LLC — Free Estimate",
    description: "Contact Iowa Structure Cabling Solution LLC for a free estimate on your structured cabling or low-voltage project. Serving Des Moines, Cedar Rapids, Davenport, and all of Iowa.",
    keywords: "contact Iowa cabling contractor, free cabling estimate Iowa, Des Moines structured cabling quote, Iowa low-voltage contractor contact",
  });
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-xs font-heading font-semibold uppercase tracking-widest text-primary mb-3">Contact</span>
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg">
            Ready to start your cabling project? Contact us for a free estimate, site visit, or to discuss your needs.
          </p>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {CONTACT_INFO.map((c) => (
              <div key={c.label} className="bg-card rounded-xl border border-border p-5 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <c.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{c.label}</p>
                {c.href ? (
                  <a href={c.href} className="font-heading font-semibold text-sm text-foreground hover:text-primary transition-colors block mb-1">
                    {c.value}
                  </a>
                ) : (
                  <p className="font-heading font-semibold text-sm text-foreground mb-1">{c.value}</p>
                )}
                <p className="text-xs text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Fast Response Banner */}
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-4 mb-16">
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <Zap className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-1">Fast Response for Commercial Clients</h3>
              <p className="text-sm text-muted-foreground">
                Need urgent MAC work, a quick cable drop, or emergency cabling service? Call us directly at{" "}
                <a href="tel:+15152009559" className="text-primary font-semibold">(515) 200-9559</a>{" "}
                and we'll prioritize your request.
              </p>
            </div>
          </div>

          {/* Contact Form + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <h2 className="font-heading font-bold text-xl mb-1">Send Us a Message</h2>
              <p className="text-sm text-muted-foreground mb-6">Tell us about your project and we'll get back to you within 24 hours.</p>
              <QuoteForm compact />
            </div>

            <div>
              <div className="bg-muted rounded-2xl h-72 md:h-80 flex items-center justify-center mb-5">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground font-medium">Serving All of Iowa</p>
                  <p className="text-xs text-muted-foreground mt-1">Des Moines • Cedar Rapids • Davenport • Iowa City • Sioux City</p>
                </div>
              </div>

              <div className="bg-secondary rounded-2xl p-6 text-secondary-foreground">
                <h3 className="font-heading font-semibold text-white text-base mb-2">Service Area Coverage</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Iowa Structure Cabling Solution LLC serves commercial clients across the entire state of Iowa. Whether your project is in Des Moines, Cedar Rapids, Davenport, Iowa City, Waterloo, Sioux City, or anywhere in between — we're available for site visits, estimates, and installations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}