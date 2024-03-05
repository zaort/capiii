import React from "react";
import { Link } from "react-router-dom";

const PlanCard = ({ plan }) => {
	return (
		<div className="border border-gray-300 rounded p-4 shadow-md">
			<h2 className="text-xl font-bold">{plan.name}</h2>
			<p className="my-2">{plan.description}</p>
			<p className="text-lg font-semibold">${plan.price}/month</p>

			<h3 className="text-base font-semibold mt-3">Features:</h3>
			{/* <ul className="list-disc ml-6">
    {plan.features.map((feature) => (
     <li key={feature}>{feature}</li>
    ))}
   </ul> */}

			<p className="mt-3">Subscribers: {plan.subscriberCount}</p>

			<Link
				to={`/plans/${plan._id}`}
				className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-700"
			>
				View Details
			</Link>
		</div>
	);
};

export default PlanCard;
