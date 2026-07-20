import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SectionHeading from "./SectionHeading";

const FAQS = [
  {
    q: "What types of structured cabling do you install?",
    a: "We install complete structured cabling systems including CAT5e, CAT6, and CAT6A copper cabling, as well as single-mode and multi-mode fiber optic cabling. Our installations cover horizontal runs, backbone cabling, patch panel terminations, and full network closet buildouts.",
  },
  {
    q: "Do you install CAT6 and CAT6A drops?",
    a: "Yes — CAT6 and CAT6A drops are one of our most common services. We handle everything from running the cable to terminating keystones, mounting wall plates, and testing each drop for certification. CAT6A supports up to 10Gbps speeds and is ideal for future-proofing your network.",
  },
  {
    q: "Can you handle fiber terminations and backbone runs?",
    a: "Absolutely. We install both single-mode and multi-mode fiber optic cable for backbone connections, inter-building links, and data center feeds. Our team performs fusion splicing, connector termination, and OTDR testing to ensure peak performance.",
  },
  {
    q: "Do you provide rack cleanup and patch panel organization?",
    a: "Yes, we specialize in taking messy, disorganized network racks and transforming them into clean, well-managed, and labeled systems. This includes new patch panel installation, cable management, port mapping, and complete documentation.",
  },
  {
    q: "Do you install Wi-Fi access points and camera prewire?",
    a: "We handle the cabling infrastructure for both Wi-Fi access points and security cameras. For Wi-Fi, we run cable drops to each AP location and mount the devices. For cameras, we prewire all camera locations and coordinate with your security vendor for device installation.",
  },
  {
    q: "Do you work with commercial remodels and office expansions?",
    a: "Yes. A large portion of our work involves commercial remodels, tenant improvements, and office expansions. We coordinate with general contractors, electricians, and IT teams to deliver cabling on schedule within the construction timeline.",
  },
  {
    q: "Can we request a site visit and quote?",
    a: "Absolutely! We offer free site visits and estimates for commercial projects across Iowa. Simply fill out our quote request form or give us a call at (515) 200-9559, and we'll schedule a convenient time to assess your project.",
  },
  {
    q: "What areas in Iowa do you serve?",
    a: "We serve commercial clients across the entire state of Iowa, including Des Moines, Cedar Rapids, Davenport, Iowa City, Waterloo, Sioux City, Ames, and all surrounding areas. Contact us to confirm availability for your location.",
  },
];

export default function FAQ() {
  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="FAQ"
          title="Frequently Asked Questions"
          description="Common questions about our structured cabling and low-voltage services."
        />

        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-5">
              <AccordionTrigger className="font-heading font-semibold text-sm md:text-base text-left hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}