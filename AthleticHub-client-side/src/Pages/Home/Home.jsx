import React from 'react';
import Slider from './Slider';
import SportsBenefits from './SportsBenefits';
import Award from './Award';
import FeaturedEvents from '../Featured Events/FeaturedEvents';
import Success from './success';

const Home = () => {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl ">
        <Slider></Slider>
        <FeaturedEvents></FeaturedEvents>
        <Award></Award>
        <SportsBenefits></SportsBenefits>
        <Success></Success>
      </div>
    </div>
  );
};

export default Home;