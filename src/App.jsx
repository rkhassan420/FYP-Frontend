import React, { useEffect, lazy, Suspense} from "react";
import Loading from "./components/Loading/Loading";

const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const Hero = lazy(() => import("./components/Hero/Hero"));
const Features = lazy(() => import("./components/Feature/Features"));
const HowItWorks = lazy(() => import("./components/HowItWork/HowItWorks"));
const Roles = lazy(() => import("./components/Roles/Roles"));
const Advantages = lazy(() => import("./components/Advantage/Advantages"));
const Security = lazy(() => import("./components/Security/Security"));
const FAQAccordion = lazy(() => import("./components/FAQ/FAQ"));
const About = lazy(() => import("./components/About/About"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop/ScrollToTop"));


function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function App() {

  useEffect(() => {    
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });
    });
  }, []);

 return (
    
    <Suspense fallback={<Loading />}>
      <div className="app-wrapper">
        <Navbar onScroll={scrollTo} />
        <Hero />    
        <Features />
        <HowItWorks />
        <Roles />
        <Advantages />
        <Security />
        <FAQAccordion/>
        <About />
        <ScrollToTop />      
        <Footer onScroll={scrollTo} />
      </div>
    </Suspense>
    
  );
}
