import privateAPI from '@/Store/services/privateAPI';

export const getAdminOrders = async (status, search, sort, page, limit) => {
  const response = await privateAPI.get(
    `/orders?status=${status}&search=${search}&sort=${sort}&page=${page}&limit=${limit}`,
  );
  return response.data;
};

export const createOrderAPI = async (orderData) => {
  const response = await privateAPI.post('/orders/create', orderData);
  return response.data;
};

export const getUserOrders = async () => {
  const response = await privateAPI.get('/orders/myorders');
  return response.data;
};

export const patchOrderStatus = async (id, status) => {
  const response = await privateAPI.patch(`/orders/${id}/status`, { status });
  return response.data;
};
