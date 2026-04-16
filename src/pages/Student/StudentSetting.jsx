import React, { useState } from "react";
import { 
  User, Mail, Phone, Key, Shield, 
  Save, Camera, CheckCircle, Loader2 
} from "lucide-react";
import "../../css/Student/StudentSetting.css";

// --- Mock Student Data ---
const MOCK_STUDENT = {
  name: "Alex Johnson",
  studentId: "STU-2024-089",
  email: "alex.j@university.edu",
  contact: "+1 234 567 8900",
  session: "Fall 2024",
  major: "Computer Science",
  initials: "AJ"
};

export default function StudentProfile() {
  const [profile, setProfile] = useState(MOCK_STUDENT);
  
  // States for Info Form
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [infoForm, setInfoForm] = useState({ contact: profile.contact, email: profile.email });
  const [infoStatus, setInfoStatus] = useState("idle"); // idle, loading, success

  // States for Password Form
  const [passForm, setPassForm] = useState({ current: "", new: "", confirm: "" });
  const [passStatus, setPassStatus] = useState("idle"); // idle, loading, success, error
  const [passError, setPassError] = useState("");

  // --- Handlers ---
  const handleInfoSave = (e) => {
    e.preventDefault();
    setInfoStatus("loading");
    
    setTimeout(() => {
      setProfile({ ...profile, ...infoForm });
      setInfoStatus("success");
      setIsEditingInfo(false);
      setTimeout(() => setInfoStatus("idle"), 2000);
    }, 1000);
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    setPassError("");

    if (passForm.new !== passForm.confirm) {
      setPassError("New passwords do not match.");
      return;
    }
    if (passForm.new.length < 8) {
      setPassError("Password must be at least 8 characters long.");
      return;
    }

    setPassStatus("loading");
    
    setTimeout(() => {
      setPassStatus("success");
      setPassForm({ current: "", new: "", confirm: "" });
      setTimeout(() => setPassStatus("idle"), 3000);
    }, 1200);
  };

  return (
    <div className="page-wrapper">
      <div className="page-inner" style={{ maxWidth: "1000px" }}>
        
        <header className="page-header fade-in">
          <h1 className="page-title">Profile & Settings</h1>
          <p className="page-subtitle">Manage your account details and security preferences.</p>
        </header>

        <div className="profile-layout fade-in">
          
          {/* LEFT COLUMN: Avatar & Static Info */}
          <div className="profile-sidebar">
            <div className="avatar-section">
              <div className="avatar-large">
                {profile.initials}
                <button className="avatar-edit-btn" title="Change Profile Picture">
                  <Camera size={16} />
                </button>
              </div>
              <h2 className="setting-student-name">{profile.name}</h2>
              <p className="student-major">{profile.major}</p>
              <div className="student-badge">{profile.studentId}</div>
            </div>

            <div className="static-info-list">
              <div className="info-item">
                <Shield size={18} className="info-icon" />
                <div>
                  <span className="info-label">Account Status</span>
                  <span className="info-value text-success">Active Enrolled</span>
                </div>
              </div>
              <div className="info-item">
                <User size={18} className="info-icon" />
                <div>
                  <span className="info-label">Session</span>
                  <span className="info-value">{profile.session}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Forms */}
          <div className="profile-content">
            
            {/* Personal Information Form */}
            <div className="settings-card">
              <div className="card-header-flex">
                <h3>Personal Information</h3>
                {!isEditingInfo && (
                  <button className="btn-secondary-sm" onClick={() => setIsEditingInfo(true)}>
                    Edit Info
                  </button>
                )}
              </div>

              <form onSubmit={handleInfoSave} className="settings-form">
                <div className="form-group">
                  <label>Full Name (Contact Admin to change)</label>
                  <input type="text" className="input-field" value={profile.name} disabled />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-with-icon">
                    <Mail size={18} className="input-icon" />
                    <input 
                      type="email" 
                      className="input-field" 
                      value={isEditingInfo ? infoForm.email : profile.email}
                      onChange={(e) => setInfoForm({...infoForm, email: e.target.value})}
                      disabled={!isEditingInfo}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Contact Number</label>
                  <div className="input-with-icon">
                    <Phone size={18} className="input-icon" />
                    <input 
                      type="tel" 
                      className="input-field" 
                      value={isEditingInfo ? infoForm.contact : profile.contact}
                      onChange={(e) => setInfoForm({...infoForm, contact: e.target.value})}
                      disabled={!isEditingInfo}
                    />
                  </div>
                </div>

                {isEditingInfo && (
                  <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={() => setIsEditingInfo(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary" disabled={infoStatus === "loading"}>
                      {infoStatus === "loading" ? <Loader2 className="spinner" size={18} /> : <Save size={18} />}
                      Save Changes
                    </button>
                  </div>
                )}
                
                {infoStatus === "success" && (
                  <div className="success-message"><CheckCircle size={16} /> Profile updated successfully.</div>
                )}
              </form>
            </div>

            {/* Password Management Form */}
            <div className="settings-card">
              <h3>Security & Password</h3>
              <p className="card-description">Ensure your account is using a long, random password to stay secure.</p>
              
              <form onSubmit={handlePasswordSave} className="settings-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <div className="input-with-icon">
                    <Key size={18} className="input-icon" />
                    <input 
                      type="password" 
                      className="input-field" 
                      placeholder="Enter current password"
                      value={passForm.current}
                      onChange={(e) => setPassForm({...passForm, current: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>New Password</label>
                    <input 
                      type="password" 
                      className="input-field" 
                      placeholder="Minimum 8 characters"
                      value={passForm.new}
                      onChange={(e) => setPassForm({...passForm, new: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input 
                      type="password" 
                      className="input-field" 
                      placeholder="Repeat new password"
                      value={passForm.confirm}
                      onChange={(e) => setPassForm({...passForm, confirm: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {passError && <div className="error-message">{passError}</div>}
                {passStatus === "success" && (
                  <div className="success-message"><CheckCircle size={16} /> Password changed successfully.</div>
                )}

                <div className="form-actions" style={{ justifyContent: "flex-start", marginTop: "16px" }}>
                  <button type="submit" className="btn-primary" disabled={passStatus === "loading" || !passForm.current || !passForm.new}>
                    {passStatus === "loading" ? <Loader2 className="spinner" size={18} /> : "Update Password"}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}