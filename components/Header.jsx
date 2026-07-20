import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Cable } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Industries", path: "/industries" },
  { label: "Our Work", path: "/projects" },
  { label: "Blog", path: "/blog" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
  { label: "My Applications", path: "/portal" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary shadow-sm border-b border-primary/30`}
    >
      {/* Top bar */}
      <div className="hidden md:block bg-primary/80 text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-1.5 flex justify-between items-center text-xs">
          <span className="opacity-80 text-white/80">Serving Iowa's Commercial Cabling Needs</span>
          <a href="tel:+15152009559" className="flex items-center gap-1.5 hover:text-white/80 transition-colors text-white">
            <Phone className="w-3 h-3" />
            (515) 200-9559
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Cable className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <span className="font-heading font-bold text-sm md:text-base text-white block">
                Iowa Structure Cabling
              </span>
              <span className="text-[10px] md:text-xs text-white/60 tracking-wide uppercase">
                Solution LLC
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === link.path
                    ? "text-white bg-white/20"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+15152009559" className="text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">(515) 200-9559</span>
            </a>
            <Link to="/quote">
              <Button size="sm" className="font-heading font-semibold">
                Request a Quote
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md hover:bg-white/10 transition-colors text-white"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-primary border-t border-white/10 shadow-lg">
          <div className="px-4 py-3 space-y-1 bg-primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === link.path
                    ? "text-white bg-white/20"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border space-y-2">
              <Link to="/quote" className="block">
                <Button className="w-full font-heading font-semibold" size="sm">
                  Request a Quote
                </Button>
              </Link>
              <a href="tel:+15152009559" className="flex items-center justify-center gap-2 py-2 text-sm text-white/80 font-medium">
                <Phone className="w-4 h-4" />
                (515) 200-9559
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}