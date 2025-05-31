import Header from "../common/Header";
import HeroSection from "./Hero-section";
import FeaturesSection from "./FeaturesSection";
import BenefitsSection from "./BenefitsSection";
import Testimonials from "./Testimonials";
import Pricing from "./Pricing";
import CTASection from "./CTASection";
import Footer from "../common/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}

      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}

      <FeaturesSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Testimonials */}
      <Testimonials />

      {/* Pricing */}
      <Pricing />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
