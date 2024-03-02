import React, { useState } from "react";
import { useAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";
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

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			await signup(formData.username, formData.email, formData.password, formData.isProvider);
			navigate("/"); // Redirect to home on successful signup
		} catch (error) {
			setError("Registration failed. Please check your information and try again.");
			// Or handle the specific error
		}
	};

	return (
		<div className="container mx-auto mt-8">
			<h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

			{error && <p className="text-red-600 text-center mb-4">{error}</p>}

			<form onSubmit={handleSubmit} className="max-w-md mx-auto">
				<div className="mb-4">{/* Username Field */}</div>
				<div className="mb-4">{/* Email Field (similar to Login component) */}</div>
				<div className="mb-4">{/* Password Field (similar to Login component) */}</div>
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
