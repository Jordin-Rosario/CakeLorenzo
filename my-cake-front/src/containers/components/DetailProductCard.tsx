import { Cake } from '../types/typex';
import SkeletonCard from './SkeletonCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
type Props = { 
  Cake?:Cake
}

const DetailProductCard = ({Cake}:Props) => {
  if (!Cake) return <div className="max-w-7xl mx-auto bg-white overflow-hidden lg:grid px-8 md:px-48"><SkeletonCard/></div>

  return (
    <div className="max-w-7xl mx-auto bg-white overflow-hidden lg:grid lg:grid-cols-2">
      <div className='bg-gray-100'>
        {
          Cake.image ?
            <img src={Cake.image} alt={Cake.name} className="w-full lg:h-[500px] object-cover my-auto" />
          :
            <div className="w-full lg:h-[500px] flex items-center justify-center my-auto" >
              <FontAwesomeIcon icon={faNoteSticky} className="text-md text-gray-800 text-black/70 me-1" /> <span className='text-black/70'>Image Not Found</span> 
            </div>
        }
      </div>
        
      <div className="p-6 pt-5 flex flex-col bg-gray-50">
        <div>
          <h2 className="text-2xl font-bold mb-2">{Cake.name}</h2>
          <p className="text-gray-700 mb-4">{Cake.description}</p>
          {/*
            <h3 className="font-semibold">Highlights:</h3>
           <ul className="list-disc list-inside mb-4">
            {highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul> */}
        </div>
        <div className='mt-auto'>
        <form action="">
          <div className="sm:flex sm:justify-start gap-x-2 bg-gray-100 py-7 rounded-lg px-5 mb-2 mt-auto">
            <div className='bg-gray-200/80 px-2 py-1 rounded flex flex-nowrap mb-auto'>
              {/* {color} */}
              <label htmlFor="libras" className='text-gray-600 font-semibold'>LIBRAS</label>
              <select name="libras" id="libras" className='ms-2 bg-transparent'>
                <option value="1">1</option>
                <option value="1/2">1/2</option>
                <option value="1/4">1/4</option>
                
              </select>
            </div>
            <div className='bg-gray-200/80 px-2 py-1 rounded flex flex-nowrap mb-auto'>
              {/* {color} */}
              <label htmlFor="masas" className='text-gray-600 font-semibold'>MASAS</label>
              <select name="masas" id="masas" className='ms-2 bg-transparent'>
                <option value="CHOCOLATE">CHOCOLATE</option>
                <option value="VAINILLA">VAINILLA</option>
                <option value="RED VELVET">RED VELVET</option>
                <option value="ZANAHORIA">ZANAHORIA</option>
              </select>
            </div>
            <div className='bg-gray-200/80 px-2 py-1 rounded flex flex-nowrap mb-auto'>
              {/* {color} */}
              <label htmlFor="relleno" className='text-gray-600 font-semibold'>RELLENO</label>
              <select name="relleno" id="relleno" className='ms-2 bg-transparent'>
                <option value="DULCE DE LECHE">DULCE DE LECHE</option>
                <option value="VAINILLA">PISTACHO</option>
                {/* <option value="3">3</option> */}
              </select>
            </div>
          </div>
          <div>
            {/* <span>Agregar </span> */}
          </div>
          <div className="flex justify-end items-end">
            <div className='flex flex-col items-end'>
              <div className="text-2xl font-bold text-end">{Cake.after_prince && <del className='text-sm text-red-500 mb-auto text-top'>$ {Cake.after_prince}</del> } RD$ {Cake.prince}</div>
              <button className="bg-black text-white py-2 px-4 hover:bg-gray-800 transition">
                Añadir al carrito
              </button>
            </div>
          </div>
        </form>
        </div>


      </div>
    </div>
  );
};

export default DetailProductCard;