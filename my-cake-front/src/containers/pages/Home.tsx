import axios from 'axios'


const token = localStorage.getItem('token');

const consulta = async () =>{
  await axios.get('http://localhost:4444/cakes/', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.error('Error al obtener los cakes:', error);
    
  }); 
}


const Home = () => {
  consulta()
  return (
    <div className='bg-red-500'>Hola Mundo!!</div>
  )
}

export default Home