import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './containers/pages/Home';
import CreateAccount from './containers/pages/createAccount';
import Login from './containers/pages/login';
import Logout from './containers/pages/logout';
import Error404 from './containers/errors/Error404';
import MainLayout from "./containers/layouts/MainLayout";
import { withAuth } from "./hocs/withAuth";
import Profile from "./containers/pages/profile";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          {/* Rutas sin Navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/" element={<Home />} />

          {/* Rutas con Navbar */}
          <Route element={<MainLayout />}>
            {/* Página protegida */}
            <Route path="/profile" element={React.createElement(withAuth(Profile))} />
            {/* Aquí puedes agregar más rutas que tengan Navbar */}
          </Route>

          {/* Ruta por defecto si no encuentra ninguna */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
