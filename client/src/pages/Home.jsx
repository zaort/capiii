import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PLANS } from '../utils/queries'; // Replace with your GraphQL query
import PlanCard from '../components/PlanCard';
import 'tailwindcss/tailwind.css'; // Include Tailwind CSS

const Home = () => {
 const [featuredPlans, setFeaturedPlans] = useState([]);
 const { loading, error, data } = useQuery(GET_FEATURED_PLANS);

 useEffect(() => {
  if (data && data.me) { // Customize this condition if your query structure is different
   setFeaturedPlans(data.me.featuredPlans);
  }
 }, [data]);

 return (
  <div className="container mx-auto mt-8">
   <section className="hero">
    <h1 className="text-4xl font-bold text-center mb-4">Enhance Your Business with Tailored Plans</h1>
    <p className="text-center text-gray-700 mb-8">
     Discover the perfect plan to boost your online presence and reach your goals.
    </p>
    {/* Add call-to-action buttons here with Tailwind styling */}
   </section>

   <section className="featured-plans">
    <h2 className="text-2xl font-semibold mb-6">Featured Plans</h2>
    {loading && <p className="text-center">Loading featured plans...</p>}
    {error && <p className="text-center text-red-600">Error fetching plans!</p>}

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
     {featuredPlans.map((plan) => (
      <PlanCard key={plan._id} plan={plan} />
     ))}
    </div>
   </section>
  </div>
 );
};

export default Home;