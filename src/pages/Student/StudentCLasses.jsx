// import React, { useState, useEffect } from "react";
// import {
//   BookOpen,
//   User,
//   ArrowRight,
//   AlertCircle,
//   BookX,
//   LogOut,
//   X,
//   CheckCircle2,
// } from "lucide-react";
// import "../../css/Student/StudentClasses.css";
// import { useNavigate } from "react-router-dom";
// import { classService } from "../../services/classService";

// // ─── Toast Notification ───────────────────────────────────────────────────────
// function Toast({ message, onClose }) {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 3500);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div style={styles.toast}>
//       <CheckCircle2 size={18} style={{ color: "#4ade80", flexShrink: 0 }} />
//       <span style={styles.toastText}>{message}</span>
//       <button onClick={onClose} style={styles.toastClose}>
//         <X size={14} />
//       </button>
//     </div>
//   );
// }

// // ─── Confirm Modal ────────────────────────────────────────────────────────────
// function ConfirmModal({ className, onConfirm, onCancel, loading }) {

//   const navigate = useNavigate();

//   return (
//     <div style={styles.overlay}>
//       <div style={styles.modal}>
//         <div style={styles.modalIconWrap}>
//           <LogOut size={26} style={{ color: "#f87171" }} />
//         </div>
//         <h3 style={styles.modalTitle}>Leave Class?</h3>
//         <p style={styles.modalDesc}>
//           Are you sure you want to leave{" "}
//           <strong style={{ color: "#1e293b" }}>{className}</strong>?
//           You'll need a class code to rejoin.
//         </p>
//         <div style={styles.modalActions}>
//           <button style={styles.btnCancel} onClick={onCancel} disabled={loading}>
//             Cancel
//           </button>
//           <button
//             style={{ ...styles.btnLeave, opacity: loading ? 0.7 : 1 }}
//             onClick={onConfirm}
//             disabled={loading}
//           >
//             {loading ? "Leaving..." : "Yes, Leave"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// export default function StudentClasses({ setActivePage, setSelectedClass }) {
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [leaveTarget, setLeaveTarget] = useState(null);
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [toast, setToast] = useState(null);

//   const getTheme = (index) => {
//     const themes = ["blue", "green", "purple", "orange"];
//     return themes[index % themes.length];
//   };

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         setLoading(true);
//         const res = await classService.getEnrolledClasses();
//         const data = Array.isArray(res) ? res : res?.data || [];
//         setClasses(data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load classes");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchClasses();
//   }, []);

//   // ✅ Pass full class object to parent, then navigate to assignments list
//   const handleOpenClass = (cls) => {
//     if (setSelectedClass) setSelectedClass(cls);
//     if (setActivePage) setActivePage("assignments");
//   };

//   const handleConfirmLeave = async () => {
//     if (!leaveTarget) return;
//     setLeaveLoading(true);
//     try {
//       await classService.leaveClass(leaveTarget.code);
//       setClasses((prev) => prev.filter((cls) => cls.code !== leaveTarget.code));
//       setToast(`You left "${leaveTarget.name}" successfully.`);
//     } catch (err) {
//       console.error("Error leaving class:", err);
//       setToast("Failed to leave the class. Please try again.");
//     } finally {
//       setLeaveLoading(false);
//       setLeaveTarget(null);
//     }
//   };

//   return (
//     <div className="page-wrapper">
//       <div className="page-inner" style={{ maxWidth: "1200px" }}>

//         {toast && <Toast message={toast} onClose={() => setToast(null)} />}
//         {leaveTarget && (
//           <ConfirmModal
//             className={leaveTarget.name}
//             onConfirm={handleConfirmLeave}
//             onCancel={() => setLeaveTarget(null)}
//             loading={leaveLoading}
//           />
//         )}

//         <header className="page-header fade-in">
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
//             <div>
//               <h1 className="page-title">My Classes</h1>
//               <p className="page-subtitle">Access your enrolled courses and view assignments.</p>
//             </div>
//             <button className="btn-secondary" onClick={() => setActivePage && setActivePage("join-class")}>
//               + Join Another Class
//             </button>
//           </div>
//         </header>

