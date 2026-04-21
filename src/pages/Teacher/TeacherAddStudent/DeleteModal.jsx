import React from "react";

export function DeleteModal({ isOpen, isClosing, onClose, onConfirm }) {
  if (!isOpen && !isClosing) return null;

  return (
    <div className={`modal-overlay ${isClosing ? 'closing' : ''}`}>
      <div className={`card modal-card ${isClosing ? 'closing' : ''}`}>
        <div className="modal-icon-wrapper">
          <svg className="modal-icon-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3 className="modal-title">Delete Student?</h3>
        <p className="modal-desc">
          Are you sure you want to remove this student? This action cannot be undone.
        </p>
        <div className="modal-buttons">
          <button className="modal-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="modal-btn-delete" onClick={onConfirm}>Yes, Delete</button>
        </div>
      </div>
    </div>
  );
} export default DeleteModal;
