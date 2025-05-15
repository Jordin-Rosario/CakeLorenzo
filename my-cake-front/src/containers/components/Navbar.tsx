import  {NavLink} from 'react-router-dom';
import logo from '../assets/logoPrueba.png';

const Navbar = () => {
  return (
    <nav className="bg-pink-200 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-2">
          <a className="flex items-center space-x-1 rtl:space-x-reverse">
              <img src={logo} className="h-16" alt="Flowbite Logo" />
              <h1 className="text-pink-700 font-bold text-2xl">Cake Lorenzo</h1>
          </a>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="[&_li]:my-auto [&_li_a]:text-pink-700 hover:[&_li_a]:text-pink-900 border font-medium flex flex-col p-4 md:p-0 border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-pink-200">
                <li>
                <NavLink to="/cases"className="block py-3 px-3 rounded md:bg-transparent md:text-pink-base md:p-0 ">Casos</NavLink>
                </li>
                <li>
                <NavLink to="/" className="block py-2 px-3 rounded md:border-0 md:hover:text-pink-700 md:p-0">Servicios</NavLink>
                </li>
                <li>
                <NavLink to="/about" className="block py-2 px-3 rounded md:border-0 md:hover:text-pink-700 md:p-0">Nosotros</NavLink>
                </li>
                <li>
                <NavLink to="/carreras" className="block py-2 px-3 rounded md:border-0 md:hover:text-pink-700 md:p-0">Carreras</NavLink>
                </li>
                <li>
                <NavLink to="/blog" className="block py-2 px-3 rounded md:border-0 md:hover:text-pink-700 md:p-0">Blog</NavLink>
                </li>
                <li>
                <NavLink to="/contact" className="block py-2 px-3 h-full my-auto rounded md:border-0 md:hover:text-pink-700 md:p-0">Contacto</NavLink>
                </li>
                <div className=''>
                  <button
                      className="select-none border-none me-3 text-pink-950 rounded py-2 px-2 text-center font-sans text-xs font-bold uppercase text-pink-700 bg-white shadow-md shadow-gray-900/10 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none disabled:pointer-events-none"
                      type="button"
                  >
                      Registrate
                  </button>
                  <a
                      className="select-none text-pink-950 rounded py-2 px-2 text-center font-sans text-xs font-bold uppercase text-pink-700 bg-pink-400 shadow-md shadow-gray-900/10 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none disabled:pointer-events-none"
                      href='/login'
                  >
                      Inciar sesion
                  </a>
                </div>
            </ul>
          </div>
      </div>
    </nav>
  )
}

export default Navbar