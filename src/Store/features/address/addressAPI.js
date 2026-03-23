import publicAPI from '../../services/publicAPI';
import privateAPI from '../../services/privateAPI';

export const getAddressesAPI = async () => {
  const response = await privateAPI.get('/user/addresses');
  return response.data;
};

export const createAddressAPI = async (data) => {
  const response = await privateAPI.post('/user/addresses/create-new', data);
  return response.data;
};

export const editAddressAPI = async (id, data) => {
  const response = await privateAPI.put(`/user/addresses/${id}`, data);
  return response.data;
};

export const deleteAddressAPI = async (id) => {
  const response = await privateAPI.delete(`/user/addresses/${id}`);
  return response.data;
};
