import privateAPI from '../../services/privateAPI';
import publicAPI from '../../services/publicAPI';

export const createAppointment = async (appointmentData) => {
  const response = await privateAPI.post(
    '/appointment/create',
    appointmentData,
  );
  return response.data;
};

export const getAllAppointments = async () => {
  const response = await privateAPI.get('/appointment/all-appointments');
  return response.data;
};
