import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';

export default function Logout() {
  const logout = useUserStore((state:any) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // elimina sesión
    navigate('/'); // redirige
  }, [logout, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-blue-900 font-semibold text-xl animate-pulse">Cerrando sesión...</p>
    </div>
  );
}
