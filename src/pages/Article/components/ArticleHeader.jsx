import { PAGE_ICONS } from '@/lib/icons/pageicons';
import { formatDate } from '@/lib/utils';
import React from 'react';
import { Link } from 'react-router-dom';

const ArticleHeader = ({ article }) => {
  return (
    <section
      className="py-15 md:py-25"
      style={{
        backgroundImage: `url("https://personaltrainer-workdo.myshopify.com/cdn/shop/files/blog-banner.jpg?v=1684992526")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container max-w-292.5 mx-auto px-3">
        <div className="flex items-start flex-col justify-start gap-4 text-white w-full sm:w-[41%] lg:w-[58%]">
          <Link
            to={'/articles'}
            className="flex gap-3 items-center justify-center"
          >
            <div className="border p-2 w-8 h-8 flex items-center justify-center rounded-full">
              <PAGE_ICONS.ARROWLEFT className="w-full h-full" />
            </div>
            <span className="text-sm font-medium">Back to Articles</span>
          </Link>
          <div className='flex items-center flex-wrap gap-4 text-sm'>
            <div className="bg-brand px-5 py-2 rounded-full text-black font-medium">
              <h1>Featured</h1>
            </div>
            <div className="flex items-center gap-2">
              <p>Category : {article?.category}</p>
            </div>
            <div className="flex items-center gap-2">
              <p>Date : {formatDate(article?.createdAt)}</p>
            </div>
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl uppercase font-bold">{article?.title}</h1>
          </div>
          <div
            className="text-sm font-normal md:max-w-130"
            dangerouslySetInnerHTML={{
              __html: article?.description.slice(0, 120) + '...',
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default ArticleHeader;
