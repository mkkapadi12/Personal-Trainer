import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
import {
  Trash2,
  Calendar,
  Tags,
  UserCircle,
  MessageSquarePlus,
  MessageCircle,
} from 'lucide-react';

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
  }, [id, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <ArticleHeader article={single_article} />

      <section className="py-12 md:py-24">
        <div className="container mx-auto max-w-[1400px] px-2 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
            {/* Left Column: Article Content */}
            <div className="w-full lg:w-[65%] space-y-2 md:space-y-10">
              {/* Meta & Title */}
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="px-5 py-2 rounded-full bg-[#c7f000] text-black text-sm font-bold uppercase tracking-widest shadow-sm">
                    {single_article?.category}
                  </span>
                  <span className="flex items-center gap-2 text-sm font-semibold text-gray-500 bg-white border border-gray-200 shadow-sm rounded-full px-5 py-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {formatDate(single_article?.createdAt)}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                  {single_article?.title}
                </h1>
                <div className="w-20 h-1 bg-[#c7f000] mt-6"></div>
              </div>

              {/* Image */}
              <div className="w-full relative rounded-[2rem] overflow-hidden group border-8 border-white bg-white">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 duration-700"></div>
                {single_article?.featuredImage ? (
                  <img
                    src={single_article?.featuredImage}
                    alt={single_article?.title}
                    className="w-full h-[200px] md:h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                  />
                ) : (
                  <div className="w-full h-[200px] md:h-[500px] bg-gray-100 animate-pulse flex items-center justify-center">
                    <span className="text-gray-400 font-medium text-lg">
                      Loading visual...
                    </span>
                  </div>
                )}
              </div>

              {/* Prose Content */}
              <div className="bg-white rounded-[2rem] p-4 sm:p-8 md:p-12 border border-gray-100 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c7f000] opacity-5 blur-3xl rounded-full"></div>
                <div
                  className="prose prose-base md:prose-lg max-w-none 
                    prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
                    prose-p:text-gray-600 prose-p:leading-relaxed
                    prose-a:text-[#b0d400] prose-a:font-semibold hover:prose-a:text-black prose-a:transition-colors
                    prose-img:rounded-2xl prose-img:shadow-lg
                    prose-blockquote:border-l-4 prose-blockquote:border-[#c7f000] prose-blockquote:py-2 prose-blockquote:px-4 sm:prose-blockquote:py-4 sm:prose-blockquote:px-8 prose-blockquote:rounded-r-xl prose-blockquote:font-medium prose-blockquote:italic prose-blockquote:text-gray-700
                    marker:text-[#c7f000]"
                  dangerouslySetInnerHTML={{
                    __html:
                      single_article?.description || 'Content unavailable',
                  }}
                />

                {/* Tags */}
                {single_article?.tags && single_article.tags.length > 0 && (
                  <div className="flex items-center flex-wrap gap-3 pt-10 mt-10 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-gray-900 font-bold mr-2 bg-gray-50 px-4 py-2 rounded-xl">
                      <Tags className="w-5 h-5 text-[#c7f000]" />
                      <span>Tags:</span>
                    </div>
                    {single_article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-5 py-2 bg-white text-gray-700 hover:bg-[#c7f000] hover:text-black transition-all cursor-pointer rounded-xl text-sm font-bold border border-gray-200 hover:border-[#c7f000] hover:shadow-md transform hover:-translate-y-0.5 duration-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="w-full lg:w-[32%] space-y-10 lg:sticky lg:top-8">
              {/* Related Articles */}
              {relatedArticles && relatedArticles.length > 0 && (
                <div className="bg-white rounded-[2rem] p-4 sm:p-6 md:p-8 border border-gray-100 transition-shadow duration-500">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-1 h-10 bg-[#c7f000]"></div>
                    <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                      Related Reads
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {relatedArticles.slice(0, 3).map((article) => (
                      <div
                        key={article._id}
                        className="group transition-transform duration-300 hover:-translate-y-1 flex flex-col h-full border-b border-gray-50 pb-4 last:border-0 last:pb-0"
                      >
                        <ArticleCard article={article} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments Section */}
              <div className="bg-white rounded-[2rem] sm:p-6 p-4 md:p-8 border border-gray-100 relative overflow-hidden flex flex-col max-h-[800px]">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#c7f000] rounded-full blur-[60px] opacity-10 pointer-events-none"></div>

                <div className="flex items-center justify-between mb-8 relative z-10 shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-10 bg-[#c7f000]"></div>
                    <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                      Comments
                      <span className="flex items-center justify-center bg-gray-100 text-gray-600 text-lg rounded-full w-8 h-8 font-bold shadow-inner border border-gray-200">
                        {comments?.length || 0}
                      </span>
                    </h2>
                  </div>
                </div>

                <div className="space-y-5 relative z-10 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-4">
                  {!comments || comments.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center h-full">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-100">
                        <MessageSquarePlus className="w-8 h-8 text-gray-300" />
                      </div>
                      <p className="text-gray-500 font-semibold text-lg">
                        No comments yet
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Be the first to share your thoughts!
                      </p>
                    </div>
                  ) : (
                    comments?.map((comment) => (
                      <div
                        key={comment._id}
                        className="group bg-white hover:bg-gray-50/80 border border-gray-100 hover:border-gray-200 rounded-2xl p-2 sm:p-4 md:p-6 relative transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="flex items-start justify-center gap-4 mb-3">
                          <div className="sm:w-12 sm:h-12 w-10 h-10 rounded-full bg-linear-to-tr from-[#c7f000] to-[#e4ff5a] flex items-center justify-center text-black font-extrabold text-lg sm:text-xl shadow-md shrink-0">
                            {comment.user?.firstName?.charAt(0) || (
                              <UserCircle className="sm:w-6 sm:h-6 w-5 h-5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm sm:text-lg font-bold text-gray-900 truncate tracking-tight">
                              {comment.user?.firstName} {comment.user?.lastName}
                            </p>
                            <p className="text-sm font-semibold text-gray-400">
                              {formatDate(comment.createdAt)}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed font-medium mt-4 flex items-center gap-2">
                          <MessageCircle className="w-5 h-5 text-gray-900" />{' '}
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
                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl h-10 w-10 p-0 shadow-sm"
                            variant="ghost"
                            title="Delete comment"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Comment Form / Login Prompt */}
              <div className="relative z-20">
                {user ? (
                  <div>
                    <CommentForm id={id} />
                  </div>
                ) : (
                  <div className="bg-gray-900 rounded-[2rem] p-8 text-center overflow-hidden relative group">
                    <div className="absolute inset-0 bg-[#c7f000] opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mb-6 border-4 border-gray-700 shadow-inner">
                        <UserCircle className="w-5 h-5 text-gray-400" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight">
                        Join the Discussion
                      </h3>
                      <p className="text-gray-400 mb-8 font-medium text-base leading-relaxed">
                        You must be logged in to post a comment and engage with
                        the community.
                      </p>
                      <Link
                        to="/account/login"
                        className="w-full relative group/btn overflow-hidden bg-[#c7f000] text-black rounded-2xl py-3 font-bold text-base tracking-wider uppercase transition-all duration-300 shadow-[0_8px_30px_rgb(199,240,0,0.2)] hover:shadow-[0_8px_30px_rgb(199,240,0,0.4)] active:scale-[0.98] block"
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          Log In to Comment
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global styles for custom scrollbar in comments */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `,
        }}
      />
    </div>
  );
};

export default SingleArticle;
