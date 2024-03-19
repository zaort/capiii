import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { UNSUBSCRIBE_PLAN } from "../utils/mutations";

const SubscriptionCard = ({ plan }) => {
 const navigate = useNavigate();
 const [UnsubscribePlan, { err, planData }] = useMutation(UNSUBSCRIBE_PLAN);

 const handleSubmit = async (e) => {
  e.preventDefault();
  // console.log('Subscription try-catch');
  try {
   const { data } = await UnsubscribePlan({ variables: { planId: plan._id } });
   navigate("/profile");
  } catch (error) {
   setError("Unsubscription failed");
   console.log(error);
   // Or handle the specific error
  }
 };

 return (
  <div className="border border-gray-300 rounded p-4 shadow-md">
   <h2 className="text-xl font-bold">Plan: {plan.name}</h2>
   {/* <p className="my-2">Status: {plan.status} </p> */}
   <p>Price: ${plan.price}/month</p>
   {/* Add more fields like start date, renewal date if applicable */}

   {/* Conditional Links or Actions */}
   {/* {subscription.status === 'active' && (
    <button
     className="bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-red-700"
     onClick={() => Handle logic}
    >
     Cancel Subscription
    </button>
   )} */}
   <button
    className="bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-red-700"
    onClick={handleSubmit}
   >
    Cancel Subscription
   </button>

   {/* Potentially add a link to view details for providers */}
  </div>
 );
};

export default SubscriptionCard;