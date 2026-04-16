import React, { useState } from 'react';
import { 
  Lock, Trash2, Info, Palette, 
  Bell, Settings, Shield, Laptop, Smartphone, 
  Download, AlertTriangle 
} from 'lucide-react';
import '../../css/Teacher/Setting.css';

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

        {/* Notifications Section */}
        <div className="settings-section settings-card">
          <div className="section-header">
            <Bell className="section-icon" />
            <h3 className="setting-section-title">Notifications</h3>
          </div>

         
          <div className="setting-row">
            <div>
              <div className="setting-label">Assignment Submission Alerts</div>
              <div className="setting-description">Get notified when students submit assignments</div>
            </div>
            <ToggleSwitch 
              active={toggles.assignmentAlerts} 
              onToggle={() => handleToggle('assignmentAlerts')} 
            />
          </div>


          <div className="setting-row">
            <div>
              <div className="setting-label">System Updates</div>
              <div className="setting-description">Important system maintenance notifications</div>
            </div>
            <ToggleSwitch 
              active={toggles.systemUpdates} 
              onToggle={() => handleToggle('systemUpdates')} 
            />
          </div>
        </div>

        {/* System Settings Section */}
        <div className="settings-section settings-card">
          <div className="section-header">
            <Settings className="section-icon" />
            <h3 className="setting-section-title">System Settings</h3>
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-label">Auto Logout Timeout</div>
              <div className="setting-description">Automatically logout after inactivity</div>
            </div>
            <select className="custom-select" defaultValue="30 minutes">
              <option>5 minutes</option>
              <option>15 minutes</option>
              <option value="30 minutes">30 minutes</option>
              <option>1 hour</option>
            </select>
          </div>

      

          <div className="setting-row">
            <div>
              <div className="setting-label">Data Refresh Interval</div>
              <div className="setting-description">How often to refresh dashboard data</div>
            </div>
            <select className="custom-select" defaultValue="Every 1 minute">
              <option>Every 30 seconds</option>
              <option value="Every 1 minute">Every 1 minute</option>
              <option>Every 5 minutes</option>
              <option>Manual refresh only</option>
            </select>
          </div>
        </div>

        {/* Privacy & Data Section */}
        <div className="settings-section settings-card">
          <div className="section-header">
            <Shield className="section-icon" />
            <h3 className="setting-section-title">Privacy & Data</h3>
          </div>

          <div className="devices-section-wrapper">
            <h3 className="subsection-title">Manage Connected Devices</h3>
            
            <div className="device-item">
              <div className="device-info">
                <Laptop className="device-icon" />
                <div className="device-details">
                  <div className="device-name">Chrome on Windows</div>
                  <div className="device-info-text">Last active: Today at 10:30 AM (Current Device)</div>
                </div>
              </div>
              <span className="device-status-active">Active</span>
            </div>
            
            <div className="device-item">
              <div className="device-info">
                <Smartphone className="device-icon" />
                <div className="device-details">
                  <div className="device-name">Safari on iPhone</div>
                  <div className="device-info-text">Last active: Yesterday at 3:15 PM</div>
                </div>
              </div>
              <button type="button" className="button secondary btn-small">Logout</button>
            </div>
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