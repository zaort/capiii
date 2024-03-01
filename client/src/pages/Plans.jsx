import { useQuery } from '@apollo/client';
import { GET_PLANS } from '../utils/api';
import PlanCard from '../components/PlanCard';
import { Link } from 'react-router-dom';

const Plans = () => {
 const { loading, error, data } = useQuery(GET_PLANS);

 if (loading) return <p>Loading...</p>;
 if (error) return <p>Error: {error.message}</p>;

 return (
  <div className="container mx-auto">
   <h1 className="text-2xl font-bold mb-4">Explore Plans</h1>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {data.plans.map((plan) => (
     <PlanCard key={plan._id} plan={plan} />
    ))}
   </div>
  </div>
 );
};

export default Plans;