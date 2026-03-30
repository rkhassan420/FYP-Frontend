import "./App.css";
import React, { useEffect, lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./components/Loading";

const Navbar = lazy(() => import("./components/LandingPage/Navbar"));
const Hero = lazy(() => import("./components/LandingPage/Hero"));
const Features = lazy(() => import("./components/LandingPage/Features"));
const HowItWorks = lazy(() => import("./components/LandingPage/HowItWorks"));
const Roles = lazy(() => import("./components/LandingPage/Roles"));
const Advantages = lazy(() => import("./components/LandingPage/Advantages"));
const Security = lazy(() => import("./components/LandingPage/Security"));
const FAQAccordion = lazy(() => import("./components/LandingPage/FAQ"));
const About = lazy(() => import("./components/LandingPage/About"));
const Footer = lazy(() => import("./components/LandingPage/Footer"));
const ScrollToTop = lazy(() => import("./components/LandingPage/ScrollToTop"));


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
