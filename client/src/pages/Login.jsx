import React, { useState } from 'react';
import { useAuth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
// import 'tailwindcss/tailwind.css';

const Login = () => {
 const [formData, setFormData] = useState({ email: '', password: '' });
 const { login } = useAuth();
 const navigate = useNavigate();
 const [error, setError] = useState(null);

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
   await login(formData.email, formData.password);
   navigate('/'); // Redirect to home page on successful login
  } catch (error) {
   setError('Invalid login credentials. Please try again.'); // Or handle the specific error
  }
 };

 return (
  <div className="container mx-auto mt-8">
   <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

   {error && <p className="text-red-600 text-center mb-4">{error}</p>}

   <form onSubmit={handleSubmit} className="max-w-md mx-auto">
    <div className="mb-4">
     <label htmlFor="email" className="block">Email</label>
     <input
      type="email"
      id="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="w-full p-3 border border-gray-300 rounded"
      required
     />
    </div>
    <div className="mb-4">
     <label htmlFor="password" className="block">Password</label>
     <input
      type="password"
      id="password"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="w-full p-3 border border-gray-300 rounded"
      required
     />
    </div>
    {/* Password Field (similar structure) */}

    <button
     type="submit"
     className="bg-blue-600 text-white font-bold py-3 px-6 rounded shadow hover:bg-blue-700 w-full"
    >
     Login
    </button>
   </form>
   {/* Link to Register page */}
  </div>
 );
};

export default Login;