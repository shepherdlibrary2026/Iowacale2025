import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

export default function CTABanner({
  title = "Ready to Start Your Cabling Project?",
  subtitle = "Get a free estimate for your commercial structured cabling needs. Our team responds within 24 hours.",
  primaryText = "Request a Quote",
  primaryLink = "/quote",
  showPhone = true,
}) {
  return (
    <section className="bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-20 text-center relative">
        <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-4">
          {title}
        </h2>
        <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-8">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={primaryLink}>
            <Button size="lg" className="font-heading font-semibold gap-2 px-8">
              {primaryText}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          {showPhone && (
            <a href="tel:+15152009559">
              <Button size="lg" variant="outline" className="font-heading font-semibold gap-2 px-8 border-white/20 text-white hover:bg-white/10 hover:text-white">
                <Phone className="w-4 h-4" />
                                Call (515) 200-9559
              </Button>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}