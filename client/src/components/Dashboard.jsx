import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_PROVIDER_PLANS } from '../utils/queries';
import PlanCard from '../components/PlanCard';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const Dashboard = () => {
 const { user } = useAuth();

 const [providerPlans, setProviderPlans] = useState([]);
 const { loading, error, data } = useQuery(GET_PROVIDER_PLANS, {
  skip: !user.isProvider, // Fetch only if the user is a provider
 });

 useEffect(() => {
  if (data) {
   setProviderPlans(data.me.createdPlans);
  }
 }, [data]);

 return (
  <div className="container mx-auto mt-8">
   {user.isProvider ? (
    <>
     <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

     {loading && <p className="text-center">Loading your plans...</p>}
     {error && <p className="text-center text-red-600">Error fetching plans!</p>}

     <section className="provider-plans">
      <h2 className="text-2xl font-semibold mb-4">My Plans</h2>

      {providerPlans.length === 0 ? (
       <p>You don't have any plans created yet.</p>
      ) : (
       <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providerPlans.map((plan) => (
         <li key={plan._id}>
          <PlanCard plan={plan} />
          <div className="flex justify-between mt-2">
           <Link
            to={`/plans/${plan._id}/edit`}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
           >
            Edit
           </Link>
           <Link
            to={`/plans/${plan._id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
           >
            View Details
           </Link>
          </div>
         </li>
        ))}
       </ul>
      )}
     </section>

     <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded shadow mt-4 hover:bg-blue-700">
      Create New Plan
     </button>
    </>
   ) : (
    <p className="text-center">You are not a provider.</p>
   )}
  </div>
 );
};

export default Dashboard;