import React, { useState } from "react";
import "./guest.css";
import GuestSidebar from './GuestSidebar';
import Evaluator from "../../components/Evaluator/Evaluator";

const ACTIVE_SESSION_KEY = "ev_active_session";

export default function Dashboard() {

  const [activeSessionId, setActiveSessionId] = useState(() => {
    const saved = localStorage.getItem(ACTIVE_SESSION_KEY);
    if (!saved) return null;
    return isNaN(Number(saved)) ? saved : Number(saved);
  });

  const handleSessionSelect = (id) => {
    setActiveSessionId(id);
    if (id != null) {
      localStorage.setItem(ACTIVE_SESSION_KEY, String(id));
    } else {
      localStorage.removeItem(ACTIVE_SESSION_KEY);
    }
  };

  return (
    <div className="app-shell">
      <GuestSidebar
        activeSessionId={activeSessionId}
        onSessionSelect={handleSessionSelect}
      />
      <main className="main-content">
        <Evaluator
          activeSessionId={activeSessionId}
          onSessionChange={handleSessionSelect}
        />
      </main>
    </div>
  );
}