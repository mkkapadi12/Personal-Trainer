const ARTICLE = require('../models/article.model');

const addArticle = async (req, res, next) => {
  try {
    const { title, category, tags, description, featuredImage, author } =
      req.body;

    const article = await ARTICLE.create({
      title,
      category,
      tags,
      description,
      featuredImage,
      author,
    });

    return res.status(201).json({
      msg: 'Article created successfully',
      article,
    });
  } catch (error) {
    next(error);
  }
};

const getallArtcles = async (req, res, next) => {
  try {
    const articles = await ARTICLE.find().populate('author');

    if (!articles || articles.length === 0) {
      const error = new Error('Articles not found');
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({
      articles,
    });
  } catch (error) {
    return next(error);
  }
};

const addComment = async (req, res, next) => {
  try {
    const { articleId, comment } = req.body;

    const article = await ARTICLE.findById(articleId);

    if (!article) {
      const error = new Error('Article not found');
      error.status = 404;
      return next(error);
    }

    article.comments.push({ comment, user: req.user._id });
    await article.save();

    return res.status(200).json({
      msg: 'Comment added successfully',
      article,
    });
  } catch (error) {
    return next(error);
  }
};

const getComments = async (req, res, next) => {
  try {
    const { articleId } = req.params;

    const article = await ARTICLE.findById(articleId).populate(
      'comments.user',
      'firstName lastName email',
    );

    if (!article) {
      const error = new Error('Article not found');
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({
      comments: article.comments,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { commentId, articleId } = req.params;

    const article = await ARTICLE.findById(articleId);

    if (!article) {
      const error = new Error('Article not found');
      error.status = 404;
      return next(error);
    }

    article.comments.pull(commentId);
    await article.save();

    return res.status(200).json({
      msg: 'Comment deleted successfully',
      article,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addArticle,
  getallArtcles,
  addComment,
  getComments,
  deleteComment,
};
