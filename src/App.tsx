import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Users from "./components/users";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Users/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
