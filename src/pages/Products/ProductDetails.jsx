import { getProductById } from '@/Store/features/product/product.slice';
import { Loader2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SingleProduct from './components/SingleProduct';

const ProductDetails = () => {
  const { id } = useParams();
  const { singleProduct, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [id, dispatch]);

  if (!singleProduct) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="">
      <section className="max-w-292.5 mx-auto container px-3">
        <SingleProduct key={singleProduct?._id} product={singleProduct} />
      </section>
    </div>
  );
};

export default ProductDetails;
