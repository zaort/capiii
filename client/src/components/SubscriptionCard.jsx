import { useAuthContext } from '../utils/auth';
import { useMutation } from '@apollo/client';
import { UNSUBSCRIBE_PLAN } from '../utils/qandm';

const SubscriptionCard = ({ subscription }) => {
 const { user } = useAuthContext();
 const [unsubscribe, { loading, error }] = useMutation(UNSUBSCRIBE_PLAN);

 const handleUnsubscribe = async () => {
  try {
   await unsubscribe({ variables: { planId: subscription.plan._id } });
   // Potentially, update the UI to reflect the unsubscribed state 
  } catch (error) {
   console.error('Error unsubscribing:', error);
   // Handle potential errors
  }
 };

 return (
  <div className="border border-gray-200 shadow-md rounded-lg p-4">
   <h2 className="text-lg font-bold">{subscription.plan.name} </h2>
   <p className="text-gray-600">{subscription.plan.description}</p>
   <p className="font-bold text-xl">${subscription.plan.price}/month</p>

   {/* Conditionally render the unsubscribe button */}
   {user && (
    <button
     className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
     onClick={handleUnsubscribe}
     disabled={loading}
    >
     Unsubscribe
    </button>
   )}
  </div>
 );
};

export default SubscriptionCard;