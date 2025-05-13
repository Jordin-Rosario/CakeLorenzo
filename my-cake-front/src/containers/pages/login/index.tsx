import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4444/api/token/', {
        username,
        password,
      });

      // Guarda tokens
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);

      // Redirige al home
      navigate('/home');
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" style={{ marginTop: 15 }}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
