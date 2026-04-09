import React from 'react';
import { useSelector } from 'react-redux';
import ArticleCard from './components/ArticleCard';
import PageHero from '@/components/PageHero';

const Articles = () => {
  const { articles } = useSelector((state) => state.article);
  return (
    <div className="bg-black min-h-screen">
      <PageHero
        title="Blogs"
        description={`Explore our latest insights on fitness, nutrition, and wellness. Stay ahead with expert tips, training guides, and product reviews curated by our team.`}
        backLink="/"
        backText="Back to home"
      />
      <section className="py-10 md:py-20">
        <div className="container mx-auto max-w-292.5 px-3 space-y-8">
          {/* Section header */}
          <div className="space-y-3">
            <p className="text-xs uppercase font-bold tracking-[0.3em] text-[#d7fb00]">
              All Blogs
            </p>
            <h1 className="text-3xl md:text-4xl uppercase font-black text-white tracking-tight">
              Latest News
            </h1>
            <div
              className="h-0.5 w-16 rounded-full"
              style={{ background: '#d7fb00' }}
            />
          </div>

          {/* Articles grid */}
          {articles?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                <span className="text-2xl">📝</span>
              </div>
              <p className="text-gray-500 font-semibold text-lg">
                No articles available yet
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Check back soon for fresh content!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Articles;
