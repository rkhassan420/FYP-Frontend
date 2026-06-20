import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./Hero.css";

const SparklesIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

const LogInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
    <polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
  </svg>
);

const AnimatedNumber = ({ end, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const duration = 1800;
        const step = Math.ceil(end / (duration / 16));

        const timer = setInterval(() => {
          start += step;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, 16);
      }
    }, { threshold: 0.6 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref} className="stat-number">{count}{suffix}</span>;
};

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero" id="home">
      {/* Background Elements */}
      <div className="glow-orb orb-blue" />
      <div className="glow-orb orb-purple" />
      <div className="hero-grid" />

      <div className="hero-content">
        {/* Badge */}
        <div className="badge fade-up">
          <SparklesIcon size={16} />
          <span>POWERED BY ADVANCED AI</span>
        </div>

        {/* Headline */}
        <h1 className="hero-title fade-up stagger-1">
          Intelligent <span className="gradient-text">Academic</span> Evaluation
        </h1>

        <p className="hero-subtitle fade-up stagger-2">
          AI-driven academic evaluation with intelligent authorship detection and detailed feedback generation.
        </p>

        {/* CTA */}
        <div className="hero-cta fade-up stagger-3">
          <button 
            className="btn-primary" 
            onClick={() => navigate("/guest/login")}
          >
            Get Started Free
          </button>
          <button 
            className="btn-secondary"
            onClick={() => navigate("/demo")}
          >
            <LogInIcon /> Watch Demo
          </button>
        </div>

        {/* Trust / Stats */}
        <div className="stats-container fade-up stagger-4">
          <div className="stat-box">
            <AnimatedNumber end={150} suffix="+" />
            <p className="stat-text">Submissions Evaluated</p>
          </div>
          <div className="stat-box">
            <AnimatedNumber end={90} suffix="%" />
            <p className="stat-text">AI Accuracy</p>
          </div>
          <div className="stat-box">
            <AnimatedNumber end={64} suffix="+" />
            <p className="stat-text">Institutions</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;