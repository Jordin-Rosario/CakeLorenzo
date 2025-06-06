
import DetailProductCard from "../../components/DetailProductCard";
import CakeImage from '../../assets/cakeImage.png';
import { useParams } from 'react-router-dom';
import api from "../../services/api";
import { useEffect, useState } from "react";
import { Cake } from '../../types/typex';

const DetailProduct = () => {
  const { id } = useParams();
  const [cake, setCake] = useState<Cake>();

  const getDetail = async () => {
    const req = await api.get(`api/cakes/${id}/`)
    const data = req.data;
    setCake(data)
  };

  useEffect(() => {
    getDetail()
  }, [])

  return (
    <div className="mt-20 lg:mb-52">
        <DetailProductCard
          Cake={cake}
        />
    </div>
  )
};

export default DetailProduct;