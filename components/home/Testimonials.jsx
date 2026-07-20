import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeading from "../SectionHeading";

const TESTIMONIALS = [
  {
    name: "Mike Reynolds",
    role: "IT Director",
    company: "Reynolds Manufacturing",
    text: "Iowa Structure Cabling Solution handled our entire warehouse cabling project. Clean runs, labeled drops, and organized racks. They finished ahead of schedule and the network has been rock solid.",
  },
  {
    name: "Sarah Chen",
    role: "Facility Manager",
    company: "Heartland Medical Group",
    text: "We needed 200+ CAT6A drops across three floors. Their team was professional, minimally disruptive, and delivered exactly what was promised. Highly recommended for any commercial project.",
  },
  {
    name: "David Martinez",
    role: "General Contractor",
    company: "Prairie Build LLC",
    text: "As a GC, I need cabling subs I can trust. Iowa Structure Cabling shows up on time, keeps a clean site, and their work passes inspection every time. They're my go-to for low-voltage.",
  },
  {
    name: "Karen O'Brien",
    role: "Church Administrator",
    company: "Grace Community Church",
    text: "They installed our network cabling and camera prewire during our building expansion. Very respectful of our space, communicated clearly, and did beautiful work.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  const t = TESTIMONIALS[current];

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="Testimonials"
          title="Trusted by Iowa Businesses"
          description="See what our commercial clients say about working with Iowa Structure Cabling Solution."
        />

        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10 relative">
            <Quote className="w-10 h-10 text-primary/10 absolute top-6 left-6" />

            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-6 italic">
              "{t.text}"
            </p>

            <div>
              <p className="font-heading font-semibold text-foreground">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.role}, {t.company}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-border"}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}