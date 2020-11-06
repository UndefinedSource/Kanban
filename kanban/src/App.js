import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import "./App.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const changeTheme = () => {
    setIsDarkMode(!isDarkMode);
  }

  useEffect(() =>{
    window.onbeforeunload = function(e) {
      var dialogText = "";
      e.returnValue = dialogText;
    }
  }, []);

  return (
    <div className={isDarkMode? "app-darkMode" : "app"} >
      <Board changeTheme={() => changeTheme()}/>
    </div>
  );
}

export default App;
