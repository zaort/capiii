import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CREATE_PLAN } from "../utils/mutations";

const PlanForm = ({ onSubmit, initialValues, formTitle = "Create Plan" }) => {
	const [formData, setFormData] = useState(
		initialValues || {
			name: "",
			description: "",
			price: "",
			// features: [],
		}
	);
	const navigate = useNavigate();
	const [createPlan, { err, data }] = useMutation(CREATE_PLAN);
	const [error, setError] = useState(null);

	const handleChange = e => {
		const value = e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
		setFormData({ ...formData, [e.target.name]: value });
	};

	// const handleFeatureChange = e => {
	// 	const updatedFeatures = formData.features.includes(e.target.value)
	// 		? formData.features.filter(f => f !== e.target.value)
	// 		: [...formData.features, e.target.value];
	// 	setFormData({ ...formData, features: updatedFeatures });
	// };

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			// await login(formData.email, formData.password);
			const { data } = await createPlan({
				variables: { planData: formData },
			});
			navigate("/dashboard");
		} catch (error) {
			setError("Failed to create plan. Please try again.");
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-md mx-auto">
			<h2 className="text-2xl font-bold mb-6 text-center">{formTitle}</h2>

			<div className="mb-4">
				<label htmlFor="name" className="block">
					Name
				</label>
				<input
					type="text"
					id="name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					className="w-full p-3 border border-gray-300 rounded"
					required
				/>
			</div>

			<div className="mb-4">
				<label htmlFor="description" className="block">
					Description
				</label>
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
				<label htmlFor="price" className="block">
					Price
				</label>
				<input
					type="number"
					step="0.01"
					id="price"
					name="price"
					value={formData.price}
					onChange={handleChange}
					className="w-full p-3 border border-gray-300 rounded"
					required
				/>
			</div>

			<div className="mb-4">
				{/* <label className="block">Features</label>
				<input
					type="text"
					id="newFeature"
					name="newFeature"
					placeholder="Add a feature"
					className="w-full p-3 border border-gray-300 rounded mb-2"
					onChange={e => setFormData({ ...formData, newFeature: e.target.value })} // Capture the new feature input
				/> */}
				{/* <button
					className="bg-gray-600 text-white font-bold py-2 px-4 rounded"
					onClick={e => {
						e.preventDefault();
						// Add the feature to the array while preventing empty features
						if (formData.newFeature.trim()) {
							setFormData({
								...formData,
								features: [...formData.features, formData.newFeature.trim()],
								newFeature: "", // Clear the input field after adding
							});
						}
					}}
				>
					Add Feature
				</button> */}

				{/* {formData.features.length > 0 && (
					<ul className="list-disc ml-6 mt-2">
						{formData.features.map((feature, index) => (
							<li key={index}>
								{feature}
								
							</li>
						))}
					</ul>
				)} */}
			</div>

			<button
				type="submit"
				className="bg-blue-600 text-white font-bold py-3 px-6 rounded shadow hover:bg-blue-700 w-full"
			>
				{formTitle === "Create Plan" ? "Create" : "Save Changes"}
			</button>
		</form>
	);
};

export default PlanForm;
