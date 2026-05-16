import React from "react";
import { Trash2 } from "lucide-react";

/**
 * DeleteModal
 *
 * Props:
 *  - isOpen       {boolean}   Whether the modal is visible
 *  - onCancel     {function}  Called when the user clicks "Cancel"
 *  - onConfirm    {function}  Called when the user clicks "Yes, Delete"
 */
export default function DeleteModal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="assign-custom-modal-overlay"  >
      <div className="assign-custom-modal-content assign-modal-small" onClick={(e) => e.stopPropagation()} >
        <div className="assign-delete-modal-header">
          <div className="assign-delete-icon-wrapper">
            <Trash2 size={24} />
          </div>
          <h3>Delete Assignment</h3>
        </div>

        <p className="assign-delete-modal-text">
          Are you sure you want to delete this assignment? This action cannot be
          undone and will remove it from all assigned classes.
        </p>

        <div className="assign-delete-modal-actions">
          <button onClick={onCancel} className="assign-btn-cancel">
            Cancel
          </button>
          <button onClick={onConfirm} className="assign-btn-delete-confirm">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
