import React, {useState, useEffect} from "react";
import { Icon, ICONS } from "../TeacherIcons";
import "./TeacherHeader.css";


export default function Header() {

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
      }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);


  return (
    <header className="header">
      <div>        
        <p className="header-subtitle">
          Welcome back, <strong>Dr. Salman Khan</strong>
        </p>
      </div>

      <div className="header-actions">

         <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDarkMode ? "Light" : "Dark"} Mode`}
            >
              <img 
                src={isDarkMode ? "/sun.png" : "/moon.png"} 
                alt="Theme Icon" 
                width="20" 
                height="20" 
              />
            </button>

        <div className="avatar">SK</div>
      </div>
    </header>
  );
}