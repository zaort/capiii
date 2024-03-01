// add handle scenarios

import { useState, useEffect } from 'react';
import { useAuthContext } from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_PLANS, CREATE_PLAN, DELETE_PLAN } from '../utils/qandm'; // Import necessary queries and mutations
import PlanCard from './PlanCard'; // Assuming you have a PlanCard component

// ... (potential components for plan creation form, etc.)

const Dashboard = () => {
 const { user } = useAuthContext();
 const [showCreatePlanForm, setShowCreatePlanForm] = useState(false);

 const { loading, error, data, refetch } = useQuery(GET_USER_PLANS);
 const [createPlan, { error: createPlanError }] = useMutation(CREATE_PLAN);
 const [deletePlan, { error: deletePlanError }] = useMutation(DELETE_PLAN);

 useEffect(() => {
  if (user) refetch(); // Refetch plans when user data changes
 }, [user]);

 if (!user) return <p>Please log in to view dashboard.</p>;

 // Handle loading and error states ... 

 const handlePlanCreation = async (planData) => {
  // ... submit planData to the CREATE_PLAN mutation 
  try {
   const { data } = await createPlan({ variables: { planData } });
   // Handle successful creation, potentially with refetching
   refetch();
  } catch (error) {
   // Handle plan creation errors  
  }
 };

 const handlePlanDeletion = async (planId) => {
  // ... submit planId to the DELETE_PLAN mutation 
  try {
   const { data } = await deletePlan({ variables: { planId } });
   // Handle successful deletion, potentially with refetching
   refetch();
  } catch (error) {
   // Handle plan deletion errors 
  }
 };

 return (
  <div className="container mx-auto">
   <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
   {user.isProvider && (
    <>
     <button onClick={() => setShowCreatePlanForm(!showCreatePlanForm)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
      {showCreatePlanForm ? 'Hide Form' : 'Create New Plan'}
     </button>
     {showCreatePlanForm && <PlanForm onSubmit={handlePlanCreation} />}
    </>
   )}

   <h2>Your Plans</h2>
   {data.me.createdPlans.length === 0 ? (
    <p>You don't have any plans yet.</p>
   ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
     {data.me.createdPlans.map(plan => (
      <PlanCard key={plan._id} plan={plan} onDelete={handlePlanDeletion} />
     ))}
    </div>
   )}
  </div>
 );
};

export default Dashboard;