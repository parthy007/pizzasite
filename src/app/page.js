import About from "@/components/layout/About";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeader from "@/components/layout/SectionHeader";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <About />
      <section className="text-center mt-16">
        <SectionHeader subHeader={"Don't hesitate"} mainHeader={"Contact Us"} />
        <div className="mt-6">
          <a
            href="tel:+91 8743523745"
            className="text-gray-500 text-4xl underline font-bold"
          >
            +91 8743523745
          </a>
        </div>
      </section>
    </>
  );
}
