import React from "react";

const Code2Icon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>
  </svg>
);

function About() {
  return (
    <section id="about" className="section">
      <div className="about-card-wrapper">
        <div className="about-card">
          <div className="glow-orb orb-about" />
          <div className="about-content">
            <span className="section-label">About the Project</span>
            <h2>Built with Purpose</h2>
            <p>
              AI Content Evaluator is a Final Year Project that reimagines academic assessment. By leveraging
              artificial intelligence, it automates grading, detects plagiarism, and generates constructive
              feedback — helping educators focus on teaching and students focus on learning.
            </p>
            <div className="developer-card">
              <div className="dev-avatar">
                <Code2Icon />
              </div>
              <div>
                <p className="dev-name">Final Year Student</p>
                <p className="dev-sub">Salman Khan &amp; Ali Hassan - Final Year Project 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} export default About;