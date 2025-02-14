import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/web-view/Home/Home.jsx";
import NotesGroup from "./components/mobile-view/NotesGroup/NotesGroup.jsx";
import NotesMessages from "./components/mobile-view/NotesMessage/NotesMessage.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  /* manage local storage centraly  */
  const [groupNames, setGroupNames] = useState(() => {
    return JSON.parse(localStorage.getItem("groupNames")) || {};
  });

  const [selectedGroupName, setSelectedGroupName] = useState(
    localStorage.getItem("selectedGroupName") || ""
  );
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("messages")) || []
  );

  // Sync changes to localStorage when groupNames updates
  useEffect(() => {
    localStorage.setItem("groupNames", JSON.stringify(groupNames));
  }, [groupNames]);

  useEffect(() => {
    localStorage.setItem("selectedGroupName", selectedGroupName);
  }, [selectedGroupName]);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);
  
  /* check screen size */
 /*  const checkScreenSize = () => {
    setScreenSize(window.innerWidth);
  };

  window.addEventListener("resize", checkScreenSize); */

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScreenSize(window.innerWidth);
      }, 100);
    };
  
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);


  

  return (
    <>
    
    <BrowserRouter>
      <div className="desktop-view">
        {screenSize > 500 && (
          <Home
            groupNames={groupNames}
            setGroupNames={setGroupNames}
            selectedGroupName={selectedGroupName}
            setSelectedGroupName={setSelectedGroupName}
            messages={messages}
            setMessages={setMessages}
          />
        )}
      </div>
      
      <div className="mobile-view">
        {screenSize <= 500 && (
          <Routes>
            <Route
              path="/"
              element={
                <NotesGroup
                  groupNames={groupNames}
                  setGroupNames={setGroupNames}
                  selectedGroupName={selectedGroupName}
                  setSelectedGroupName={setSelectedGroupName}
                  messages={messages}
                  setMessages={setMessages}
                />
              }
            />
            <Route
              path="/notes"
              element={
                <NotesMessages
                  groupNames={groupNames}
                  setGroupNames={setGroupNames}
                  selectedGroupName={selectedGroupName}
                  setSelectedGroupName={setSelectedGroupName}
                  messages={messages}
                  setMessages={setMessages}
                />
              }
            />
          </Routes>
        )}
      </div>
    </BrowserRouter>
      
    </>
  );
}

export default App;
