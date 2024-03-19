import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../utils/queries";
import SubscriptionCard from './SubscriptionCard';

const SubscriptionList = () => {
 const [userData, setUserData] = useState({});
 const { user, logout } = useAuth();
 const [subscribedPlans, setSubscribedPlans] = useState([]); // For subscriptions
 const { loading, error, data } = useQuery(GET_USER);

 useEffect(() => {
  if (!loading && data && data.me) {
   setUserData(data.me);
  }
 }, [loading, data]);
 // console.log(`user data:${data}`);
 // console.log(userData);

 useEffect(() => {
  if (data && data.me) {
   setSubscribedPlans(data.me.subscribedPlans);
  }
 }, [data]);

 return (
  <div>
   {subscribedPlans.length === 0 ? (
    <p>You don't have any subscriptions.</p>
   ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     {subscribedPlans.map(plan => (
      <SubscriptionCard key={plan._id} plan={plan} />
     ))}
    </div>
   )}
  </div>
 );
};

export default SubscriptionList;