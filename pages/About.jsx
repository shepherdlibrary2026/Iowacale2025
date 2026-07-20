import usePageSEO from "../hooks/usePageSEO";
import { CheckCircle, Shield, Award, Users, Zap, Target, Heart, Wrench, Clock } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import CTABanner from "../components/CTABanner";

const RACK_IMG = "https://media.base44.com/images/public/69dd0ff6dee1d6f234d81e0d/430ee6219_generated_e1936405.png";
const INSTALL_IMG = "https://media.base44.com/images/public/69dd0ff6dee1d6f234d81e0d/e1ad8b444_generated_5f1337c6.png";

const VALUES = [
  { icon: Award, title: "Quality Workmanship", desc: "Every installation meets or exceeds industry standards. We take pride in clean, organized work that performs reliably for years." },
  { icon: Shield, title: "Integrity", desc: "Honest assessments, transparent communication, and reliable execution on every project — no surprises." },
  { icon: Clock, title: "On-Time Delivery", desc: "We respect your timeline. Our streamlined processes and experienced crews keep projects on schedule and on budget." },
  { icon: Zap, title: "Reliability", desc: "Dependable scheduling, responsive communication, and consistent quality that clients and contractors can count on." },
  { icon: Heart, title: "Client-Focused", desc: "We treat your space with care and your deadlines with urgency. Your satisfaction and long-term success drive everything we do." },
  { icon: Wrench, title: "Professionalism", desc: "Background-checked technicians, proper documentation, clean jobsite practices, and full compliance with low-voltage standards." },
];

const TRUST_POINTS = [
  "Licensed & insured low-voltage contractor",
  "Background-checked and trained technicians",
  "Standards-compliant installations (TIA, BICSI, NEC)",
  "Detailed documentation, labeling, and as-builts",
  "Post-install cable testing and certification support",
  "Responsive support for moves, adds, and changes",
  "Experience across commercial environments statewide",
  "Flexible subcontract support for IT and telecom teams",
];

const TARGET_CLIENTS = [
  "Small and mid-sized businesses",
  "Offices and corporate facilities",
  "Retail stores and multi-site chains",
  "Warehouses and light industrial",
  "Schools and churches",
  "Property managers and GCs",
  "IT service providers needing field support",
];

const NAICS = [
  { code: "238210", label: "Electrical Contractors & Wiring Installation" },
  { code: "517810", label: "All Other Telecommunications" },
  { code: "541512", label: "Computer Systems Design Services" },
  { code: "561210", label: "Facilities Support Services" },
];

export default function About() {
  usePageSEO({
    title: "About Us | Iowa Structure Cabling Solution LLC — Iowa Low-Voltage Contractor",
    description: "Learn about Iowa Structure Cabling Solution LLC — a licensed, insured low-voltage contractor serving commercial clients across Iowa with structured cabling, fiber, and network infrastructure services.",
    keywords: "about Iowa structured cabling, low-voltage contractor Iowa, licensed cabling contractor, Iowa network infrastructure, Des Moines structured cabling company",
  });
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-xs font-heading font-semibold uppercase tracking-widest text-primary mb-3">About Us</span>
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Iowa's Dedicated Cabling Partner
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg">
            Professional structured cabling and low-voltage solutions built on quality workmanship, reliability, and a commitment to Iowa's commercial businesses.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-block text-xs font-heading font-semibold uppercase tracking-widest text-primary mb-3">Company Overview</span>
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">Building Iowa's Network Infrastructure</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Iowa Structure Cabling Solution LLC provides professional structured cabling and low-voltage installation services for commercial and institutional clients throughout Iowa. We support new installations, expansions, upgrades, and cleanup projects with a focus on clean workmanship, organized delivery, and dependable execution.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We specialize in structured cabling, fiber and copper backbone work, network closet organization, Wi-Fi access point installation support, CCTV prewire, and low-voltage moves, adds, and changes — helping clients build clean, dependable infrastructure that supports business operations and prepares facilities for growth.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From a single office cable drop to a multi-floor fiber backbone installation, we approach every project with the same commitment to standards compliance, documentation, safety, and customer service that Iowa businesses deserve.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src={INSTALL_IMG} alt="Professional cable installation" className="w-full h-80 md:h-[420px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-8 bg-card border border-border rounded-2xl">
              <Target className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="font-heading font-bold text-xl md:text-2xl mb-3">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                To provide dependable, organized, and high-quality structured cabling and low-voltage solutions that help Iowa businesses stay connected, efficient, and future-ready.
              </p>
            </div>
            <div className="text-center p-8 bg-secondary rounded-2xl">
              <Users className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="font-heading font-bold text-xl md:text-2xl mb-3 text-white">Our Vision</h2>
              <p className="text-white/70 leading-relaxed text-sm md:text-base">
                To become a trusted structured cabling partner in Iowa known for clean installs, responsive service, and long-term client relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Core Values"
            title="What We Stand For"
            description="Our work is guided by values that put quality, professionalism, and client satisfaction at the center of every project."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="flex gap-4 p-6 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-base mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust + Clients */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="rounded-2xl overflow-hidden">
              <img src={RACK_IMG} alt="Organized network rack" className="w-full h-80 md:h-96 object-cover" />
            </div>
            <div>
              <span className="inline-block text-xs font-heading font-semibold uppercase tracking-widest text-primary mb-3">Trust & Reliability</span>
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">Why Clients Trust Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We've earned the trust of general contractors, IT directors, property managers, and business owners across Iowa through consistent quality and dependable service.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TRUST_POINTS.map((p) => (
                  <div key={p} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Clients */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <span className="inline-block text-xs font-heading font-semibold uppercase tracking-widest text-primary mb-3">Who We Serve</span>
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">Our Target Clients</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We work with a wide range of commercial clients across Iowa — from small business owners to general contractors managing large-scale buildouts.
              </p>
              <div className="space-y-2.5">
                {TARGET_CLIENTS.map((c) => (
                  <div key={c} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-foreground/80">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* NAICS + Service Area */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-heading font-semibold text-base mb-4">NAICS Codes</h3>
                <div className="space-y-3">
                  {NAICS.map((n) => (
                    <div key={n.code} className="flex items-start gap-3">
                      <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded font-semibold shrink-0">{n.code}</span>
                      <span className="text-sm text-muted-foreground">{n.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary rounded-2xl p-6">
                <h3 className="font-heading font-semibold text-base text-white mb-3">Service Area</h3>
                <p className="text-sm text-white/70 leading-relaxed mb-2">
                  Des Moines metro · Central Iowa · Statewide project support based on scope
                </p>
                <p className="text-sm text-white/60 leading-relaxed">
                  Including Des Moines, Cedar Rapids, Davenport, Iowa City, Waterloo, Sioux City, Ames, and all surrounding areas.
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-heading font-semibold text-base mb-3">Contact</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Iowa Structure Cabling Solution LLC</p>
                  <p>Des Moines, Iowa</p>
                  <a href="tel:+15152009559" className="block hover:text-primary transition-colors">(515) 200-9559</a>
                  <a href="mailto:info@iowacabling.com" className="block hover:text-primary transition-colors">info@iowacabling.com</a>
                  <a href="https://iowacabling.com" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors">iowacabling.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Partner With Iowa's Cabling Experts"
        subtitle="Let's discuss your next project. We provide free estimates and site visits for commercial clients."
      />
    </>
  );
}