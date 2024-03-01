import React, { useState } from 'react';

const PostForm = ({ onSubmit, initialValues, formTitle = 'Create Post' }) => {
 const [formData, setFormData] = useState(initialValues || {
  title: '',
  description: '',
  plan: '', // Assuming you want to associate posts with plans
 });

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
 };


 const handleSubmit = (e) => {
  e.preventDefault();
  onSubmit(formData);
 };

 return (
  <form onSubmit={handleSubmit} className="max-w-md mx-auto">
   <h2 className="text-2xl font-bold mb-6 text-center">{formTitle}</h2>

   <div className="mb-4">
    <label htmlFor="title" className="block">Title</label>
    <input
     type="text"
     id="title"
     name="title"
     value={formData.title}
     onChange={handleChange}
     className="w-full p-3 border border-gray-300 rounded"
     required
    />
   </div>

   <div className="mb-4">
    <label htmlFor="description" className="block">Description</label>
    <textarea
     id="description"
     name="description"
     value={formData.description}
     onChange={handleChange}
     className="w-full p-3 border border-gray-300 rounded"
     required
    ></textarea>
   </div>

   <div className="mb-4">
    <label htmlFor="plan" className="block">Related Plan</label>
    <select
     id="plan"
     name="plan"
     value={formData.plan}
     onChange={handleChange}
     className="w-full p-3 border border-gray-300 rounded"
    >
     <option value="">Select a Plan</option>
     {/* Populate this with plan options fetched from your backend */}
    </select>
   </div>

   <button
    type="submit"
    className="bg-blue-600 text-white font-bold py-3 px-6 rounded shadow hover:bg-blue-700 w-full"
   >
    {formTitle === 'Create Post' ? 'Create' : 'Save Changes'}
   </button>
  </form>
 );
};

export default PostForm; 