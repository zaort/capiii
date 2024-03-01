import React from 'react';
import { Link } from 'react-router-dom';

const SubscriptionCard = ({ subscription }) => {
 return (
  <div className="border border-gray-300 rounded p-4 shadow-md">
   <h2 className="text-xl font-bold">Plan: {subscription.plan.name}</h2>
   <p className="my-2">Status: {subscription.status} </p>
   <p>Price: ${subscription.plan.price}/month</p>
   {/* Add more fields like start date, renewal date if applicable */}

   {/* Conditional Links or Actions */}
   {subscription.status === 'active' && (
    <button
     className="bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-red-700"
     onClick={() => { /* Handle cancellation logic */ }}
    >
     Cancel Subscription
    </button>
   )}

   {/* Potentially add a link to view details for providers */}
  </div>
 );
};

export default SubscriptionCard;