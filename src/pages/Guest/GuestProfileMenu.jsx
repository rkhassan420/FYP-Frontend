import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../components/Theme/ThemeContext";
import { Icon, ICONS } from "../Teacher/TeacherIcons";
import "./Menu.css";
import { authService, clearAuthSession, getRefreshToken } from "../../services";

export default function GuestProfileMenu({ onClose }) {
  const { theme, handleDarkTheme, handleLightTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const toggleTheme = () => {
    if (theme === "light-theme") {
      handleDarkTheme();
    } else {
      handleLightTheme();
    }
  };

 
     const handleLogout = async () => {
     const refresh = getRefreshToken();
   
     if (refresh) {
       try {
         await authService.logout({ refresh });
       } catch {
         // Local cleanup should still happen if the token is already expired.
       }
     }
    
     clearAuthSession();   
     navigate("/guest/login", { replace: true });
   };

  return (
    <div className="guest-profile-popup">
      
      {/* HEADER */}
      <div className="guest-popup-header">
        <div className="guest-popup-title">Account</div>
        <button onClick={onClose} className="guest-popup-close">✕</button>
      </div>

     

      {/* OPTIONS */}
      <div className="guest-popup-item" onClick={toggleTheme}>
        <img
                src={theme === "dark-theme" ? "/sun.png" : "/moon.png"}
                alt="Theme Icon"
                width="20"
                height="20"
              />
        <span>Toggle Theme</span>
      </div>

    

      <div className="guest-popup-item logout" onClick={handleLogout}>
        <Icon d={ICONS.logOut} size={18} />
        <span>Logout</span>
      </div>
    </div>
  );
}