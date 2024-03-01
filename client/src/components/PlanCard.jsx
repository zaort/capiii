import { useAuthContext } from '../utils/auth';
import { useMutation } from '@apollo/client';
import { SUBSCRIBE_PLAN, UNSUBSCRIBE_PLAN, DELETE_PLAN } from '../utils/qandm'; // Import necessary mutations

const PlanCard = ({ plan, onDelete }) => {
 const { user } = useAuthContext();
 const [subscribe, { loading: subscribeLoading }] = useMutation(SUBSCRIBE_PLAN);
 const [unsubscribe, { loading: unsubscribeLoading }] = useMutation(UNSUBSCRIBE_PLAN);
 const [deletePlan, { loading: deleteLoading }] = useMutation(DELETE_PLAN);

 const isSubscribed = user ? user.subscribedPlans.some(sub => sub._id === plan._id) : false;

 const handleSubscriptionChange = async () => {
  try {
   if (isSubscribed) {
    await unsubscribe({ variables: { planId: plan._id } });
   } else {
    await subscribe({ variables: { planId: plan._id } });
   }
   // Potentially refetch user data to update UI if needed 
  } catch (error) {
   console.error('Subscription change error:', error);
   // Handle potential errors
  }
 };

 const handleDelete = async () => {
  // Handle confirmation (if needed) before calling the mutation
  try {
   await deletePlan({ variables: { planId: plan._id } });
   if (onDelete) onDelete(plan._id); // If a callback is provided
  } catch (error) {
   // Handle potential deletion errors 
  }
 }

 return (
  <div className="border border-gray-200 shadow-md p-4 rounded">
   <h2 className="text-lg font-bold">{plan.name}</h2>
   <p className="text-gray-600">{plan.description}</p>
   <p className="font-bold text-xl">${plan.price}/month</p>

   {/* Render buttons conditionally */}
   {user && (
    <button
     onClick={handleSubscriptionChange}
     disabled={subscribeLoading || unsubscribeLoading}
     className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 ${isSubscribed ? 'bg-gray-400' : ''}`}
    >
     {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
    </button>
   )}

   {/* For providers: edit/delete button  */}
   {user && user.isProvider && plan.provider._id === user._id && (
    <>
     {/* Add an Edit functionality here */}
     <button
      onClick={handleDelete}
      disabled={deleteLoading}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
     >
      Delete
     </button>
    </>
   )}
  </div>
 );
};

export default PlanCard;