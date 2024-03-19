// import React, { useState } from 'react';

// const AuthForm = ({ formType, onSubmit, error }) => {
//  const [formData, setFormData] = useState({
//   username: '',
//   email: '',
//   password: '',
//   isProvider: false,
//  });

//  const handleChange = (e) => {
//   setFormData({
//    ...formData,
//    [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
//   });
//  };

//  const handleSubmit = (e) => {
//   e.preventDefault();
//   onSubmit(formData);
//  };

//  return (
//   <form onSubmit={handleSubmit} className="max-w-md mx-auto">
//    <h2 className="text-2xl font-bold mb-6 text-center">
//     {formType === 'login' ? 'Login' : 'Register'}
//    </h2>

//    {error && <p className="text-red-600 text-center mb-4">{error}</p>}

//    {/* Username Field (Conditional) */}
//    {formType === 'register' && (
//     <div className="mb-4">
//      <label htmlFor="username" className="block">Username</label>
//      <input
//       type="text"
//       id="username"
//       name="username"
//       value={formData.username}
//       onChange={handleChange}
//       className="w-full p-3 border border-gray-300 rounded"
//       required
//      />
//     </div>
//    )}

//    <div className="mb-4">
//     {/* Email Field */}
//     <label htmlFor="email" className="block">Email</label>
//     <input
//      type="email"
//      id="email"
//      name="email"
//      value={formData.email}
//      onChange={handleChange}
//      className="w-full p-3 border border-gray-300 rounded"
//      required
//     />
//    </div>

//    <div className="mb-4">
//     {/* Password Field */}
//     <label htmlFor="password" className="block">Password</label>
//     <input
//      type="password"
//      id="password"
//      name="password"
//      value={formData.password}
//      onChange={handleChange}
//      className="w-full p-3 border border-gray-300 rounded"
//      required
//     />
//    </div>

//    {formType === 'register' && (
//     <div className="mb-4">
//      <label htmlFor="isProvider" className="block">
//       <input
//        type="checkbox"
//        id="isProvider"
//        name="isProvider"
//        checked={formData.isProvider}
//        onChange={handleChange}
//        className="mr-2 leading-tight"
//       />
//       Register as a Provider
//      </label>
//     </div>
//    )}

//    <button
//     type="submit"
//     className="bg-blue-600 text-white font-bold py-3 px-6 rounded shadow hover:bg-blue-700 w-full"
//    >
//     {formType === 'login' ? 'Login' : 'Register'}
//    </button>
//   </form>
//  );
// };

// export default AuthForm;