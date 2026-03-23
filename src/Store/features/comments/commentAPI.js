import publicAPI from '../../services/publicAPI';
import privateAPI from '../../services/privateAPI';

export const getCommentsAPI = async (articleId) => {
  const response = await publicAPI.get(`/article/get-comments/${articleId}`);
  return response.data;
};

export const addCommentAPI = async (data) => {
  const response = await privateAPI.post('/article/add-comments', data);
  return response.data;
};

export const deleteCommentAPI = async ({ articleId, commentId }) => {
  const response = await privateAPI.delete(
    `/article/delete-comment/${articleId}/${commentId}`,
  );
  return response.data;
};
