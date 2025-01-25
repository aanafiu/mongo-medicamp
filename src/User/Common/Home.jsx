import Banner from '@/User/Common/Home/Banner';
import TopPosts from '@/User/Common/Home/TopPosts';
import React from 'react';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div>
        <TopPosts></TopPosts>
      </div>
    </div>
  );
};

export default Home;