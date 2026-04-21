import React from 'react';
import "./guest.css";
import GuestSidebar from './GuestSidebar';
import Evaluator from "../../components/Evaluator/Evaluator";

export default function Dashboard() {
  return (
    <div className="app-shell">

      <GuestSidebar />

      <main className="main-content">
        <Evaluator />
      </main>

    </div>
  );
}