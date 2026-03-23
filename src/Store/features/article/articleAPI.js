import publicAPI from '../../services/publicAPI';
import privateAPI from '../../services/privateAPI';

export const getArticleAPI = async () => {
  const response = await publicAPI.get('/article/get-all');
  return response.data;
};
