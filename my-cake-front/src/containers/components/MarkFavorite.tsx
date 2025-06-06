import { useState, useEffect } from "react";
import api from "../services/api";

type MarkFavoriteProps = {
    productId:number;
    isFavorite?:boolean;
}

// GET /api/favorites/?cake=6
const getFavorite = async (productId:number) => {
  try {
    const response = await api.get(`api/favorites/?cake=${productId}`);
    return await response.data[0];
  } catch (error) {
    console.error('Error fetching favorite:', error);
    throw error;
  }
}

const reqUpdate = async (isActive:boolean, productId:number) => {
  const req = await api.patch(`api/favorites/${productId}/`, {
    is_active: isActive
  });
  
  return await req.data; 
};

const reqCreate = async (productId:number) => {
  const req = await api.post(`api/favorites/`, {
    cake: productId,
    is_active: true
  }); 
  return await req.data; 
}

const MarkFavorite = ({productId, isFavorite = false}:MarkFavoriteProps) => {
  
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite)  ;
  
  const maskFavoriteReq = async () => {
    setIsFavoriteState(!isFavoriteState);
    
    try {
      const data = await getFavorite(productId);
      if (data) {
        // If the favorite exists, toggle its status
        const dataReq = await reqUpdate(!isFavoriteState, data.id);
        console.log('update favorite', dataReq);

      } else {
        // If it doesn't exist, create a new favorite
        const dataReq = await reqCreate(productId)
        console.log('create favorite', dataReq);
      }
    } catch (error) {
      console.error('Error fetching favorite status:', error);
    }
  };

  return (
    <div >
        <button onClick={maskFavoriteReq}>
          {
            !isFavoriteState 
            ? <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-icon lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            : <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="fill-red-500 lucide lucide-heart-icon lucide-heart text-red-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          }
        </button>
    </div>
  )
};

export default MarkFavorite;