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
import { PAGE_ICONS } from '@/lib/icons/page.icons';

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
    <div className="min-h-screen bg-black">
      <ArticleHeader article={single_article} />

      <section className="py-14 md:py-20">
        <div className="container mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 xl:gap-14 items-start">
            {/* ── Left Column: Article Content ─────────── */}
            <div className="w-full lg:w-[63%] space-y-8 md:space-y-10">
              {/* Meta & Title */}
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-4 py-1.5 rounded-full bg-[#d7fb00] text-black text-[11px] font-extrabold uppercase tracking-[0.15em] shadow-[0_4px_16px_rgba(215,251,0,0.2)]">
                    {single_article?.category}
                  </span>
                  <span className="flex items-center gap-2 text-[13px] font-medium text-gray-500 bg-white/5 border border-white/8 rounded-full px-4 py-1.5">
                    <PAGE_ICONS.CALENDAR className="w-3.5 h-3.5 text-gray-600" />
                    {formatDate(single_article?.createdAt)}
                  </span>
                </div>
                <h1 className="text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] font-extrabold text-white leading-[1.15] tracking-[-0.02em]">
                  {single_article?.title}
                </h1>
                <div className="w-14 h-[3px] bg-[#d7fb00] rounded-full" />
              </div>

              {/* Featured Image */}
              <div className="w-full relative rounded-xl overflow-hidden group border border-white/6">
                <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors z-10 duration-700" />
                {single_article?.featuredImage ? (
                  <img
                    src={single_article?.featuredImage}
                    alt={single_article?.title}
                    className="w-full h-[220px] sm:h-[340px] md:h-[460px] object-cover transform group-hover:scale-[1.03] transition-transform duration-1200ms ease-out"
                  />
                ) : (
                  <div className="w-full h-[220px] sm:h-[340px] md:h-[460px] bg-white/2 animate-pulse flex items-center justify-center">
                    <span className="text-gray-700 font-medium text-sm tracking-wide">
                      Loading visual...
                    </span>
                  </div>
                )}
              </div>

              {/* Prose Content */}
              <article className="bg-white/3 rounded-xl p-5 sm:p-8 md:p-10 border border-white/6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 bg-[#d7fb00] opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />
                <div
                  className="prose prose-invert prose-base md:prose-lg max-w-none
                    prose-headings:font-extrabold prose-headings:text-white prose-headings:tracking-[-0.02em] prose-headings:leading-tight
                    prose-h2:text-[1.5rem] prose-h2:md:text-[1.75rem] prose-h2:mt-10 prose-h2:mb-4
                    prose-h3:text-[1.15rem] prose-h3:md:text-[1.35rem] prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-[0.95rem] prose-p:md:text-base prose-p:text-gray-400 prose-p:leading-[1.8]
                    prose-strong:text-white prose-strong:font-semibold
                    prose-a:text-[#d7fb00] prose-a:font-medium hover:prose-a:text-white prose-a:transition-colors prose-a:duration-200 prose-a:no-underline prose-a:border-b prose-a:border-[#d7fb00]/30 hover:prose-a:border-transparent
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-white/6
                    prose-blockquote:border-l-[3px] prose-blockquote:border-[#d7fb00] prose-blockquote:py-3 prose-blockquote:px-5 sm:prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:font-medium prose-blockquote:text-gray-300 prose-blockquote:bg-white/2 prose-blockquote:not-italic prose-blockquote:text-[0.95rem]
                    prose-ul:space-y-1 prose-ol:space-y-1
                    prose-li:text-[0.95rem] prose-li:text-gray-400 prose-li:leading-[1.7]
                    marker:text-[#d7fb00]
                    prose-code:text-[#d7fb00] prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[0.875rem] prose-code:font-medium"
                  dangerouslySetInnerHTML={{
                    __html:
                      single_article?.description || 'Content unavailable',
                  }}
                />

                {/* Tags */}
                {single_article?.tags && single_article.tags.length > 0 && (
                  <div className="flex items-center flex-wrap gap-2.5 pt-8 mt-8 border-t border-white/6">
                    <div className="flex items-center gap-1.5 text-white text-[13px] font-semibold mr-1 bg-white/5 px-3.5 py-1.5 rounded-lg border border-white/8">
                      <PAGE_ICONS.TAGS className="w-4 h-4 text-[#d7fb00]" />
                      <span>Tags</span>
                    </div>
                    {single_article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1.5 bg-white/3 text-gray-500 hover:bg-[#d7fb00] hover:text-black transition-all cursor-pointer rounded-lg text-[13px] font-semibold border border-white/6 hover:border-[#d7fb00] hover:shadow-[0_4px_12px_rgba(215,251,0,0.15)] transform hover:-translate-y-0.5 duration-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </div>

            {/* ── Right Column: Sidebar ────────────────── */}
            <aside className="w-full lg:w-[34%] space-y-6 lg:sticky lg:top-6">
              {/* Related Articles */}
              {relatedArticles && relatedArticles.length > 0 && (
                <div className="bg-white/3 rounded-xl p-5 sm:p-6 border border-white/6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-[3px] h-8 bg-[#d7fb00] rounded-full" />
                    <h2 className="text-lg font-bold text-white tracking-[-0.01em]">
                      Related Reads
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {relatedArticles.slice(0, 3).map((article) => (
                      <div
                        key={article._id}
                        className="transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        <ArticleCard article={article} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments Section */}
              <div className="bg-white/3 rounded-xl p-5 sm:p-6 border border-white/6 relative overflow-hidden flex flex-col max-h-[700px]">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#d7fb00] rounded-full blur-[80px] opacity-[0.04] pointer-events-none" />

                <div className="flex items-center justify-between mb-6 relative z-10 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-[3px] h-8 bg-[#d7fb00] rounded-full" />
                    <h2 className="text-lg font-bold text-white tracking-[-0.01em] flex items-center gap-2.5">
                      Comments
                      <span className="flex items-center justify-center bg-white/[0.07] text-[#d7fb00] text-sm rounded-full w-7 h-7 font-bold border border-white/8">
                        {comments?.length || 0}
                      </span>
                    </h2>
                  </div>
                </div>

                <div className="space-y-3 relative z-10 overflow-y-auto pr-1.5 custom-scrollbar flex-1 pb-2">
                  {!comments || comments.length === 0 ? (
                    <div className="text-center py-10 bg-white/2 rounded-xl border border-dashed border-white/8 flex flex-col items-center justify-center">
                      <div className="w-14 h-14 bg-white/4 rounded-full flex items-center justify-center mb-3 border border-white/8">
                        <PAGE_ICONS.MESSAGEADD className="w-6 h-6 text-gray-600" />
                      </div>
                      <p className="text-gray-400 font-semibold text-[15px]">
                        No comments yet
                      </p>
                      <p className="text-gray-600 text-[13px] mt-1">
                        Be the first to share your thoughts!
                      </p>
                    </div>
                  ) : (
                    comments?.map((comment) => (
                      <div
                        key={comment._id}
                        className="group bg-white/2 hover:bg-white/5 border border-white/6 hover:border-white/12 rounded-xl p-4 sm:p-5 relative transition-all duration-300"
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#d7fb00]/80 to-[#a5c400] flex items-center justify-center text-black font-bold text-sm shadow-md shrink-0">
                            {comment.user?.firstName?.charAt(0) || (
                              <PAGE_ICONS.USERCIRCLE className="w-5 h-5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[15px] font-semibold text-white truncate leading-snug">
                              {comment.user?.firstName} {comment.user?.lastName}
                            </p>
                            <p className="text-[12px] font-medium text-gray-600 mt-0.5">
                              {formatDate(comment.createdAt)}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-400 leading-relaxed text-[14px] mt-3 flex items-start gap-2">
                          <PAGE_ICONS.MESSAGECIRCLE className="w-4 h-4 text-[#d7fb00]/60 shrink-0 mt-0.5" />
                          <span>{comment.comment}</span>
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
                            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg h-8 w-8 p-0 border border-red-500/20 hover:border-red-500"
                            variant="ghost"
                            title="Delete comment"
                          >
                            <PAGE_ICONS.TRASH className="w-4 h-4" />
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
                  <CommentForm id={id} />
                ) : (
                  <div className="bg-white/3 rounded-xl p-6 sm:p-8 text-center overflow-hidden relative group border border-white/6">
                    <div className="absolute inset-0 bg-[#d7fb00] opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-5 border border-white/8">
                        <PAGE_ICONS.USERCIRCLE className="w-6 h-6 text-gray-500" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 tracking-[-0.01em]">
                        Join the Discussion
                      </h3>
                      <p className="text-gray-500 mb-6 text-[14px] leading-relaxed max-w-[280px]">
                        Log in to post a comment and engage with the community.
                      </p>
                      <Link
                        to="/account/login"
                        className="w-full bg-[#d7fb00] text-black rounded-lg py-2.5 font-bold text-[13px] tracking-[0.05em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(215,251,0,0.2)] hover:shadow-[0_8px_30px_rgba(215,251,0,0.35)] active:scale-[0.98] block text-center"
                      >
                        Log In to Comment
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Custom scrollbar styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.08);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.15);
        }
      `,
        }}
      />
    </div>
  );
};

export default SingleArticle;