//         {loading ? (
//           <div className="empty-state-card fade-in"><p>Loading classes...</p></div>
//         ) : error ? (
//           <div className="empty-state-card fade-in">
//             <AlertCircle size={40} /><p>{error}</p>
//           </div>
//         ) : classes.length === 0 ? (
//           <div className="empty-state-card fade-in">
//             <BookX size={48} className="empty-icon" />
//             <h3>No Classes Yet</h3>
//             <p>You haven't enrolled in any classes. Use a class code from your teacher to get started.</p>
//             <button
//               className="btn-primary"
//               style={{ marginTop: "16px", maxWidth: "200px", margin: "16px auto 0" }}
//               onClick={() => setActivePage && setActivePage("join-class")}
//             >
//               Join a Class
//             </button>
//           </div>
//         ) : (
//           <div className="classes-grid fade-in">
//             {classes.map((cls, index) => (
//               <div
//                 key={cls.id}
//                 className={`class-card theme-${getTheme(index)}`}
//                 style={{ animationDelay: `${index * 0.1}s`, position: "relative" }}
//               >
//                 <div className="class-card-header" style={{ position: "relative" }}>
//                   <div className="class-icon-wrapper">
//                     <BookOpen size={24} />
//                   </div>
//                   <div className="class-title-wrapper" style={{ paddingRight: "32px" }}>
//                     <h3 className="class-name">{cls.name}</h3>
//                     <span className="class-code">{cls.code}</span>
//                   </div>

//                   <button
//                     title="Leave Class"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setLeaveTarget({ code: cls.code, name: cls.name });
//                     }}
//                     style={styles.leaveBtn}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.opacity = "1";
//                       e.currentTarget.style.transform = "scale(1.15)";
//                       e.currentTarget.style.color = "#f87171";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.opacity = "0.5";
//                       e.currentTarget.style.transform = "scale(1)";
//                       e.currentTarget.style.color = "inherit";
//                     }}
//                   >
//                     <LogOut size={18} />
//                   </button>
//                 </div>

//                 <div className="teacher-info" style={{ marginBottom: "auto" }}>
//                   <User size={16} />
//                   <span>{cls.teacher?.first_name || ""} {cls.teacher?.last_name || ""}</span>
//                 </div>

//                 <div style={{ marginTop: "32px" }} />

//                 <div className="class-card-footer">
//                   {cls.pendingAssignments > 0 ? (
//                     <div className="pending-badge">
//                       <AlertCircle size={14} />
//                       <span>{cls.pendingAssignments} Pending</span>
//                     </div>
//                   ) : (
//                     <div className="all-caught-up-badge">
//                       <span>All caught up! 🎉</span>
//                     </div>
//                   )}
//                   {/* ✅ Passes full class object */}
//                   <button className="open-class-btn" onClick={() => handleOpenClass(cls)}>
//                     Open <ArrowRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   leaveBtn: {
//     position: "absolute", top: "0", right: "0",
//     background: "none", border: "none", cursor: "pointer",
//     opacity: "0.5", padding: "4px",
//     display: "flex", alignItems: "center", justifyContent: "center",
//     color: "inherit", transition: "opacity 0.2s, transform 0.2s, color 0.2s",
//   },
//   toast: {
//     position: "fixed", bottom: "28px", left: "50%", transform: "translateX(-50%)",
//     background: "#0f172a", color: "#f1f5f9", padding: "12px 18px",
//     borderRadius: "12px", display: "flex", alignItems: "center", gap: "10px",
//     boxShadow: "0 8px 30px rgba(0,0,0,0.25)", zIndex: 9999,
//     minWidth: "260px", maxWidth: "90vw", animation: "fadeSlideUp 0.3s ease",
//   },
//   toastText: { flex: 1, fontSize: "14px", fontWeight: 500 },
//   toastClose: { background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center", padding: "2px" },
//   overlay: {
//     position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.55)",
//     backdropFilter: "blur(4px)", display: "flex", alignItems: "center",
//     justifyContent: "center", zIndex: 9000, animation: "fadeIn 0.2s ease",
//   },
//   modal: {
//     background: "#fff", borderRadius: "20px", padding: "36px 32px 28px",
//     maxWidth: "380px", width: "90%", textAlign: "center",
//     boxShadow: "0 20px 60px rgba(0,0,0,0.18)", animation: "scaleIn 0.2s ease",
//   },
//   modalIconWrap: {
//     width: "52px", height: "52px", borderRadius: "50%", background: "#fee2e2",
//     display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
//   },
//   modalTitle: { margin: "0 0 8px", fontSize: "20px", fontWeight: 700, color: "#0f172a" },
//   modalDesc: { margin: "0 0 24px", fontSize: "14px", color: "#64748b", lineHeight: 1.6 },
//   modalActions: { display: "flex", gap: "12px", justifyContent: "center" },
//   btnCancel: {
//     flex: 1, padding: "10px 0", borderRadius: "10px",
//     border: "1.5px solid #e2e8f0", background: "#fff",
//     color: "#475569", fontWeight: 600, fontSize: "14px", cursor: "pointer",
//   },
//   btnLeave: {
//     flex: 1, padding: "10px 0", borderRadius: "10px", border: "none",
//     background: "#ef4444", color: "#fff", fontWeight: 600, fontSize: "14px", cursor: "pointer",
//   },
// };

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  User,
  ArrowRight,
  AlertCircle,
  BookX,
  LogOut,
  X,
  CheckCircle2,
} from "lucide-react";
import "../../css/Student/StudentClasses.css";
import { useNavigate } from "react-router-dom";
import { classService } from "../../services/classService";

