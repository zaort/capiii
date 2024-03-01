import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/api';
import { useAuthContext } from '../utils/auth';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
 const [formData, setFormData] = useState({
  username: '',
  email: '',
  password: '',
  isProvider: false
 });
 const [createUser, { error }] = useMutation(CREATE_USER);
 const { login } = useAuthContext();
 const navigate = useNavigate();

 const handleChange = (e) => {
  setFormData({
   ...formData,
   [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
  });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
   const { data } = await createUser({ variables: { ...formData } });
   login(data.createUser.user);  // Log in user after registration
   navigate('/'); // Redirect to home (or a specific page)
  } catch (err) {
   console.error(err);
   // Handle registration errors - display messages, etc. 
  }
 };

 return (
  <div className="container mx-auto">
   <h1 className="text-2xl font-bold mb-4">Register</h1>
   {error && <p className="text-red-500">Registration failed! Please review your information and try again.</p>}
   <form onSubmit={handleSubmit}>
    <div className="mb-4">
     <label htmlFor="username" className="block">Username</label>
     <input
      type="text"
      id="username"
      name="username"
      value={formData.username}
      onChange={handleChange}
      className="w-full p-2 border"
      required
     />
    </div>
    <div className="mb-4">
     {/* ... Email input similar to username */}
    </div>
    <div className="mb-4">
     {/* ... Password input similar to username */}
    </div>
    <div className="mb-4">
     <input
      type="checkbox"
      id="isProvider"
      name="isProvider"
      checked={formData.isProvider}
      onChange={handleChange}
      className="mr-2"
     />
     <label htmlFor="isProvider">Register as Provider</label>
    </div>
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register</button>
   </form>
   <p>Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
  </div>
 );
};

export default Register;