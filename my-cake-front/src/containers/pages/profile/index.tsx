import { useForm } from "react-hook-form";
import { useUserStore } from "../../stores/userStore";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { PerfilUsuario } from "../../types/typex";
import SuccessAlert from "../../components/AlertSuccess";

const Profile = () => {
  const { user } = useUserStore();
  const [messageSuccess, setMessageSuccess] = useState<string>('');
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const getProfileInfo = async () => {
    const req = await api.get(`/perfil/${user?.id}/`);
    const data = req.data;
  
    reset({
      username: data.user.username,
      first_name: data.user.first_name,
      last_name: data.user.last_name,
      email: data.user.email,
      telefono: data.telefono || '',
      otro_contacto: data.otro_contacto || '',
      direccion: data.direccion || '',
    });
  };

  useEffect(() => {
    getProfileInfo()
  }, []);
  
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    try{
    console.log(data)
    const req = await api.patch(`/perfil/${user?.id}/`, 
      // data
      {
        "user":{
          "email":data.email,
          "first_name":data.first_name,
          "last_name": data.last_name
        },
        "telefono":data.telefono,
        "otro_contacto":data.otro_contacto,
        "direccion":data.direccion
      }
    )
    const res = await req.data;
    setMessageSuccess('Su informacion actualizada con exito.')
    
  } catch (error:any) {
      if (error.response) {
        alert("Error de validación");
        if (error.response.status === 400) {
          alert("Error en los datos enviados. Revisa los campos.");
        } else if (error.response.status === 403 || error.response.status === 401) {
          alert("No tienes permiso para realizar esta acción.");
        }
      } else {
        console.error("Error de red u otro:", error);
        alert("Ocurrió un error. Intenta más tarde.");
      }
    }
  };
  

  return (
    <div className="container mx-auto">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">

        <h1 className="text-4xl font-semibold mt-10 mb-1">Editar mi perfil</h1>
        <hr  className="mb-9"/>

        <form  className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
              <label htmlFor="first_name" className="block text-sm/6 font-medium text-gray-900">
                Nombres <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="first_name"
                  type="text"
                  placeholder="Nombres"
                  autoComplete="first_name"
                  {...register("first_name", { required: "El nombre es obligatorio" })}
                  className="block w-full rounded-sm bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-900 sm:text-sm/6"
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm mt-1">{String(errors.first_name.message)}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm/6 font-medium text-gray-900">
                Apellidos
              </label>
              <div className="mt-2">
                <input
                  id="last_name"
                  type="text"
                  placeholder="Apellidos"
                  autoComplete="last_name"
                  {...register("last_name", { required: "El apellido es obligatorio" })}
                  className="block w-full rounded-sm bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-900 sm:text-sm/6"
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm mt-1">{String(errors.last_name.message)}</p>
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
              <label htmlFor="telefono" className="block text-sm/6 font-medium text-gray-900">
                Teléfono
              </label>
              <div className="mt-2">
                <input
                  id="telefono"
                  type="text"
                  autoComplete="telefono"
                  placeholder="Teléfono eje: 809-555-4488"
                  {...register("telefono", )}
                  className="block w-full rounded-sm bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-900 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="otro_contacto" className="block text-sm/6 font-medium text-gray-900">
                Otro contacto
              </label>
              <div className="mt-2">
                <input
                  id="otro_contacto"
                  type="text"
                  autoComplete="otro_contacto"
                  placeholder="Otro contacto"
                  {...register("otro_contacto",)}
                  className="block w-full rounded-sm bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-900 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="otro_contacto" className="block text-sm/6 font-medium text-gray-900">
                Direccion
              </label>
              <div className="mt-2">
                <input
                  id="direccion"
                  type="text"
                  autoComplete="direccion"
                  placeholder="Dirección"
                  {...register("direccion",)}
                  className="block w-full rounded-sm bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-900 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
          
          {messageSuccess && <SuccessAlert message={messageSuccess}/>}

          <div className="w-32 pb-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer col-span-2 flex text-md w-full mb-0 justify-center rounded-sm bg-gray-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              {isSubmitting ? "Cargando..." : "Actualizar perfil"}
            </button>
          </div>
        </form>
        </div>
    </div>
  )
}

export default Profile;