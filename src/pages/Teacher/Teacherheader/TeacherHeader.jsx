import React, { useState, useEffect, useContext } from "react";
import { Icon, ICONS } from "../TeacherIcons";
import "./TeacherHeader.css";
import { ThemeContext } from "../../../components/Theme/ThemeContext";
import { authService } from "../../../services";

export default function Header() {
  const { theme, handleDarkTheme, handleLightTheme } = useContext(ThemeContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getProfile();
        setUser(data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const toggleTheme = () => {
    if (theme === "light-theme") {
      handleDarkTheme();
    } else {
      handleLightTheme();
    }
  };

  const fullName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.username || "Teacher"
    : "Teacher";

  const initials = user
    ? `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase() || "T"
    : "T";

  return (
    <header className="header">
      <div>
        <p className="header-subtitle">
          Welcome back, <strong>{fullName}</strong>
        </p>
      </div>

      <div className="header-actions">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light-theme" ? "Dark" : "Light"} Mode`}
        >
          <img
            src={theme === "dark-theme" ? "/sun.png" : "/moon.png"}
            alt="Theme Icon"
            width="20"
            height="20"
          />
        </button>

        <div className="avatar">{initials}</div>
      </div>
    </header>
  );
}