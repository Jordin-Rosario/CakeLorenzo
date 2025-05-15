import { useState, useEffect } from 'react';
import api from '../services/api';

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
    <div className='text-2xl'>
      <span className='text-black'>Hola Mundo!!!</span>

      {
        data ? (
          <div>
            <span className='bg-red-500'>Total: {data.count}</span>
            {data.results?.map((cake: any) => (
              <div key={cake.id} className='text-black'>
                {cake.nombre}
              </div>
            ))}
          </div>
        ) : (
          <span className='text-black'>Cargando...</span>
        )
      }
    </div>
  );
};

export default Home;