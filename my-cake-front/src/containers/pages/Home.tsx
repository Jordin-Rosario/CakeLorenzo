import { useState, useEffect } from 'react';
import api from '../services/api';
import Card from '../components/Card';

const req = async (url: string) => {
  const response = await api.get(url)
  const data = await response.data;
  return data
};

const Home = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const req_ = async () => {
      const data = await req('api/cakes/');
      setData(data);
    }

    req_()
  }, []);

  return (
    <div className='text-2xl container mx-auto'>
        <section className="py-5 bg-white sm:py-5 lg:py-10 mx-auto">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-md mx-auto text-center">
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">NUESTROS MEJORES PASTELES AL MEJOR PRECIO</h2>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:grid-cols-4"> 

            {
              data ? (
                  data.results?.map((cake: any) => (
               
                    <Card key={cake.id} cake={cake} />

                  ))
              ) : (
                <span className='text-black'>Cargando...</span>
              )
            }

            </div>
          </div>
      </section>
    </div>
  );
};

export default Home;