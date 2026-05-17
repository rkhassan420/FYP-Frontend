import React, { useState, useContext, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Icon, ICONS } from "../Teacher/TeacherIcons";
import { ThemeContext } from "../../components/Theme/ThemeContext";
import GuestProfileMenu from "./GuestProfileMenu";
import { authService, clearAuthSession, getRefreshToken } from "../../services";
import { classService } from "../../services/classService";
import { loadHistory, clearHistory } from "../../components/Evaluator/Evaluator";

const ACTIVE_SESSION_KEY = "ev_active_session";

// ── Helpers ───────────────────────────────────────────────────────────────────
function relativeTime(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7)  return `${days}d ago`;
  return new Date(ts).toLocaleDateString();
}

function aiBadgeStyle(pct) {
  if (pct == null) return {};
  return pct >= 50
    ? { background: "#fee2e2", color: "#dc2626" }
    : { background: "#dcfce7", color: "#16a34a" };
}

// function removeFromLocalHistory(id) {
//   try {
//     const history = JSON.parse(localStorage.getItem("ev_history")) || [];
//     localStorage.setItem("ev_history", JSON.stringify(history.filter((h) => h.id !== id)));
//     window.dispatchEvent(new CustomEvent("ev_history_updated"));
//   } catch {}
// }

function removeFromLocalHistory(id) {
  try {
    const history = JSON.parse(localStorage.getItem("guest_ev_history")) || [];  // 👈 fix key
    localStorage.setItem("guest_ev_history", JSON.stringify(history.filter((h) => h.id !== id)));  // 👈 fix key
    window.dispatchEvent(new CustomEvent("ev_history_updated"));
  } catch {}
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function DotMenuIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5"  r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/>
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>
      <path d="M9 6V4h6v2"/>
    </svg>
  );
}
function StopIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
    </svg>
  );
}
function ProcessingDot() {
  return (
    <span style={{
      display: "inline-block", width: 8, height: 8, borderRadius: "50%",
      background: "#f59e0b", flexShrink: 0,
      animation: "ev-pulse 1.4s ease-in-out infinite",
    }} />
  );
}

