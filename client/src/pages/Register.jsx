import React, { useState } from "react";
import { useAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { CREATE_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
// import 'tailwindcss/tailwind.css';

const Register = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		isProvider: false,
	});
	const { signup } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [addUser, { err }] = useMutation(CREATE_USER);
	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();
		console.log("123");
		try {
			// await signup(formData.username, formData.email, formData.password, formData.isProvider);
			const { data } = await addUser({ variables: { username: formData.username, email: formData.email, password: formData.password, isProvider: formData.isProvider } });
			navigate("/"); // Redirect to home on successful signup
		} catch (error) {
			setError("Registration failed. Please check your information and try again.");
			console.log(error);
			// Or handle the specific error
		}
	};

	return (
		<div className="container mx-auto mt-8">
			<h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

			{error && <p className="text-red-600 text-center mb-4">{error}</p>}

			<form onSubmit={handleSubmit} className="max-w-md mx-auto">
				<div className="mb-4">{/* Username Field */}
					<label htmlFor="username" className="block">Username</label>
					<input
						type="text"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						className="w-full p-3 border border-gray-300 rounded"
						required
					/>
				</div>
				<div className="mb-4">{/* Email Field (similar to Login component) */}
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
				<div className="mb-4">{/* Password Field (similar to Login component) */}
					<label htmlFor="password" className="block">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						className="w-full p-3 border border-gray-300 rounded"
						required
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="isProvider" className="block">
						<input
							type="checkbox"
							id="isProvider"
							name="isProvider"
							checked={formData.isProvider}
							onChange={handleChange}
							className="mr-2 leading-tight"
						/>
						Register as a Provider
					</label>
				</div>

				<button
					type="submit"
					className="bg-blue-600 text-white font-bold py-3 px-6 rounded shadow hover:bg-blue-700 w-full"
				>
					Register
				</button>
			</form>
			{/* Link to the Login page */}
		</div>
	);
};

export default Register;
