import publicAPI from '../../services/publicAPI';

export const getProductsAPI = async (category, sort, page) => {
  const response = await publicAPI.get(
    `/products?category=${category}&sort=${sort}&page=${page}`,
  );
  return response.data;
};

export const getProductByIdAPI = async (id) => {
  const response = await publicAPI.get(`/products/${id}`);
  return response.data;
};
