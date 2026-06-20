import React, { useState } from "react";
// import "./FAQ.css";

function FAQAccordion() {
  const faqs = [
    {
      question: "What is AI Content Evaluator?",
      answer: "AI Content Evaluator is an intelligent academic platform that automates assessment, provides instant AI-powered feedback, and helps teachers save time while enabling students to improve faster.",
    },
    {
      question: "How accurate is the AI grading?",
      answer: "Our AI achieves high accuracy by analyzing submissions against detailed rubrics, writing quality, originality, and academic standards. It continues to improve through continuous learning.",
    },
    {
      question: "What types of assignments can I submit?",
      answer: "Students can submit work in multiple formats including PDF, Word documents, images, presentations, and text. The system intelligently processes all major file types.",
    },
    {
      question: "Is my data safe?",
      answer: "Yes. All submissions are encrypted end-to-end. We follow strict privacy standards and conduct regular security audits to ensure your academic data remains protected.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        {/* Premium Header */}
        <div className="section-header">
          <div className="badge">
            <span className="sparkle">✦</span> COMMON QUESTIONS
          </div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-description">
            Everything you need to know about our AI-powered academic evaluation platform.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item glass-card ${openIndex === index ? "open" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                {faq.question}
                <span className="faq-icon">{openIndex === index ? "−" : "+"}</span>
              </button>

              <div className="faq-answer-wrapper">
                <div className="faq-answer">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQAccordion;