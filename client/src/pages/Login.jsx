import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/api'; // Assuming you've updated to the correct mutation name 
import { useAuthContext } from '../utils/auth';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
 const [formData, setFormData] = useState({ email: '', password: '' });
 const [login, { error }] = useMutation(LOGIN);
 const { login: handleLogin } = useAuthContext();
 const navigate = useNavigate();

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
   const { data } = await login({ variables: { ...formData } });
   handleLogin(data.login.user);
   navigate('/');
  } catch (err) {
   console.error(err);
   // Handle login errors - display messages, etc. 
  }
 };

 return (
  <div className="container mx-auto">
   <h1 className="text-2xl font-bold mb-4">Login</h1>
   {error && <p className="text-red-500">Login failed. Please check your credentials and try again.</p>}
   <form onSubmit={handleSubmit}>
    {/* Your form fields for email and password */}
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
   </form>
   <p>Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link></p>
  </div>
 );
};

export default Login;