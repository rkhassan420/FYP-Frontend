import React, { useEffect, useRef, useState } from "react";
import { Icon, ICONS } from "../Teacher/TeacherIcons";
import "../../css/Teacher/Evaluator.css";

export default function Evaluator({ fullscreen, setFullscreen }) {
  const [input, setInput] = useState("");
  const [fileName, setFileName] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! Upload a file or paste assignment content and I will evaluate Ai & Human, grammar, strengths, weaknesses.",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleAnalyze = () => {
    if (!input.trim() && !fileName) return;

    const userMessage = {
      role: "user",
      text: input || "Please analyze the attached file.",
      file: fileName,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `Overall Score: 88/100
AI : 75%
Human : 25%
Grammer Mistakes :  80%`,


        },
      ]);

      setIsTyping(false);
      setFileName("");
    }, 1800);
  };

  return (
    
    // <div className="panel-card evaluator-card">
        
    //   <div className="evaluator-topbar">
    //     <div className="evaluator-badge">
    //       <div className="evaluator-icon">
    //         <Icon d={ICONS.zap} size={16} />
    //       </div>

    //       <div>
    //         <h3 className="evaluator-title">AI Evaluator</h3>
    //         <p className="evaluator-subtitle">
    //           Assignment analysis assistant
    //         </p>
    //       </div>
    //     </div>

    //     <div className="maximize-btn" title="Fullscreen" >
    //         <Icon d={ICONS.maximize} size={18}  />
    //     </div>

        

    //   </div>

     <div className={`panel-card evaluator-card ${fullscreen ? "fullscreen" : ""}`}>
      
      {/* Top Bar */}
      <div className="evaluator-topbar">
        <div className="evaluator-badge">
          <div className="evaluator-icon">
            <Icon d={ICONS.zap} size={16} />
          </div>

          <div>
            <h3 className="evaluator-title">AI Evaluator</h3>
            <p className="evaluator-subtitle">
              Assignment analysis assistant
            </p>
          </div>
        </div>

        {/* Fullscreen / Maximize Button */}
        <div
          className="maximize-btn"
          title={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
          onClick={() => setFullscreen(!fullscreen)}
        >
          <Icon d={ICONS.maximize} size={18} />
        </div>
      </div>


      <div className="chat-scroll-area">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-row ${msg.role === "user" ? "user" : "assistant"}`}
          >
            <div className={`chat-bubble ${msg.role}`}>
              <div className="message-text">{msg.text}</div>

              {msg.file && (
                <div className="message-file">
                  <Icon d={ICONS.upload} size={14} />
                  <span>{msg.file}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-row assistant">
            <div className="chat-bubble assistant typing-bubble">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-wrapper">
        <div className="chat-input-box">
          <textarea
            className="chatgpt-input"
            placeholder="Paste assignment, essay or ask AI to evaluate..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={1}
          />

          <div className="chat-input-footer">
            <label className="upload-chip">
              <input
                type="file"
                hidden
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFileName(e.target.files[0].name);
                  }
                }}
              />
              <Icon d={ICONS.upload} size={15} />
              <span>{fileName || "Attach file"}</span>
            </label>

            <button
              className="send-btn"
              onClick={handleAnalyze}
              disabled={!input.trim() && !fileName}
            >
              <Icon d={ICONS.send} size={17} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

