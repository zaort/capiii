import { useState } from 'react';
import { useAuthContext } from '../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN, CREATE_USER } from '../utils/qandm';

const AuthForm = ({ type }) => {
 const [formData, setFormData] = useState({
  email: '',
  password: '',
  username: '',
  isProvider: false
 });
 const { login } = useAuthContext();
 const [createUser, { error: createUserError }] = useMutation(CREATE_USER);
 const [loginUser, { error: loginError }] = useMutation(LOGIN);

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
   if (type === 'login') {
    const { data } = await loginUser({ variables: { email: formData.email, password: formData.password } });
    const { token, user } = data.login;
    login({ token, user });
   } else if (type === 'register') {
    const { data } = await createUser({ variables: { ...formData } });
    const { token, user } = data.createUser;
    login({ token, user });
   }
  } catch (error) {
   if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    console.error(error.graphQLErrors[0].message);
   } else {
    console.error(error);
   }
  }
 };

 return (
  <form onSubmit={handleSubmit}>
   {createUserError || loginError ? <p className="text-red-500">An error occurred. Please review your information and try again.</p> : null}
   {/* Username field only for registration */}
   {type === 'register' && (
    <div className="mb-4">
     <label htmlFor="username" className="block">Username</label>
     <input
      type="text"
      id="username"
      name="username"
      value={formData.username}
      onChange={handleChange}
      required
      className="w-full p-2 border"
     />
    </div>
   )}

   <div className="mb-4">
    <label htmlFor="email" className="block">Email</label>
    <input
     type="email"
     id="email"
     name="email"
     value={formData.email}
     onChange={handleChange}
     required
     className="w-full p-2 border"
    />
   </div>

   <div className="mb-4">
    <label htmlFor="password" className="block">Password</label>
    <input
     type="password"
     id="password"
     name="password"
     value={formData.password}
     onChange={handleChange}
     required
     className="w-full p-2 border"
    />
   </div>

   {type === 'register' && (
    <div className="mb-4">
     <input
      type="checkbox"
      id="isProvider"
      name="isProvider"
      checked={formData.isProvider}
      onChange={(e) => setFormData({ ...formData, isProvider: e.target.checked })}
     />
     <label htmlFor="isProvider" className="ml-2">Register as Provider</label>
    </div>
   )}

   <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    {type === 'login' ? 'Login' : 'Register'}
   </button>
  </form>
 );
};

export default AuthForm;