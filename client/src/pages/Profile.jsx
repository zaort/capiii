import { useAuthContext } from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_USER_PLANS } from '../utils/api';
import PlanCard from '../components/PlanCard';

const Profile = () => {
 const { user } = useAuthContext();
 const { loading, error, data, refetch } = useQuery(GET_USER_PLANS);

 if (!user) return <p>Please log in to view your profile.</p>;

 if (loading) return <p>Loading...</p>;
 if (error) return <p>Error: {error.message}</p>;

 return (
  <div className="container mx-auto">
   <h1 className="text-2xl font-bold mb-4">Welcome, {user.username}</h1>

   {/* User Details Section (Email, etc. ) */}
   <div className="mb-6">
    {/* Display user data: username, email, etc. */}
   </div>

   {/* Subscribed Plans Section */}
   <h2 className="text-lg font-bold mb-4">Your Subscriptions</h2>
   {data.me.subscribedPlans.length === 0 ? (
    <p>You don't have any subscriptions yet.</p>
   ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
     {data.me.subscribedPlans.map(plan => (
      <PlanCard key={plan._id} plan={plan} />
     ))}
    </div>
   )}

   {/* Created Plans Section */}
   {user.isProvider && (
    <>
     <h2 className="text-lg font-bold mt-6 mb-4">Your Plans</h2>
     {data.me.createdPlans.length === 0 ? (
      <p>You haven't created any plans yet.</p>
     ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       {/* Render a list of created plans  using PlanCard */}
      </div>
     )}
    </>
   )}
  </div>
 );
};

export default Profile;