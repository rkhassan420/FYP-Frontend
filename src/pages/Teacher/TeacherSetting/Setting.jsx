import React, { useState } from 'react';
import { 
  Lock, Trash2, Info, Palette, 
  Bell, Settings, Shield, Laptop, Smartphone, 
  Download, AlertTriangle 
} from 'lucide-react';
import './Setting.css';

// Reusable toggle switch component
const ToggleSwitch = ({ active, onToggle }) => (
  <button 
    type="button" 
    className={`toggle-switch ${active ? 'active' : ''}`} 
    onClick={onToggle}
  />
);

export default function SettingsPage() {
  const [toggles, setToggles] = useState({
    twoFactor: false,
    animations: true,
    emailNotifications: true,
    assignmentAlerts: true,
    studentActivityAlerts: true,
    systemUpdates: false,
    aiAutoEval: true,
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
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

          <div className="password-section-wrapper">
            <h3 className="subsection-title">Change Password</h3>
            
            <div className="form-group">
              <div className="input-field">
                <label className="input-label">Current Password</label>
                <input type="password" placeholder="Enter current password" />
              </div>
              <div className="input-field">
                <label className="input-label">New Password</label>
                <input type="password" placeholder="Enter new password" />
              </div>
            </div>
            <div className="form-group full">
              <div className="input-field">
                <label className="input-label">Confirm Password</label>
                <input type="password" placeholder="Confirm new password" />
              </div>
            </div>
          </div>

          <div className="divider-section">
           
            <div className="setting-row">
              <div>
                <div className="setting-label">Recent Login Activity</div>
                <div className="setting-description">Last login: Jan 15, 2025 at 10:30 AM</div>
              </div>
             
            </div>
          </div>

          <div className="button-group">
            <button type="button" className="button primary">Update Password</button>
            <button type="button" className="button secondary">Cancel</button>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="settings-section settings-card">
          <div className="section-header">
            <Palette className="section-icon" />
            <h3 className="setting-section-title">Preferences</h3>
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-label">Theme</div>
              <div className="setting-description">Choose your preferred interface appearance</div>
            </div>
            <select className="custom-select">
              <option>Light Mode</option>
              <option>Dark Mode</option>
              <option>Auto (System)</option>
            </select>
          </div>

         
        </div>  
        

       
    
        

      
        {/* Danger Zone Section */}
        <div className="settings-section settings-card danger-zone">
          <h2 className="danger-title">Danger Zone</h2>
          <p className="danger-description">
            These actions are irreversible. Please proceed with caution.
          </p>
          <div className="button-group">
            <button type="button" className="button danger">
              <AlertTriangle size={16} /> Delete Account
            </button>        
          </div>
        </div>

      </div>
    </div>
  );
}