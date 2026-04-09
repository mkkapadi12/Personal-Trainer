import publicAPI from '@/Store/services/publicAPI';
import privateAPI from '@/Store/services/privateAPI';

export const adminRegisterAPI = async (data) => {
  const response = await publicAPI.post('/admin/register', data);
  return response.data;
};

export const adminLoginAPI = async (data) => {
  const response = await publicAPI.post('/admin/login', data);
  return response.data;
};

export const adminProfileAPI = async () => {
  const response = await privateAPI.get('/admin/profile');
  return response.data;
};

export const updateAdminProfileAPI = async (data) => {
  const response = await privateAPI.put('/admin/update-profile', data);
  return response.data;
};

export const getAllUsersAPI = async ({ page, limit, search, sort }) => {
  const response = await privateAPI.get(
    `/admin/users?page=${page}&limit=${limit}&search=${search}&sort=${sort}`,
  );
  return response.data;
};
