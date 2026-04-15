import publicAPI from '../../services/publicAPI';
import privateAPI from '../../services/privateAPI';

export const getProductsAPI = async (category, sort, page, search) => {
  const response = await publicAPI.get(
    `/products?category=${category}&sort=${sort}&page=${page}&search=${search}`,
  );
  return response.data;
};

export const getProductByIdAPI = async (id) => {
  const response = await publicAPI.get(`/products/${id}`);
  return response.data;
};

export const addProductAPI = async (productData) => {
  const response = await privateAPI.post('/products/add-product', productData);
  return response.data;
};

export const updateProductAPI = async (id, productData) => {
  console.log(id, productData);
  const response = await privateAPI.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProductAPI = async (id) => {
  const response = await privateAPI.delete(`/products/${id}`);
  return response.data;
};
