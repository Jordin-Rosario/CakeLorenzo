import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from './containers/pages/Home';
import CreateAccount from './containers/pages/createAccount';
import './App.css';
import Login from './containers/pages/login';
import Logout from './containers/pages/logout';
import Error404 from './containers/errors/Error404';
import { withAuth } from './hocs/withAuth';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} /> 
          <Route path="/logout" element={<Logout />} /> 
          
          <Route path="/create-account" element={<CreateAccount/>} />

          {/* Página protegida */}
          <Route path="/home" element={React.createElement(withAuth(Home))} />

          {/* Ruta por defecto si no encuentra ninguna */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
