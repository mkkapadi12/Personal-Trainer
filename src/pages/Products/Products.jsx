import PageHero from '@/components/PageHero';
import { getProducts } from '@/Store/features/product/product.slice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import ProductSection from './components/ProductSection';

const Products = () => {
  const { category } = useParams();
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts({ category, sort: 'all', page: 1 }));
  }, [category]);

  if (error) {
    toast.error(error);
  }

  return (
    <div>
      <PageHero
        title={category}
        backLink="/products"
        backText="Back to products"
        description={`Showing all products in the ${category} category`}
      />
      <section className="container mx-auto max-w-292.5 px-3">
        <ProductSection products={products} loading={loading} />
      </section>
    </div>
  );
};

export default Products;
