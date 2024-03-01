import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../utils/qandm';

const PostForm = ({ planId, onSubmit }) => {
 const [formData, setFormData] = useState({
  description: '',
  // ... add other fields if needed
 });
 const [createPost, { loading, error }] = useMutation(CREATE_POST);

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
   const { data } = await createPost({ variables: { postData: { ...formData, plan: planId } } });
   // Assuming your CREATE_POST returns the newly created post 
   if (onSubmit) onSubmit(data.createPost);

  } catch (error) {
   console.error('Error creating post:', error);
   // Handle potential errors during post creation
  }
 };

 return (
  <form onSubmit={handleSubmit}>
   {error && <p className="text-red-500">An error occurred. Please try again.</p>}

   <div className="mb-4">
    <label htmlFor="description" className="block">Description</label>
    <textarea
     id="description"
     name="description"
     value={formData.description}
     onChange={handleChange}
     required
     className="w-full p-2 border"
    />
   </div>
   {/* Add more fields as needed */}

   <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    {loading ? 'Creating Post...' : 'Create Post'}
   </button>
  </form>
 );
};

export default PostForm;