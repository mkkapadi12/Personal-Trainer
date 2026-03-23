import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ArticleHeader from './components/ArticleHeader';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '@/lib/utils';
import ArticleCard from './components/ArticleCard';
import {
  deleteComment,
  getComments,
} from '@/Store/features/comments/comment.slice';
import CommentForm from './components/Commentform';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const SingleArticle = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const { articles } = useSelector((state) => state.article);
  const { comments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  const single_article = articles.find((article) => article._id === id);
  const relatedArticles = articles.filter(
    (article) => article.category === single_article.category,
  );

  useEffect(() => {
    dispatch(getComments(id));
  }, [single_article]);

  return (
    <div className="min-h-screen">
      <ArticleHeader article={single_article} />
      <section className="py-10 md:py-20">
        <div className="container mx-auto max-w-292.5 px-3">
          <div className="flex flex-wrap items-start justify-between">
            {/* article header */}
            <div className="w-full space-y-4 md:space-y-7 mb-6 md:mb-10 px-2 sm:px-4">
              <div className="flex flex-wrap items-center justify-start gap-4 md:gap-6">
                <h1 className="font-bold italic text-lg text-black">
                  WorkDo Themes
                </h1>
                <p className="text-sm font-medium text-black capitalize tracking-wider">
                  Category : {single_article?.category}
                </p>
                <p className="text-sm font-medium text-black">
                  Date : {formatDate(single_article?.createdAt)}
                </p>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-black">
                {single_article?.title}
              </h1>
            </div>
            {/* article content */}
            <div className="w-full md:w-1/2 lg:w-[66%] px-2 sm:px-4 space-y-5">
              {/* image */}
              <div className="w-full md:h-[500px]">
                <img
                  src={single_article?.featuredImage}
                  alt={single_article?.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                className="prose prose-sm sm:prose-base max-w-none prose-blockquote:text-sm sm:prose-blockquote:text-base prose-blockquote:font-semibold"
                dangerouslySetInnerHTML={{
                  __html: single_article?.description,
                }}
              />
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-base">Tags:</h1>
                {single_article?.tags.map((tag) => (
                  <span key={tag} className="text-sm font-normal">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* article section 2 */}
            <div className="w-full md:w-1/2 lg:w-[33%] px-2 sm:px-4 sm:mt-0 mt-10 space-y-4">
              {/* related articles */}
              <div className="space-y-5">
                <h1 className="text-2xl md:text-4xl font-bold text-black uppercase">
                  Related articles
                </h1>
                {relatedArticles.map((article) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>
              {/* comments */}
              <div className="space-y-5">
                <h1 className="text-2xl font-bold text-black uppercase">
                  Comments ({comments?.length})
                </h1>

                {comments.length === 0 ? (
                  <p className="text-base font-semibold">No comments yet</p>
                ) : (
                  comments?.map((comment) => (
                    <div key={comment._id} className="border p-4 relative">
                      <p className="text-base font-semibold">
                        {comment.user?.firstName}
                      </p>
                      <p className="text-sm font-normal">
                        {formatDate(comment.createdAt)}
                      </p>
                      <p className="text-base font-semibold">
                        {comment.comment}
                      </p>
                      {user?._id === comment.user?._id && (
                        <Button
                          onClick={() =>
                            dispatch(
                              deleteComment({
                                commentId: comment._id,
                                articleId: id,
                              }),
                            )
                          }
                          className="absolute top-2 right-2 cursor-pointer"
                          variant="destructive"
                        >
                          <Trash2 />
                        </Button>
                      )}
                    </div>
                  ))
                )}
              </div>
              {user ? (
                <CommentForm id={id} />
              ) : (
                <p className="text-base font-semibold text-center">
                  Please login to comment
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleArticle;
