import React from 'react';
import { useSelector } from 'react-redux';
import ArticleCard from './components/ArticleCard';
import PageHero from '@/components/PageHero';

const Articles = () => {
  const { articles } = useSelector((state) => state.article);
  return (
    <div>
      <PageHero
        title="Blogs"
        description={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.`}
        backLink="/"
        backText="Back to home"
      />
      <section className="py-10 md:py-20">
        <div className="container mx-auto max-w-292.5 px-3 space-y-3">
          <div className="space-y-3">
            <h1 className="text-base uppercase font-medium">All Blogs</h1>
            <h1 className="text-3xl uppercase font-bold">NEWS</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {articles?.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Articles;
