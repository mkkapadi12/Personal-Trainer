import publicAPI from '../../services/publicAPI';
import privateAPI from '../../services/privateAPI';

export const registerUserAPI = async (data) => {
  const response = await publicAPI.post('/auth/register', data);
  return response.data;
};

export const loginUserAPI = async (data) => {
  const response = await publicAPI.post('/auth/login', data);
  return response.data;
};

export const getProfileAPI = async () => {
  const response = await privateAPI.get('/auth/profile');
  return response.data;
};

export const updateProfileAPI = async (data) => {
  const response = await privateAPI.put('/auth/update-profile', data);
  return response.data;
};
