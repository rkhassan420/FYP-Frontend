import {React,useState} from "react";

function FAQAccordion() {
  const faqs = [
    {
      question: "What is AI Content Evaluator?",
      answer:
        "AI Content Evaluator is a tool that automates academic assessments, providing instant grading, feedback, and plagiarism detection to help teachers save time and students improve their work."
    },
    {
      question: "How accurate is the AI grading?",
      answer:
        "Our AI maintains a high accuracy rate by analyzing assignments based on detailed rubrics and criteria. While AI provides objective insights, teachers can always review and adjust scores if needed."
    },
    {
      question: "What types of assignments can I submit?",
      answer:
        "Students can submit work in multiple formats, including text documents, PDFs, presentations, and spreadsheets. The system evaluates them seamlessly."
    },
    {
      question: "Is my data safe?",
      answer:
        "Yes. All submissions are encrypted, and personal information is kept private. Regular security audits ensure your data remains secure and protected."
    },
    {
      question: "Can teachers customize the evaluation criteria?",
      answer:
        "Absolutely. Teachers can define rubrics, grading scales, and evaluation criteria to fit each assignment, ensuring AI grading aligns with their teaching standards."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <div className="section-header">
           <h2>Frequently Asked Questions</h2>
        </div>
       
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className="faq-icon">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} export default FAQAccordion;
