import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PLAN } from '../utils/api';
import { useAuthContext } from '../utils/auth';
import { useMutation } from '@apollo/client';
import { SUBSCRIBE_PLAN, UNSUBSCRIBE_PLAN } from '../utils/api';

// Import component for displaying posts (if you have one)
import PostCard from '../components/PostCard';

const PlanDetail = () => {
 const { planId } = useParams();
 const { user } = useAuthContext();
 const [subscribe, { error: subscribeError }] = useMutation(SUBSCRIBE_PLAN);
 const [unsubscribe, { error: unsubscribeError }] = useMutation(UNSUBSCRIBE_PLAN);

 const { loading, error, data } = useQuery(GET_PLAN, {
  variables: { planId }
 });

 if (loading) return <p>Loading...</p>;
 if (error) return <p>Error: {error.message}</p>;

 const plan = data.plan;

 const isSubscribed = user ? user.subscribedPlans.some(sub => sub._id === plan._id,) : false;

 const handleSubscriptionChange = async () => {
  try {
   if (isSubscribed) {
    await unsubscribe({ variables: { planId } });
   } else {
    await subscribe({ variables: { planId } });
   }
   // Potentially refetch plan or user data to update the UI
  } catch (error) {
   console.error(error);
   // Handle potential errors
  }
 };

 return (
  <div className="container mx-auto">
   <h1 className="text-2xl font-bold mb-4">{plan.name}</h1>
   <p className="text-gray-600 mb-4">{plan.description}</p>
   <p className="font-bold text-xl mb-2">${plan.price}/month</p>
   {/* Display provider information */}

   <div className="mt-4">
    {user && (
     <button
      onClick={handleSubscriptionChange}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isSubscribed ? 'bg-gray-400' : ''}`}
     >
      {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
     </button>
    )}
   </div>

   {/* Section to display posts */}
   <h2 className="text-lg font-bold mt-6">Posts</h2>
   {plan.posts.length > 0 ? (
    <div className="grid grid-cols-1 gap-4">
     {plan.posts.map(post => (
      <PostCard key={post._id} post={post} />
     ))}
    </div>
   ) : (
    <p>No posts yet.</p>
   )}
  </div>
 );
};

export default PlanDetail;