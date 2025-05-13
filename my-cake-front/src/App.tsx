import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from './containers/pages/Home';
import './App.css';
import Login from './containers/pages/login'; // 👈 tu login
import Error404 from './containers/errors/Error404';

function RequireAuth({ children }: { children: any}) {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // Redirige al login y guarda la ubicación previa
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} /> {/* 👈 ruta al login */}

          {/* Página protegida */}
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />

          {/* Ruta por defecto si no encuentra ninguna */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
