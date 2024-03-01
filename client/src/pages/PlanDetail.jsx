import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PLAN } from '../utils/queries';
import 'tailwindcss/tailwind.css';

const PlanDetail = () => {
 const { planId } = useParams();
 const [plan, setPlan] = useState({}); // Initialize state for plan details
 const { loading, error, data } = useQuery(GET_PLAN, {
  variables: { planId }
 });

 useEffect(() => {
  if (data) {
   setPlan(data.plan); // Assuming your query returns a single plan object
  }
 }, [data]);

 return (
  <div className="container mx-auto mt-8">
   {loading && <p className="text-center">Loading plan details...</p>}
   {error && <p className="text-center text-red-600">Error fetching plan details!</p>}

   {/* If you have plan data, display below */}
   {plan && (
    <div className="flex flex-col md:flex-row gap-6">
     <div className="md:w-2/3">
      <h1 className="text-3xl font-bold">{plan.name}</h1>
      <p className="text-lg mt-4">{plan.description}</p>
      <h2 className="text-2xl font-semibold mt-6">Features:</h2>
      <ul className="list-disc ml-6 mt-2">
       {/* Implement logic to list out plan features */}
      </ul>
     </div>
     <div className="bg-gray-100 p-6 rounded-lg md:w-1/3">
      <h2 className="text-xl font-semibold mb-4">Pricing</h2>
      <p className="text-3xl font-bold text-center mb-6">${plan.price}/month</p>
      {/* Add a prominent "Subscribe" button here */}
     </div>
    </div>
   )}
  </div>
 );
};

export default PlanDetail;