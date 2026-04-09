import { formatDate } from '@/lib/utils';
import React from 'react';
import { Link } from 'react-router-dom';
import { PAGE_ICONS } from '@/lib/icons/page.icons';

const ArticleCard = ({ article }) => {
  return (
    <Link
      to={`/articles/${article._id}`}
      className="group block rounded-2xl overflow-hidden bg-[rgba(255,255,255,0.04)] border border-white/8 hover:border-[#d7fb00]/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(215,251,0,0.06)]"
    >
      {/* Image */}
      <div className="relative w-full h-[200px] overflow-hidden">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* linear overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Date badge */}
        <div className="absolute top-3 left-3 bg-[#d7fb00] text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
          <PAGE_ICONS.CALENDAR className="w-3 h-3" />
          {formatDate(article.createdAt)}
        </div>

        {/* Category badge */}
        {article.tags?.[0] && (
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-[#d7fb00] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#d7fb00]/20">
            #{article.tags[0]}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="text-base font-bold text-white leading-snug line-clamp-2 group-hover:text-[#d7fb00] transition-colors duration-300">
          {article.title}
        </h3>
        <div
          dangerouslySetInnerHTML={{
            __html: article.description.slice(0, 100) + '...',
          }}
          className="text-gray-500 text-sm leading-relaxed line-clamp-2"
        />

        {/* Read more */}
        <div className="flex items-center gap-2 text-[#d7fb00] text-xs font-bold uppercase tracking-widest pt-1 group-hover:gap-3 transition-all duration-300">
          <span>Read More</span>
          <PAGE_ICONS.ARROWRIGHT className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
