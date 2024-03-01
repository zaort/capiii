import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PLAN } from '../utils/qandm';

const PlanForm = ({ onSubmit }) => {
 const [formData, setFormData] = useState({
  name: '',
  description: '',
  price: 0, // Or an empty string if your price is a string type
 });
 const [createPlan, { loading, error }] = useMutation(CREATE_PLAN);

 const handleChange = (e) => {
  setFormData({
   ...formData,
   [e.target.name]: e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value,  // Parse numbers 
  });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
   const { data } = await createPlan({ variables: { planData: formData } });
   // Assuming your CREATE_PLAN returns the newly created plan data 
   if (onSubmit) onSubmit(data.createPlan); // Pass the created plan to a callback (optional)

  } catch (error) {
   console.error('Error creating plan:', error);
   // Handle potential errors during plan creation
  }
 };

 return (
  <form onSubmit={handleSubmit}>
   {error && <p className="text-red-500">An error occurred. Please try again.</p>}

   {/* Your form fields for name, description, and price ... */}
   <div className="mb-4">
    <label htmlFor="name" className="block">Name</label>
    <input
     type="text"
     id="name"
     name="name"
     value={formData.name}
     onChange={handleChange}
     required
     className="w-full p-2 border"
    />
   </div>
   {/* ... other fields: description, price */}

   <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    {loading ? 'Creating Plan...' : 'Create Plan'}
   </button>
  </form>
 );
};

export default PlanForm;