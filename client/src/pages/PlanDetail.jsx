import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PLAN } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { SUBSCRIBE_PLAN } from "../utils/mutations";
// import "tailwindcss/tailwind.css";

// check error that is happening after changes in planDetail for subscrition button.

const PlanDetail = () => {
	const { planId } = useParams();
	const [plan, setPlan] = useState({}); // Initialize state for plan details
	const { loading, error, data } = useQuery(GET_PLAN, {
		variables: { planId },
	});

	useEffect(() => {
		if (data) {
			setPlan(data.plan); // Assuming your query returns a single plan object
		}
	}, [data]);
	console.log(plan);
	console.log(planId);
	console.log(data);

	// mutation try

	const navigate = useNavigate();
	const [SubscribePlan, { err, planData }] = useMutation(SUBSCRIBE_PLAN);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log('Subscription try-catch');
		try {
			const { data } = await SubscribePlan({ variables: { planId: plan._id } });
			navigate("/profile");
		} catch (error) {
			setError("Subscription failed");
			console.log(error);
			// Or handle the specific error
		}
	};

	return (
		<div className="container mx-auto mt-8">
			{loading && <p className="text-center">Loading plan details...</p>}
			{error && <p className="text-center text-red-600">Error fetching plan details!</p>}

			{/* If you have plan data, display below */}
			{plan && (
				<div className="flex flex-col md:flex-row gap-6">
					<div className="md:w-2/3">
						<h1 className="text-3xl font-bold">{plan.name}</h1>
						<p className="text-lg mt-4">{plan.description}</p>

						<ul className="list-disc ml-6 mt-2">{/* Implement logic to list out plan features */}</ul>
					</div>
					<div className="bg-gray-100 p-6 rounded-lg md:w-1/3">
						<h2 className="text-xl font-semibold mb-4">Pricing</h2>
						<p className="text-3xl font-bold text-center mb-6">${plan.price}/month</p>
						{/* Add a prominent "Subscribe" button here */}
						<button onClick={handleSubmit}
							type="submit"
							className="bg-blue-600 text-white font-bold py-3 px-6 rounded shadow hover:bg-blue-700 w-full"
						>
							Subscribe
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default PlanDetail;
