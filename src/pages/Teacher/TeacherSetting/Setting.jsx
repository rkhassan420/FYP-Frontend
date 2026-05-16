import React, { useState } from 'react';
import { Lock, Info, AlertTriangle } from 'lucide-react';
import { authService, clearAuthSession } from "../../../services";
import './Setting.css';

export default function SettingsPage() {
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage("");

    if (passwordForm.next !== passwordForm.confirm) {
      setMessage("New passwords do not match.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      await authService.changePassword({
        current_password: passwordForm.current,
        new_password: passwordForm.next,
        confirm_password: passwordForm.confirm,
      });
      setPasswordForm({ current: "", next: "", confirm: "" });
      setMessage("Password updated successfully.");
      setStatus("success");
    } catch (err) {
      setMessage(err.message);
      setStatus("error");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Delete your account permanently?");
    if (!confirmed) return;

    setStatus("loading");

    try {
      await authService.deleteAccount();
      clearAuthSession();
      window.location.href = "/login/teacher";
    } catch (err) {
      setMessage(err.message);
      setStatus("error");
    }
  };

  return (
    <div className="settings-page-wrapper">
      <div className="settings-container">

        {/* Page Header */}
        <div className="page-header fade-in">
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your account and preferences</p>
        </div>

        {/* Account Security Section */}
        <div className="settings-section settings-card">
          <div className="section-header">
            <Lock className="section-icon" />
            <h3 className="setting-section-title">Account Security</h3>
          </div>

          <div className="info-box">
            <Info className="info-icon" />
            <div className="info-text">
              Keep your account secure by updating your password regularly
            </div>
          </div>

          <form onSubmit={handlePasswordChange}>
          <div className="password-section-wrapper">
            <h3 className="subsection-title">Change Password</h3>

            <div className="form-group">
              <div className="input-field">
                <label className="input-label">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                  required
                />
              </div>

              <div className="input-field">
                <label className="input-label">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={passwordForm.next}
                  onChange={(e) => setPasswordForm({ ...passwordForm, next: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group full">
              <div className="input-field">
                <label className="input-label">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                  required
                />
              </div>
            </div>
            {message && (
              <p style={{ color: status === "error" ? "#ef4444" : "#16a34a", fontSize: "14px" }}>
                {message}
              </p>
            )}
          </div>

          <div className="divider-section">
            <div className="setting-row">
              <div>
                <div className="setting-label">Recent Login Activity</div>
                <div className="setting-description">
                  Last login: Jan 15, 2025 at 10:30 AM
                </div>
              </div>
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="button primary" disabled={status === "loading"}>
              {status === "loading" ? "Updating..." : "Update Password"}
            </button>
            <button
              type="button"
              className="button secondary"
              onClick={() => setPasswordForm({ current: "", next: "", confirm: "" })}
            >
              Cancel
            </button>
          </div>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="settings-section settings-card danger-zone">
          <h2 className="danger-title">Danger Zone</h2>
          <p className="danger-description">
            These actions are irreversible. Please proceed with caution.
          </p>

          <div className="button-group">
            <button type="button" className="button danger" onClick={handleDeleteAccount}>
              <AlertTriangle size={16} /> Delete Account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
