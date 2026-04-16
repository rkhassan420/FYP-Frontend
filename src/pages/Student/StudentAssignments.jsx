import React, { useState, useRef } from "react";
import { 
  UploadCloud, FileText, CheckCircle, Clock, 
  AlertCircle, X, FileCheck 
} from "lucide-react";
import "../../css/Student/StudentAssignments.css";

// --- Mock Data for the Assignment ---
const MOCK_ASSIGNMENT = {
  id: "asn_01",
  title: "Software Requirement Specification (SRS)",
  course: "Software Engineering (SE-401)",
  teacher: "Dr. Salman Khan",
  dueDate: "Oct 25, 2024 - 11:59 PM",
  description: "Please upload your final SRS document for the semester project. Ensure you follow the IEEE standard format. Your document will be evaluated by our AI for formatting, grammar, and structural completeness.",
  status: "pending", // pending | submitted | late
  acceptedFiles: "PDF, DOCX (Max 10MB)",
  previousSubmission: null
};

export default function StudentAssignments({ setActivePage }) {
  const [assignment, setAssignment] = useState(MOCK_ASSIGNMENT);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Upload States: idle | uploading | success | error
  const [uploadState, setUploadState] = useState("idle"); 
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef(null);

  // --- File Selection & Validation ---
  const handleFile = (file) => {
    setErrorMessage("");
    if (!file) return;

    // 1. Validate File Type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage("Invalid file type. Please upload a PDF or DOCX file.");
      return;
    }

    // 2. Validate Size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("File is too large. Maximum size is 10MB.");
      return;
    }

    setSelectedFile(file);
    setUploadState("idle");
  };

  // --- Drag & Drop Handlers ---
  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // --- Submission Simulation ---
  const handleSubmit = () => {
    if (!selectedFile) return;
    
    setUploadState("uploading");
    setUploadProgress(0);

    // Simulate network upload
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState("success");
          
          // Update assignment status
          setTimeout(() => {
            setAssignment(prev => ({
              ...prev,
              status: "submitted",
              previousSubmission: {
                name: selectedFile.name,
                size: (selectedFile.size / 1024 / 1024).toFixed(2) + " MB",
                date: new Date().toLocaleString()
              }
            }));
            setSelectedFile(null);
          }, 800);
          return 100;
        }
        return prev + 15; // increment progress
      });
    }, 200);
  };

  return (
    <div className="page-wrapper">
      <div className="page-inner" style={{ maxWidth: "1100px" }}>
        
        <div className="assignment-layout fade-in">
          
          {/* LEFT COLUMN: Assignment Details */}
          <div className="assignment-details">
            <div className="detail-header">
              <h1 className="assignment-title">{assignment.title}</h1>
              <p className="assignment-meta">{assignment.course} • {assignment.teacher}</p>
              
              <div className="status-row">
                <span className={`status-badge badge-${assignment.status}`}>
                  {assignment.status === "pending" && <AlertCircle size={14} />}
                  {assignment.status === "submitted" && <CheckCircle size={14} />}
                  {assignment.status.toUpperCase()}
                </span>
                <span className="due-date">
                  <Clock size={14} /> Due: {assignment.dueDate}
                </span>
              </div>
            </div>

            <div className="detail-body">
              <h3>Instructions</h3>
              <p>{assignment.description}</p>
            </div>
          </div>

          {/* RIGHT COLUMN: Submission Panel */}
          <div className="submission-panel">
            <h2 className="panel-title">Your Work</h2>

            {/* If Already Submitted */}
            {assignment.status === "submitted" && assignment.previousSubmission ? (
              <div className="submitted-state">
                <div className="file-preview success-preview">
                  <FileCheck size={32} color="var(--success)" />
                  <div className="file-info">
                    <p className="file-name">{assignment.previousSubmission.name}</p>
                    <p className="file-size">Submitted on {assignment.previousSubmission.date}</p>
                  </div>
                </div>
              </div>
            ) : (
              /* If Pending (Needs Upload) */
              <div className="upload-state">
                
                {/* Drag & Drop Zone */}
                {!selectedFile ? (
                  <div 
                    className={`drop-zone ${isDragging ? "dragging" : ""}`}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current.click()}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      hidden 
                      accept=".pdf,.docx"
                      onChange={(e) => handleFile(e.target.files[0])}
                    />
                    <UploadCloud size={40} className="upload-icon" />
                    <h4>Click or drag file to this area to upload</h4>
                    <p>{assignment.acceptedFiles}</p>
                  </div>
                ) : (
                  /* File Selected Preview */
                  <div className="file-preview">
                    <FileText size={28} className="file-type-icon" />
                    <div className="file-info">
                      <p className="file-name">{selectedFile.name}</p>
                      <p className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    {uploadState === "idle" && (
                      <button className="remove-file-btn" onClick={() => setSelectedFile(null)}>
                        <X size={18} />
                      </button>
                    )}
                  </div>
                )}

                {/* Error Message */}
                {errorMessage && (
                  <div className="upload-error"><AlertCircle size={14} /> {errorMessage}</div>
                )}

                {/* Upload Progress Bar */}
                {uploadState === "uploading" && (
                  <div className="progress-container">
                    <div className="progress-bar-wrapper">
                      <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                    <span className="progress-text">Uploading... {Math.round(uploadProgress)}%</span>
                  </div>
                )}

                {/* Submit Button */}
                <button 
                  className="btn-primary submit-btn" 
                  disabled={!selectedFile || uploadState === "uploading" || uploadState === "success"}
                  onClick={handleSubmit}
                >
                  {uploadState === "uploading" ? "Submitting..." : 
                   uploadState === "success" ? "Submitted!" : 
                   "Submit Assignment"}
                </button>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}