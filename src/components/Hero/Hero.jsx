import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css"

const SparklesIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

const LogInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
    <polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);




function Stat() {

  return(
     <div className="stats-container fade-up stagger-4">
      
      <div className="stat-box">
        <div className="stat-number blue">10K+</div>
        <p className="stat-text">Submissions Evaluated</p>
      </div>

      <div className="stat-box middle">
        <div className="stat-number purple">98%</div>
        <p className="stat-text">Accuracy Rate</p>
      </div>

      <div className="stat-box">
        <div className="stat-number green">50+</div>
        <p className="stat-text">Institutions</p>
      </div>

    </div>
  ) 
}

function Hero() {

  const navigate = useNavigate();
  
  return (
    <section className="hero" id="home">
      <div className="glow-orb orb-blue" />
      <div className="glow-orb orb-purple" />
      <div className="hero-content">
        <div className="badge fade-up">
          <SparklesIcon size={14} /> Powered by Advanced AI
        </div>
        <h1 className="hero-title fade-up stagger-1">AI Content Evaluator</h1>
        <p className="hero-subtitle fade-up stagger-2">Smart Academic Evaluation System Powered by AI</p>
        <div className="hero-cta fade-up stagger-3">
          <button className="btn-primary btn-lg" onClick={() => navigate("/role-selection")} >Get Started Free →</button>
          <button className="btn-outline btn-lg"  >
            <LogInIcon /> Try Demo
          </button>
          
        </div>

        <Stat/>

        <div className="hero-card fade-up stagger-4">
          <div className="card-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
            <div className="card-bar" />
          </div>
          <div className="card-grid">
            <div className="card-block block-blue" />
            <div className="card-block block-green" />
            <div className="card-block block-purple" />
          </div>
          <div className="card-lines">
            <div className="card-line" />
            <div className="card-line w-4-5" />
            <div className="card-line w-3-5" />
          </div>
          <div className="ai-badge">
            <CheckCircleIcon /> AI Evaluated
          </div>
        </div>
      </div>
    </section>
  );
} export default Hero;