import React, { useEffect } from 'react';
import { getProfile } from '@/Store/features/auth/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import TrainingCarousel from '@/components/home/TrainingCarousel';
import MemberSubscription from '@/components/home/MemberSubscription';
import ArticleCarousel from '@/components/home/ArticleCarousel';
import HeroSection from '@/components/home/HeroSection';
import Litigations from '@/components/home/Litigations';
import PersonalSubscription from '@/components/home/PersonalSubscription';
import SimilarSection from '@/components/home/similarSection';
import { getallArticles } from '@/Store/features/article/article.slice';

const Home = () => {
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('workDo');

    if (token) {
      dispatch(getProfile());
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="home-page bg-[#000000] text-white">
      <div className="">
        {/* Hero Section */}
        <HeroSection />

        {/* PERSONAL TRAININGS */}
        <TrainingCarousel />

        {/* MEMBERSHIP SUBSCRIPTION */}
        <MemberSubscription title={'MEMBERSHIP SUBSCRIPTION'} />

        {/* MEDICALERRORS LITIGATIONS */}
        <Litigations />

        {/* Similar Section */}
        <SimilarSection style={'text-white'} />

        {/* INTERESTING ARTICLES */}
        <ArticleCarousel />

        {/* Personal Subscription */}
        <PersonalSubscription />
      </div>
    </main>
  );
};

export default Home;
