// src/pages/Login.tsx
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { createAccountUser } from "../../services/createAccount";
import { useState } from "react";
import logo from '../../assets/cakeImage.png';


const CreateAccount = () => {
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
      const a = await createAccountUser({ username: data.username, name:data.name, lastname:data.lastname, email:data.email, password: data.password });
      console.log(a, '----')

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
          className="mx-auto h-auto w-[250px]"
        />
        <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Crear una nueva cuenta
        </h1>
  
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-5">

            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Usuario <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  type="text"
                  placeholder="Nombre de usuario eje: marco_antonio"
                  autoComplete="username"
                  {...register("username", { required: "El usuario es obligatorio" })}
                  className="block w-full rounded-sm bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-900 sm:text-sm/6"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{String(errors.username.message)}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                Nombres <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  type="text"
                  placeholder="Nombres"
                  autoComplete="name"
                  {...register("name", { required: "El nombre es obligatorio" })}
                  className="block w-full rounded-sm bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-900 sm:text-sm/6"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{String(errors.name.message)}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm/6 font-medium text-gray-900">
                Apellidos <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="lastname"
                  type="text"
                  placeholder="Apellidos"
                  autoComplete="lastname"
                  {...register("lastname", { required: "El apellido es obligatorio" })}
                  className="block w-full rounded-sm bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-900 sm:text-sm/6"
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm mt-1">{String(errors.lastname.message)}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="text"
                  autoComplete="email"
                  placeholder="Email eje: emailejemplo@gmail.com"
                  {...register("email", { required: "El email es obligatorio" })}
                  className="block w-full rounded-sm bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-900 sm:text-sm/6"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{String(errors.email.message)}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Contraseña <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="************"
                  {...register("password", { required: "La contraseña es obligatoria" })}
                  className="block w-full rounded-sm bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-900 sm:text-sm/6"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{String(errors.password.message)}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Confirmar contraseña <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  placeholder="************"
                  type="password"
                  autoComplete="current-password"
                  {...register("password", { required: "La contraseña es obligatoria" })}
                  className="block w-full rounded-sm bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-900 sm:text-sm/6"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{String(errors.password.message)}</p>
                )}
              </div>
            </div>
          </div>

          <span className="text-red-500">{errorMessage ? errorMessage: ''}</span>
          <div className="col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer col-span-2 flex text-md w-full mb-0 justify-center rounded-sm bg-gray-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              {isSubmitting ? "Cargando..." : "Crear cuenta"}
            </button>
          </div>
        </form>
        <a href="/login" className="underline">Iniciar sesión</a>
      </div>
    </div>  
  )
}

export default CreateAccount