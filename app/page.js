import HeroSlider from "@/components/home/hero-slider";
import FeaturedProducts from "@/components/home/featured-products";
import Testimonials from "@/components/home/testimonials";
import InstagramFeed from "@/components/home/instagram-feed";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <FeaturedProducts />
      <Testimonials />
      <InstagramFeed />
    </>
  );
}
