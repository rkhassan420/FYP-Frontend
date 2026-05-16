import React from "react";
import { CheckCircle } from "lucide-react";
import "./successModal.css";

const SuccessModal = ({ title, message }) => {
  return (
    <div className="success-modal-overlay">
      <div className="success-modal">
        <CheckCircle size={60} className="success-icon" />
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SuccessModal;


