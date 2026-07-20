import usePageSEO from "../hooks/usePageSEO";
import HeroSection from "../components/home/HeroSection";
import AboutIntro from "../components/home/AboutIntro";
import ServicesGrid from "../components/home/ServicesGrid";
import WhyChooseUs from "../components/home/WhyChooseUs";
import IndustriesServed from "../components/home/IndustriesServed";
import ProcessSection from "../components/home/ProcessSection";
import ReviewsSection from "../components/home/ReviewsSection";
import CTABanner from "../components/CTABanner";
import HomeContactSection from "../components/home/HomeContactSection";
import FAQ from "../components/FAQ";
import CablingCalculator from "../components/home/CablingCalculator";

const HERO_IMG = "https://media.base44.com/images/public/69dd0ff6dee1d6f234d81e0d/015a0302a_generated_a35b498e.png";
const RACK_IMG = "https://media.base44.com/images/public/69dd0ff6dee1d6f234d81e0d/430ee6219_generated_e1936405.png";

export default function Home() {
  usePageSEO({
    title: "Iowa Structure Cabling Solution LLC | Structured Cabling & Low-Voltage Contractor Iowa",
    description: "Iowa's trusted commercial structured cabling and low-voltage contractor. CAT6 drops, fiber optic runs, network closet buildouts, Wi-Fi AP installation, and CCTV prewire. Free estimates.",
    keywords: "Iowa structured cabling, low-voltage contractor Iowa, CAT6 installation Iowa, fiber optic Iowa, network closet buildout Iowa, commercial cabling Iowa, Des Moines cabling contractor",
  });
  return (
    <>
      <HeroSection heroImage={HERO_IMG} />
      <AboutIntro rackImage={RACK_IMG} />
      <ServicesGrid />
      <WhyChooseUs />
      <IndustriesServed />
      <ProcessSection />
      <ReviewsSection />
      <CablingCalculator />
      <CTABanner />
      <FAQ />
      <HomeContactSection />
    </>
  );
}