import React from 'react';
import SubscriptionCard from './SubscriptionCard';

const SubscriptionList = ({ subscriptions }) => {
 return (
  <div>
   {subscriptions.length === 0 ? (
    <p>You don't have any subscriptions.</p>
   ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     {subscriptions.map((subscription) => (
      <SubscriptionCard key={subscription._id} subscription={subscription} />
     ))}
    </div>
   )}
  </div>
 );
};

export default SubscriptionList;