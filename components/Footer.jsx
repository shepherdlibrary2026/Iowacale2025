import { useState } from "react";
import { Link } from "react-router-dom";
import { Cable, Phone, Mail, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";

const SERVICES = [
  "Structured Cabling",
  "CAT6 / CAT6A Drops",
  "Fiber Optic Runs",
  "Patch Panels & Racks",
  "Network Closet Buildout",
  "Wi-Fi AP Installation",
  "Camera / CCTV Prewire",
  "MAC Work",
];

const LINKS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Industries", path: "/industries" },
  { label: "Our Work", path: "/projects" },
  { label: "Blog", path: "/blog" },
  { label: "Request a Quote", path: "/quote" },
  { label: "Contact", path: "/contact" },
];

function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await base44.entities.Subscriber.create({ email, source: "Footer" });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-heading font-semibold text-white text-base">Stay in the loop</p>
          <p className="text-sm text-white/50 mt-0.5">Get infrastructure tips, industry updates, and exclusive offers.</p>
        </div>
        {submitted ? (
          <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
            <CheckCircle className="w-4 h-4" /> You're subscribed — thanks!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="h-10 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/40 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary w-full md:w-64"
            />
            <button
              type="submit"
              disabled={loading}
              className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-1.5 hover:bg-primary/90 disabled:opacity-50 transition-colors shrink-0"
            >
              {loading ? "..." : <><span>Subscribe</span><ArrowRight className="w-3.5 h-3.5" /></>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Cable className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="leading-tight">
                <span className="font-heading font-bold text-sm text-white block">Iowa Structure Cabling</span>
                <span className="text-[10px] text-white/50 tracking-wide uppercase">Solution LLC</span>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Professional structured cabling and low-voltage solutions for Iowa's commercial businesses. Clean installs. Organized racks. Strong connections.
            </p>
            <div className="space-y-2.5">
              <a href="tel:+15152009559" className="flex items-center gap-2.5 text-sm text-white/70 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" /> (515) 200-9559
              </a>
              <a href="mailto:info@iowacabling.com" className="flex items-center gap-2.5 text-sm text-white/70 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" /> info@iowacabling.com
              </a>
              <div className="flex items-center gap-2.5 text-sm text-white/70">
                <MapPin className="w-4 h-4 text-primary" /> Serving All of Iowa
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {LINKS.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-white/60 hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s}>
                  <Link to="/services" className="text-sm text-white/60 hover:text-primary transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Area */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">Service Areas</h4>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              We provide commercial structured cabling services across Iowa, including Des Moines, Cedar Rapids, Davenport, Iowa City, Sioux City, and surrounding areas.
            </p>
            <Link
              to="/quote"
              className="inline-block bg-primary text-primary-foreground text-sm font-heading font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get a Free Estimate
            </Link>
          </div>
        </div>
      </div>

      {/* Email Capture */}
      <EmailCapture />

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Iowa Structure Cabling Solution LLC. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-white/40">
            <span>Licensed & Insured</span>
            <span>•</span>
            <span>Commercial Low-Voltage Contractor</span>
          </div>
        </div>
      </div>
    </footer>
  );
}