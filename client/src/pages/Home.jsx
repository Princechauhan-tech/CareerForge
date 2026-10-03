import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Stats from "../components/home/Stats";
import Jobs from "../components/home/Jobs";
import CompanySlider from "../components/home/CompanySlider";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";
import HowItWorks from "../components/home/HowItWorks";
import TopCategories from "../components/home/TopCategories";
const Home = () => {
  return (
    <>
      <Hero />

      <CompanySlider />

      <TopCategories />

      <HowItWorks />

      <Features />

      <Jobs />

      <Stats />

      <Testimonials />

      <CTA />
    </>
  );
};

export default Home;