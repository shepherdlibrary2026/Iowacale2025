import usePageSEO from "../hooks/usePageSEO";
import MultiStepQuoteForm from "../components/quote/MultiStepQuoteForm";
import { Link } from "react-router-dom";
import { Phone, Mail, Shield, Clock, CheckCircle, Sparkles, MessageSquare } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Shield, text: "Licensed & Insured" },
  { icon: Clock, text: "Response Within 24 Hours" },
  { icon: CheckCircle, text: "Free Estimates" },
];

export default function Quote() {
  usePageSEO({
    title: "Request a Quote | Iowa Structured Cabling & Low-Voltage Installation",
    description: "Get a free quote for your Iowa structured cabling project. CAT6 drops, fiber runs, network closet buildouts, Wi-Fi AP installation and more. We respond within 24 hours.",
    keywords: "structured cabling quote Iowa, free cabling estimate Iowa, low-voltage contractor quote Iowa, CAT6 installation quote Iowa, network cabling bid Iowa",
  });
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-xs font-heading font-semibold uppercase tracking-widest text-primary mb-3">Get Started</span>
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Request a Quote
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg">
            Tell us about your project and our team will provide a detailed estimate. We respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3 space-y-5">
              {/* AI Assistant CTA */}
              <Link to="/quote-assistant" className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/20 rounded-2xl hover:border-primary/40 hover:bg-primary/10 transition-all group">
                <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-heading font-semibold text-sm">Not sure what you need?</p>
                    <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                      <Sparkles className="w-3 h-3" /> AI
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Chat with our AI Quote Assistant — it'll ask the right questions and generate a quote request for you.</p>
                </div>
                <span className="text-primary text-sm font-semibold group-hover:underline shrink-0">Try it →</span>
              </Link>

              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <h2 className="font-heading font-bold text-xl mb-1">Project Details</h2>
                <p className="text-sm text-muted-foreground mb-6">Answer a few quick questions and we'll get back to you with a detailed estimate.</p>
                <MultiStepQuoteForm />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Card */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-heading font-semibold text-base mb-4">Prefer to Talk?</h3>
                <div className="space-y-4">
                  <a href="tel:+15152009559" className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10 hover:border-primary/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Call Us</p>
                      <p className="text-sm font-semibold">(515) 200-9559</p>
                    </div>
                  </a>
                  <a href="mailto:info@iowacabling.com" className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/20 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email Us</p>
                      <p className="text-sm font-semibold">info@iowacabling.com</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Trust */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-heading font-semibold text-base mb-4">Why Choose Us</h3>
                <div className="space-y-3">
                  {TRUST_ITEMS.map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className="text-sm text-foreground/80">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust copy */}
              <div className="bg-secondary rounded-2xl p-6 text-secondary-foreground">
                <h3 className="font-heading font-semibold text-base text-white mb-3">Your Project Is in Good Hands</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Iowa Structure Cabling Solution LLC is a licensed and insured low-voltage contractor. We specialize exclusively in commercial structured cabling — so you get the focused expertise your project deserves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}