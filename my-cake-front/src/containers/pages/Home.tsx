import { useState, useEffect } from 'react';
import api from '../services/api';
import Card from '../components/Card';

import SkeletonCard from '../components/SkeletonCard';

const req = async (url: string) => {
  try{
    const response = await api.get(url)
    return  await response.data;
  }catch (error) {
    return error;
  }
};

const Home = () => {
  const [data, setData] = useState<any>(null);
  const [messageError, setMessageError] = useState<string>();

  useEffect(() => {
    const req_ = async () => {
      const data = await req('api/cakes/');
      
      if (data.message) {
        console.log('ASD')
        console.error('Error fetching cakes:', data.message);
        setMessageError(`Error al optener los datos: ${data.message}`)
        return;
      }

      setData(data);
    }

    req_()
  }, []);

  return (
    <div className='text-2xl container mx-auto'>
        <section className="py-5 bg-white sm:py-5 lg:py-10 mx-auto">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-md mx-auto text-center">
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">NUESTROS MEJORES PASTELES AL MEJOR prince</h2>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:grid-cols-4"> 

            {
              data ? (
                  data.results?.map((cake: any) => (
                    
                    <Card key={cake.id} cake={cake} />

                  ))
              ) : (
                messageError ? (
                  <div className='bg-red-200 text-red-800 text-lg px-2 py-1 border border-red-400 rounded-sm col-span-4'>
                    <p className='wrap-none'>{messageError}</p>
                  </div>
                ): (
                  <>
                    <SkeletonCard/>
                    <SkeletonCard/>
                    <SkeletonCard/>
                    <SkeletonCard/>
                  </>
                )
              )
            }

            </div>
          </div>
      </section>
    </div>
  );
};

export default Home;