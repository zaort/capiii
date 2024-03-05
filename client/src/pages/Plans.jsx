import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PLANS } from "../utils/queries";
import PlanCard from "../components/PlanCard";
// import 'tailwindcss/tailwind.css';

const Plans = () => {
	const [plansData, setPlansData] = useState([]);
	const { loading, error, data } = useQuery(GET_PLANS);

	console.log(data);
	useEffect(() => {
		if (data && data.plans) {
			// Adjust the condition if needed
			setPlansData(data.plans);
		}
	}, [data]);

	console.log(plansData);

	return (
		<div className="container mx-auto mt-8">
			<h1 className="text-3xl font-bold mb-6">Explore Our Plans</h1>
			{/* Optional: Add search or filter components here with Tailwind styling */}

			{loading && <p className="text-center">Loading plans...</p>}
			{error && <p className="text-center text-red-600">Error fetching plans!</p>}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
				{plansData.map(plan => (
					<PlanCard key={plan._id} plan={plan} />
				))}
			</div>
		</div>
	);
};

export default Plans;