// ─── Toast Notification ───────────────────────────────────────────────────────
function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={styles.toast}>
      <CheckCircle2 size={18} style={{ color: "#4ade80", flexShrink: 0 }} />
      <span style={styles.toastText}>{message}</span>
      <button onClick={onClose} style={styles.toastClose}>
        <X size={14} />
      </button>
    </div>
  );
}

// ─── Confirm Modal ────────────────────────────────────────────────────────────
function ConfirmModal({ className, onConfirm, onCancel, loading }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalIconWrap}>
          <LogOut size={26} style={{ color: "#f87171" }} />
        </div>
        <h3 style={styles.modalTitle}>Leave Class?</h3>
        <p style={styles.modalDesc}>
          Are you sure you want to leave{" "}
          <strong style={{ color: "#1e293b" }}>{className}</strong>?
          You'll need a class code to rejoin.
        </p>
        <div style={styles.modalActions}>
          <button style={styles.btnCancel} onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button
            style={{ ...styles.btnLeave, opacity: loading ? 0.7 : 1 }}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Leaving..." : "Yes, Leave"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function StudentClasses() {
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [leaveTarget, setLeaveTarget] = useState(null);
  const [leaveLoading, setLeaveLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const getTheme = (index) => {
    const themes = ["blue", "green", "purple", "orange"];
    return themes[index % themes.length];
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const res = await classService.getEnrolledClasses();
        const data = Array.isArray(res) ? res : res?.data || [];
        setClasses(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load classes");
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  // ── Navigate to assignments with selected class in state ──────────────────
  const handleOpenClass = (cls) => {
    navigate("/student/dashboard/assignments", {
      state: { selectedClass: cls },
    });
  };

  const handleConfirmLeave = async () => {
    if (!leaveTarget) return;
    setLeaveLoading(true);
    try {
      await classService.leaveClass(leaveTarget.code);
      setClasses((prev) => prev.filter((cls) => cls.code !== leaveTarget.code));
      setToast(`You left "${leaveTarget.name}" successfully.`);
    } catch (err) {
      console.error("Error leaving class:", err);
      setToast("Failed to leave the class. Please try again.");
    } finally {
      setLeaveLoading(false);
      setLeaveTarget(null);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-inner" style={{ maxWidth: "1200px" }}>

        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
        {leaveTarget && (
          <ConfirmModal
            className={leaveTarget.name}
            onConfirm={handleConfirmLeave}
            onCancel={() => setLeaveTarget(null)}
            loading={leaveLoading}
          />
        )}

        <header className="page-header fade-in">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h1 className="page-title">My Classes</h1>
              <p className="page-subtitle">Access your enrolled courses and view assignments.</p>
            </div>
            {/* ── Replace setActivePage with navigate ── */}
            <button
              className="btn-secondary"
              onClick={() => navigate("/student/dashboard/join-class")}
            >
              + Join Another Class
            </button>
          </div>
        </header>

        {loading ? (
          <div className="empty-state-card fade-in"><p>Loading classes...</p></div>
        ) : error ? (
          <div className="empty-state-card fade-in">
            <AlertCircle size={40} /><p>{error}</p>
          </div>
        ) : classes.length === 0 ? (
          <div className="empty-state-card fade-in">
            <BookX size={48} className="empty-icon" />
            <h3>No Classes Yet</h3>
            <p>You haven't enrolled in any classes. Use a class code from your teacher to get started.</p>
            <button
              className="btn-primary"
              style={{ marginTop: "16px", maxWidth: "200px", margin: "16px auto 0" }}
              onClick={() => navigate("/student/dashboard/join-class")}
            >
              Join a Class
            </button>
          </div>
        ) : (
          <div className="classes-grid fade-in">
            {classes.map((cls, index) => (
              <div
                key={cls.id}
                className={`class-card theme-${getTheme(index)}`}
                style={{ animationDelay: `${index * 0.1}s`, position: "relative" }}
              >
                <div className="class-card-header" style={{ position: "relative" }}>
                  <div className="class-icon-wrapper">
                    <BookOpen size={24} />
                  </div>
                  <div className="class-title-wrapper" style={{ paddingRight: "32px" }}>
                    <h3 className="class-name">{cls.name}</h3>
                    <span className="class-code">{cls.code}</span>
                  </div>

                  <button
                    title="Leave Class"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLeaveTarget({ code: cls.code, name: cls.name });
                    }}
                    style={styles.leaveBtn}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.transform = "scale(1.15)";
                      e.currentTarget.style.color = "#f87171";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "0.5";
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.color = "inherit";
                    }}
                  >
                    <LogOut size={18} />
                  </button>
                </div>

                <div className="teacher-info" style={{ marginBottom: "auto" }}>
                  <User size={16} />
                  <span>{cls.teacher?.first_name || ""} {cls.teacher?.last_name || ""}</span>
                </div>

                <div style={{ marginTop: "32px" }} />

                <div className="class-card-footer">
                  {cls.pendingAssignments > 0 ? (
                    <div className="pending-badge">
                      <AlertCircle size={14} />
                      <span>{cls.pendingAssignments} Pending</span>
                    </div>
                  ) : (
                    <div className="all-caught-up-badge">
                      <span>All caught up! 🎉</span>
                    </div>
                  )}
                  <button className="open-class-btn" onClick={() => handleOpenClass(cls)}>
                    Open <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  leaveBtn: {
    position: "absolute", top: "0", right: "0",
    background: "none", border: "none", cursor: "pointer",
    opacity: "0.5", padding: "4px",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "inherit", transition: "opacity 0.2s, transform 0.2s, color 0.2s",
  },
  toast: {
    position: "fixed", bottom: "28px", left: "50%", transform: "translateX(-50%)",
    background: "#0f172a", color: "#f1f5f9", padding: "12px 18px",
    borderRadius: "12px", display: "flex", alignItems: "center", gap: "10px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.25)", zIndex: 9999,
    minWidth: "260px", maxWidth: "90vw", animation: "fadeSlideUp 0.3s ease",
  },
  toastText: { flex: 1, fontSize: "14px", fontWeight: 500 },
  toastClose: {
    background: "none", border: "none", cursor: "pointer",
    color: "#94a3b8", display: "flex", alignItems: "center", padding: "2px",
  },
  overlay: {
    position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.55)",
    backdropFilter: "blur(4px)", display: "flex", alignItems: "center",
    justifyContent: "center", zIndex: 9000, animation: "fadeIn 0.2s ease",
  },
  modal: {
    background: "#fff", borderRadius: "20px", padding: "36px 32px 28px",
    maxWidth: "380px", width: "90%", textAlign: "center",
    boxShadow: "0 20px 60px rgba(0,0,0,0.18)", animation: "scaleIn 0.2s ease",
  },
  modalIconWrap: {
    width: "52px", height: "52px", borderRadius: "50%", background: "#fee2e2",
    display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
  },
  modalTitle: { margin: "0 0 8px", fontSize: "20px", fontWeight: 700, color: "#0f172a" },
  modalDesc: { margin: "0 0 24px", fontSize: "14px", color: "#64748b", lineHeight: 1.6 },
  modalActions: { display: "flex", gap: "12px", justifyContent: "center" },
  btnCancel: {
    flex: 1, padding: "10px 0", borderRadius: "10px",
    border: "1.5px solid #e2e8f0", background: "#fff",
    color: "#475569", fontWeight: 600, fontSize: "14px", cursor: "pointer",
  },
  btnLeave: {
    flex: 1, padding: "10px 0", borderRadius: "10px", border: "none",
    background: "#ef4444", color: "#fff", fontWeight: 600, fontSize: "14px", cursor: "pointer",
  },
};