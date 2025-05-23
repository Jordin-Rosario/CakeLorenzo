// src/pages/Login.tsx
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../../services/auth";
import { useState } from "react";
import logo from '../../assets/cakeImage.png';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await loginUser({ username: data.username, password: data.password });
      const next = new URLSearchParams(location.search).get("next") || "/";
      navigate(next);
    } catch (error:any) {
      setErrorMessage(error?.response?.data.detail || error.message)
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="INABIE logo"
          src={logo}
          className="mx-auto h-auto w-42"
        />
        <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Iniciar sesión
        </h1>
        <h2 className="mt-2 text-center text-md font-bold tracking-tight text-gray-500">
          Accede a tu cuenta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
              Usuario
            </label>
            <div className="mt-2">
              <input
                id="username"
                placeholder="Nombre de usuario"
                type="text"
                autoComplete="username"
                {...register("username", { required: "El usuario es obligatorio" })}
                className="block w-full rounded-xs bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-900 sm:text-sm/6"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{String(errors.username.message)}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
              Contraseña
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                placeholder="***************"
                autoComplete="current-password"
                {...register("password", { required: "La contraseña es obligatoria" })}
                className="block w-full rounded-xs bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-900 sm:text-sm/6"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{String(errors.password.message)}</p>
              )}
            </div>
          </div>

          <span className="text-red-500">{errorMessage ? errorMessage: ''}</span>

            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer flex w-full mb-0 justify-center rounded-xs bg-gray-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              {isSubmitting ? "Cargando..." : "Iniciar sesión"}
            </button>
          {/* <div className="flex items-center justify-between mt-0">
            <div className="text-sm">
              <a href="#" className="font-medium text-gray-900 hover:text-gray-800">
                Olvidaste tu contraseña?
              </a>
            </div>
          </div> */}
          <a href="/create-account" className="underline">Crear cuenta</a>
        </form>
      </div>
    </div>
  );
}
