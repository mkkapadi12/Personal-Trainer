const express = require('express');
const articlecontroller = require('../controllers/article.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/add-article', articlecontroller.addArticle);
router.get('/get-all', articlecontroller.getallArtcles);

//add comments
router.get('/get-comments/:articleId', articlecontroller.getComments);
router.post('/add-comments', authMiddleware, articlecontroller.addComment);
router.delete(
  '/delete-comment/:articleId/:commentId',
  authMiddleware,
  articlecontroller.deleteComment,
);

module.exports = router;