// ── History Item with 3-dot menu ──────────────────────────────────────────────
function HistoryItem({ entry, isActive, onSelect, onDelete, onCancel }) {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [confirming, setConfirming]   = useState(false);
  const [busy, setBusy]               = useState(false);
  const menuRef                       = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
        setConfirming(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleDotClick = (e) => {
    e.stopPropagation();
    setMenuOpen((o) => !o);
    setConfirming(false);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setConfirming(true);
  };

  const handleCancelClick = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    setConfirming(false);
  };

  const handleConfirmDelete = async (e) => {
    e.stopPropagation();
    setBusy(true);
    setMenuOpen(false);
    setConfirming(false);
    await onDelete(entry);
    setBusy(false);
  };

  const handleStopProcessing = async (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    setBusy(true);
    await onCancel(entry);
    setBusy(false);
  };

  return (
    <div
      className={`guest-nav-item guest-history-item ${isActive ? "guest-active" : ""}`}
      style={{ position: "relative" }}
      title={entry.isProcessing ? `${entry.title} — processing…` : entry.title}
      onClick={() => !menuOpen && onSelect(entry.id)}
    >
      {/* File icon */}
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ flexShrink: 0, opacity: busy ? 0.4 : 1 }}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>

      {/* Text */}
      <div className="guest-history-text" style={{ opacity: busy ? 0.4 : 1 }}>
        <span className="guest-history-title">{entry.title}</span>
        <span className="guest-history-meta">
          {entry.isProcessing ? "Processing…" : relativeTime(entry.savedAt)}
        </span>
      </div>

      {/* Right side badges — hidden when menu open or hovered (3-dot takes over) */}
      {!menuOpen && (
        entry.isProcessing
          ? <ProcessingDot />
          : entry.ai_percentage != null
            ? <span className="guest-history-badge" style={aiBadgeStyle(entry.ai_percentage)}>
                {entry.ai_percentage}%
              </span>
            : null
      )}

      {/* 3-dot trigger — appears on row hover via CSS class below */}
      <button
        className="gh-dot-btn"
        title="Options"
        onClick={handleDotClick}
        disabled={busy}
        style={{
          background: "none", border: "none", cursor: "pointer",
          padding: "2px 4px", borderRadius: 4, flexShrink: 0,
          display: "flex", alignItems: "center",
          color: "var(--text-secondary, #6b7280)",
          opacity: busy ? 0.4 : undefined,
        }}
      >
        {busy ? <Loader size={12} /> : <DotMenuIcon />}
      </button>

      {/* Dropdown menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute", right: 0, top: "100%", zIndex: 200,
            background: "var(--sidebar-bg, #fff)",
            border: "1px solid var(--border-color, #e5e7eb)",
            borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            minWidth: 160, padding: "4px 0", marginTop: 2,
          }}
        >
          {!confirming ? (
            <>
              {entry.isProcessing && (
                <button
                  onClick={handleStopProcessing}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    width: "100%", padding: "8px 14px", background: "none",
                    border: "none", cursor: "pointer", fontSize: 13,
                    color: "#f59e0b", textAlign: "left",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(245,158,11,0.08)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                >
                  <StopIcon /> Stop processing
                </button>
              )}
              <button
                onClick={handleDeleteClick}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  width: "100%", padding: "8px 14px", background: "none",
                  border: "none", cursor: "pointer", fontSize: 13,
                  color: "#ef4444", textAlign: "left",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.08)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "none"}
              >
                <TrashIcon /> Delete
              </button>
            </>
          ) : (
            /* Confirm delete */
            <div style={{ padding: "10px 14px" }}>
              <p style={{ margin: "0 0 8px", fontSize: 12, color: "var(--text-secondary, #6b7280)", lineHeight: 1.4 }}>
                Delete this evaluation?
              </p>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={handleConfirmDelete}
                  style={{
                    flex: 1, padding: "5px 0", background: "#ef4444",
                    color: "#fff", border: "none", borderRadius: 5,
                    cursor: "pointer", fontSize: 12, fontWeight: 600,
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={handleCancelClick}
                  style={{
                    flex: 1, padding: "5px 0",
                    background: "var(--input-bg, #f3f4f6)",
                    color: "var(--text-primary, #111)",
                    border: "none", borderRadius: 5,
                    cursor: "pointer", fontSize: 12,
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// tiny inline loader fallback (no import needed)
function Loader({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      style={{ animation: "spin 0.8s linear infinite" }}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>
    </svg>
  );
}

// ── Main Sidebar ──────────────────────────────────────────────────────────────
export default function GuestSidebar({ activeSessionId, onSessionSelect }) {
  const { theme }  = useContext(ThemeContext);
  const navigate   = useNavigate();
  const [showMenu, setShowMenu]   = useState(false);
  const [user, setUser]           = useState(null);
  const [history, setHistory]     = useState([]);
  const [collapsed, setCollapsed] = useState(
    () => JSON.parse(localStorage.getItem("guestSidebarCollapsed") || "false")
  );

  useEffect(() => {
    authService.getProfile().then(setUser).catch(() => {});
  }, []);

  const refreshHistory = useCallback(() => setHistory(loadHistory("guest")), []);

  useEffect(() => {
    refreshHistory();
    window.addEventListener("ev_history_updated", refreshHistory);
    return () => window.removeEventListener("ev_history_updated", refreshHistory);
  }, [refreshHistory]);

  useEffect(() => {
    localStorage.setItem("guestSidebarCollapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  // Persist active session across reload
  useEffect(() => {
    if (activeSessionId != null) {
      localStorage.setItem(ACTIVE_SESSION_KEY, String(activeSessionId));
    } else {
      localStorage.removeItem(ACTIVE_SESSION_KEY);
    }
  }, [activeSessionId]);

  useEffect(() => {
    if (activeSessionId != null) return;
    const saved = localStorage.getItem(ACTIVE_SESSION_KEY);
    if (saved && onSessionSelect) {
      const id = isNaN(Number(saved)) ? saved : Number(saved);
      onSessionSelect(id);
    }
  }, []); // eslint-disable-line

  const fullName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.username || "Guest"
    : "Guest";
  const initials = user
    ? `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase() || "G"
    : "G";

  // ── Logout ────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    const refresh = getRefreshToken();
    if (refresh) { try { await authService.logout({ refresh }); } catch {} }
    clearHistory("guest");
    localStorage.removeItem(ACTIVE_SESSION_KEY);
    clearAuthSession();
    navigate("/guest/login", { replace: true });
  };

  // ── Delete a history entry (local + Django) ───────────────────────────────
  // const handleDelete = async (entry) => {
  //   // 1. Remove from local history immediately
  //   removeFromLocalHistory(entry.id);

  //   // 2. If this was the active session, reset evaluator
  //   if (activeSessionId === entry.id) {
  //     onSessionSelect && onSessionSelect(null);
  //   }

  //   // 3. Call Django API to delete the submission
  //   try {
  //     await classService.deleteSubmission(entry.id);
  //   } catch (err) {
  //     console.warn("Could not delete submission on server:", err);
  //     // Already removed locally — silently continue
  //   }
  // };

  const handleDelete = async (entry) => {

    
  // 1. Remove from local history
  console.log("buton working but not deleting ")
  removeFromLocalHistory(entry.id);

  // 2. If this was the active session, reset evaluator
  if (activeSessionId === entry.id) {
    onSessionSelect && onSessionSelect(null);
  }
};

  // ── Cancel a processing entry (stop polling + Django cancel + remove) ─────
  // const handleCancel = async (entry) => {
  //   // 1. Remove locally
  //   removeFromLocalHistory(entry.id);
  //   localStorage.removeItem("ev_pending");

  //   // 2. Reset evaluator if this was active
  //   if (activeSessionId === entry.id) {
  //     onSessionSelect && onSessionSelect(null);
  //   }

  //   // 3. Tell Evaluator component to stop polling for this job
  //   window.dispatchEvent(new CustomEvent("ev_cancel_submission", { detail: { id: entry.id } }));

  //   // 4. Tell Django to cancel / delete
  //   try {
  //     if (classService.cancelSubmission) {
  //       await classService.cancelSubmission(entry.id);
  //     } else {
  //       await classService.deleteSubmission(entry.id);
  //     }
  //   } catch (err) {
  //     console.warn("Could not cancel submission on server:", err);
  //   }
  // };

  const handleCancel = async (entry) => {
  // 1. Remove locally
  removeFromLocalHistory(entry.id);
  localStorage.removeItem("ev_pending");

  // 2. Reset evaluator if this was active
  if (activeSessionId === entry.id) {
    onSessionSelect && onSessionSelect(null);
  }

  // 3. Tell Evaluator to stop polling
  window.dispatchEvent(new CustomEvent("ev_cancel_submission", { detail: { id: entry.id } }));

  // 4. Terminate on Django (reset for re-evaluation)
  try {
    await classService.terminateSubmission(entry.id);  // 👈 terminate instead of delete
  } catch (err) {
    console.warn("Could not terminate submission on server:", err);
  }
};




  // ── Group history ─────────────────────────────────────────────────────────
  const grouped = (() => {
    const today = new Date().setHours(0, 0, 0, 0);
    const yest  = today - 86400000;
    const groups = { Today: [], Yesterday: [], Earlier: [] };
    history.forEach((e) => {
      if (e.savedAt >= today)     groups.Today.push(e);
      else if (e.savedAt >= yest) groups.Yesterday.push(e);
      else                        groups.Earlier.push(e);
    });
    return groups;
  })();

  const collapseIcon = theme === "dark-theme" ? "/collapse-white.png" : "/collapse.png";

  return (
    <>
      <style>{`
        @keyframes ev-pulse {
          0%,100%{opacity:1;transform:scale(1)}
          50%{opacity:.4;transform:scale(.75)}
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* 3-dot button: hidden by default, visible on row hover */
        .gh-dot-btn { opacity: 0; transition: opacity .15s; }
        .guest-history-item:hover .gh-dot-btn { opacity: 1; }
        /* When menu is open, always show the dot button */
        .guest-history-item .gh-dot-btn:focus { opacity: 1; }

        /* Hide badge/dot when dot-btn is visible (hover) */
        .guest-history-item:hover .guest-history-badge,
        .guest-history-item:hover .ev-proc-dot { opacity: 0; }
      `}</style>

      <aside className={`guest-sidebar ${collapsed ? "collapsed" : ""}`}>

        {/* HEADER */}
        <div className="guest-sidebar-header">
          {collapsed ? (
            <div className="guest-sidebar-collapsed-wrapper">
              <div className="guest-sidebar-logo"><img src="/logo.svg" height="34" alt="logo" /></div>
              <button className="guest-collapse-btn" onClick={() => setCollapsed(false)} title="Expand">
                <img src={collapseIcon} alt="expand" />
              </button>
            </div>
          ) : (
            <>
              <div className="guest-sidebar-logo"><img src="/logo.svg" height="34" alt="logo" /></div>
              <div className="guest-sidebar-title-container">
                <div className="guest-sidebar-title">AI Evaluator</div>
                <div className="guest-sidebar-subtitle">Guest Portal</div>
              </div>
              <button className="guest-collapse-btn" onClick={() => setCollapsed(true)} title="Collapse">
                <img src={collapseIcon} alt="collapse" />
              </button>
            </>
          )}
        </div>

        {/* NEW EVALUATION */}
        <button
          className="guest-new-chat-btn"
          title="New evaluation"
          onClick={() => onSessionSelect && onSessionSelect(null)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          {!collapsed && <span>New evaluation</span>}
        </button>

        {/* HISTORY LIST */}
        {!collapsed && (
          <div className="guest-history-scroll">
            {history.length === 0 ? (
              <p className="guest-history-empty">No evaluations yet</p>
            ) : (
              Object.entries(grouped).map(([label, entries]) =>
                entries.length === 0 ? null : (
                  <div key={label}>
                    <span className="guest-sidebar-label">{label}</span>
                    {entries.map((entry) => (
                      <HistoryItem
                        key={entry.id}
                        entry={entry}
                        isActive={activeSessionId === entry.id}
                        onSelect={(id) => onSessionSelect && onSessionSelect(id)}
                        onDelete={handleDelete}
                        onCancel={handleCancel}
                      />
                    ))}
                  </div>
                )
              )
            )}
          </div>
        )}

        {/* Collapsed icon-only list */}
        {collapsed && history.slice(0, 8).map((entry) => (
          <div
            key={entry.id}
            className={`guest-nav-item ${activeSessionId === entry.id ? "guest-active" : ""}`}
            title={entry.isProcessing ? `${entry.title} — processing…` : entry.title}
            onClick={() => onSessionSelect && onSessionSelect(entry.id)}
            style={{ justifyContent: "center", position: "relative" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            {entry.isProcessing && (
              <span style={{
                position: "absolute", top: 6, right: 6,
                width: 6, height: 6, borderRadius: "50%",
                background: "#f59e0b",
                animation: "ev-pulse 1.4s ease-in-out infinite",
              }} />
            )}
          </div>
        ))}

        {/* FOOTER */}
        <div className="guest-sidebar-bottom">
          <div className="guest-user-info" onClick={() => setShowMenu(true)} style={{ cursor: "pointer" }}>
            <div className="guest-user-avatar">{initials}</div>
            {!collapsed && <span className="guest-user-name">{fullName}</span>}
          </div>
          {!collapsed && (
            <div className="guest-nav-item logout" onClick={handleLogout} title="Logout"
              style={{ padding: "8px", cursor: "pointer" }}>
              <Icon d={ICONS.logOut} size={18} color="#DC2626" />
            </div>
          )}
        </div>

        {showMenu && (
          <>
            <div className="guest-overlay" onClick={() => setShowMenu(false)} />
            <GuestProfileMenu onClose={() => setShowMenu(false)} />
          </>
        )}
      </aside>
    </>
  );
}