import { useUserStore } from "../containers/stores/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { ComponentType } from "react";

export const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthWrapper = (props: P) => {
    const { isLoggedIn, loading, setLoading } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
      setLoading(true);

      const timer = setTimeout(() => {
        if (!isLoggedIn) {
          const nextPath = encodeURIComponent(window.location.pathname);
          navigate(`/login?next=${nextPath}`);
        }
        setLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    }, [isLoggedIn]);

    console.log(isLoggedIn)

    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-pulse text-blue-900 font-semibold text-xl">Cargando...</div>
        </div>
      );
    }

    return isLoggedIn ? <WrappedComponent {...props} /> : null;
  };

  return AuthWrapper;
};
