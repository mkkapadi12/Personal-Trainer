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

export const getAllAppointmentsAdmin = async ({
  page,
  limit,
  sort,
  search,
  service,
}) => {
  const response = await privateAPI.get('/appointment/all-appointments-admin', {
    params: { page, limit, sort, search, service },
  });
  return response.data;
};
