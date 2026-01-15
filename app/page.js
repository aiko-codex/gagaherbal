import HeroSlider from "@/components/home/hero-slider";
import FeaturedProducts from "@/components/home/featured-products";
import Testimonials from "@/components/home/testimonials";
import InstagramFeed from "@/components/home/instagram-feed";
import UniqueSellingPoints from "@/components/home/unique-selling-points";
import FAQSection from "@/components/home/faq-section";
import ContactSection from "@/components/home/contact-section";
import BrandsSection from "@/components/home/brands-section";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <UniqueSellingPoints />
      <FeaturedProducts />
      <Testimonials />
      <BrandsSection />
      <InstagramFeed />
      <FAQSection />
      <ContactSection />
    </>
  );
}
