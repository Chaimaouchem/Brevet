import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Table from './table';
import Header from './header';
import Sidebar from './Sidebar';
import Home from './Home';
import InnovationForm from './ajout/InnovationForm';
import Login from './Login/Login';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Récupère le token pour rester connecté après un reload
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token");
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Hook pour connaître la route actuelle
  const location = useLocation();
  const isLoginPage = location.pathname === "/Login";

  return (
    <div className="grid-container">
      {/* Affiche Header et Sidebar uniquement si connecté et pas sur la page Login */}
      {isAuthenticated && !isLoginPage && (
        <>
          <Header OpenSidebar={toggleSidebar} />
          <Sidebar openSidebarToggle={sidebarOpen} OpenSidebar={toggleSidebar} />
        </>
      )}

      <main>
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dash" : "/Login"} />} />

          <Route
            path="/Login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />

          {/* Routes protégées */}
          <Route
            path="/dash"
            element={isAuthenticated ? <Home /> : <Navigate to="/Login" />}
          />
          <Route
            path="/table"
            element={isAuthenticated ? <Table /> : <Navigate to="/Login" />}
          />
          <Route
            path="/ajout"
            element={isAuthenticated ? <InnovationForm /> : <Navigate to="/Login" />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
