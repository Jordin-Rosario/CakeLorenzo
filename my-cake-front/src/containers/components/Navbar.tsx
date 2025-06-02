import  {NavLink} from 'react-router-dom';
import logo from '../assets/logoPrueba.png';
import { useUserStore } from '../stores/userStore';
import { useState, useEffect } from 'react';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  const { user } = useUserStore();
  const [ currentUser, setCurrentUser] = useState<any>();

  useEffect(() => {
    setCurrentUser(user)

  }, [user]);

  return (
    <nav className="bg-gray-100 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-2">
          <a className="flex items-center space-x-1 rtl:space-x-reverse">
              <img src={logo} className="h-16" alt="Flowbite Logo" />
              <h1 className="text-gray-700 font-bold text-2xl">Cake Lorenzo</h1>
          </a>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="[&_li]:my-auto [&_li_a]:text-gray-700 hover:[&_li_a]:text-gray-900 border font-medium flex flex-col p-4 md:p-0 border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-gray-100">
                <li>
                  <NavLink to="/"className="block py-3 px-3 rounded md:bg-transparent md:text-gray-base md:p-0 ">Inicio</NavLink>
                </li>
               
                <li>
                  <NavLink to="/offers"className="block py-3 px-3 rounded md:bg-transparent md:text-gray-base md:p-0 ">offers</NavLink>
                </li>
                <li>
                  <NavLink to="/" className="block py-2 px-3 rounded md:border-0 md:hover:text-gray-700 md:p-0">Nosotros</NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className="block py-2 px-3 h-full my-auto rounded md:border-0 md:hover:text-gray-700 md:p-0">Contacto</NavLink>
                </li>
                {
                  currentUser &&
                <li>
                  <NavLink to="/contact" className="block py-2 px-3 h-full my-auto rounded md:border-0 md:hover:text-gray-700 md:p-0">
                    <FontAwesomeIcon icon={faCartShopping} className="text-md text-gray-800" />
                  </NavLink>
                </li>
                }
                <div className=''>
                  {!currentUser
                    ?
                    <>
                      <a
                          className="select-none border-none me-3 text-gray-950 py-2 px-2 text-center font-sans text-xs font-semibold uppercase text-gray-700 bg-white shadow-md shadow-gray-900/10 transition-all duration-300 focus:opacity-[0.85] disabled:pointer-events-none"
                          href='/create-account'
                      >
                          Registrate
                      </a>
                      <a
                          className="select-none text-white py-2 px-2 bg-black text-center font-sans text-xs font-semibold uppercase transition-all duration-300 disabled:pointer-events-none"
                          href='/login'
                      >
                          Inciar sesion
                      </a>
                    </>
                    : 
                    <>
                      <a aria-hidden="true" className='cursor-pointer' href='/profile'>Perfil {currentUser?.username}</a>
                      <a href='/logout' className='cursor-pointer ms-5 hover:text-red-500'>Cerrar sesion</a>
                    </>
                  }
                </div>
            </ul>
          </div>
      </div>
    </nav>
  )
}

export default Navbar