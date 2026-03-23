import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  return (
    <div className="">
      <div className="p-1">
        <Card className="rounded-none bg-black hover:border-amber-300 p-0 hover:border border-none">
          <CardContent className="flex flex-col items-start justify-between p-0 relative">
            {/* image */}
            <div className="w-full border-b border-[#2d2d2d] h-[200px]">
              <Link to={`/articles/${article._id}`}>
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>
            {/* details */}
            <div className="p-4 space-y-3">
              <p className="text-brand">{article.tags[0]}</p>
              <h3 className="text-xl font-bold text-white">
                {article.title.slice(0, 20)}...
              </h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: article.description.slice(0, 100) + '...',
                }}
                className="text-white"
              />
              <div>
                <Button className="bg-[#d7fb00] text-black hover:bg-white transition-colors duration-300 uppercase rounded-none cursor-pointer text-sm font-semibold px-5 py-2">
                  <Link to={`/articles/${article._id}`}>Read More</Link>
                </Button>
              </div>
            </div>
            {/* date */}
            <div className="absolute top-2 left-2 bg-brand p-1">
              <h1 className="text-black text-sm font-bold">
                {formatDate(article.createdAt)}
              </h1>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArticleCard;
