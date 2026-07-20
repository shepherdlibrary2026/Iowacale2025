import QuoteForm from "../QuoteForm";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

const CONTACT_INFO = [
  { icon: Phone, label: "Call Us", value: "(515) 200-9559", href: "tel:+15152009559" },
  { icon: Mail, label: "Email", value: "info@iowacabling.com", href: "mailto:info@iowacabling.com" },
  { icon: Clock, label: "Hours", value: "Mon–Fri: 7AM–5PM" },
  { icon: MapPin, label: "Service Area", value: "All of Iowa" },
];

export default function HomeContactSection() {
  return (
    <section className="py-20 md:py-28" id="contact-form">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          <div className="lg:col-span-2">
            <span className="inline-block text-xs font-heading font-semibold uppercase tracking-widest text-primary mb-3">
              Get in Touch
            </span>
            <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
              Let's Talk About Your Project
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Whether you need a few cable drops or a full network buildout, we're here to help. Fill out the form and our team will respond within 24 hours.
            </p>

            <div className="space-y-5">
              {CONTACT_INFO.map((c) => (
                <div key={c.label} className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <QuoteForm compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}