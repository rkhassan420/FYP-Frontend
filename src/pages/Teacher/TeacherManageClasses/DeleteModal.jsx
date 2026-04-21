import React from "react";
import Icon from "./Icons"; // ← shared icons

/**
 * DeleteModal
 *
 * Props:
 *  - isOpen    {boolean}  — controls visibility
 *  - onConfirm {Function} — called when user clicks "Yes, Delete"
 *  - onCancel  {Function} — called when user clicks "Cancel"
 */
export default function DeleteModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="mc-modal-overlay">
      <div className="mc-modal">
        <div className="mc-modal-icon">
          <Icon name="trash-2" size={24} />
        </div>
        <h3>Delete Class?</h3>
        <p>Are you sure you want to remove this class?</p>
        <div className="mc-modal-actions">
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
          <button className="btn-delete" onClick={onConfirm}>Yes, Delete</button>
        </div>
      </div>
    </div>
  );
}
