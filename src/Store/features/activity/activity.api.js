import privateAPI from '@/Store/services/privateAPI';

export const getRecentActivity = async ({ limit }) => {
  const response = await privateAPI.get(`/admin/activity/recent?limit=${limit}`);
  return response.data;
};
