import { useQuery } from '@apollo/client';
import { GET_USER_PLANS } from '../utils/qandm';
import SubscriptionCard from './SubscriptionCard';

const SubscriptionList = () => {
 const { loading, error, data } = useQuery(GET_USER_PLANS);

 if (loading) return <p>Loading...</p>;
 if (error) return <p>Error: {error.message}</p>;

 return (
  <div className="container mx-auto">
   <h1 className="text-2xl font-bold mb-4">Your Subscriptions</h1>
   {data.me.subscribedPlans.length === 0 ? (
    <p>You don't have any subscriptions yet.</p>
   ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
     {data.me.subscribedPlans.map(plan => (
      <SubscriptionCard key={plan._id} subscription={plan} />
     ))}
    </div>
   )}
  </div>
 );
};

export default SubscriptionList;