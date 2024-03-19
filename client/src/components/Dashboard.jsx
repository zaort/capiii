import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_PROVIDER_CREATED_PLANS } from "../utils/queries";
import PlanCard from "../components/PlanCard";
import { Link } from "react-router-dom";
// import "tailwindcss/tailwind.css";

const Dashboard = () => {
	const { user } = useAuth();
	const [providerPlans, setProviderPlans] = useState([]);
	const { loading, error, data } = useQuery(GET_PROVIDER_CREATED_PLANS);
	// console.log(data);

	useEffect(() => {
		if (data && data.me) {
			setProviderPlans(data.me.createdPlans);
		}
	}, [data]);

	if (!user) {
		// Handle case where user is not authenticated
		return <p>Please log in to view this page.</p>;
	}

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error fetching plans!</p>;
	}
	// console.log(user);
	return (
		<div className="container mx-auto mt-8">
			{data.me.isProvider ? (
				<>
					<h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

					{loading && <p className="text-center">Loading your plans...</p>}
					{error && <p className="text-center text-red-600">Error fetching plans!</p>}
					<div className="flex flex-col md:flex-col gap-6">
						<section className="provider-plans">
							<h2 className="text-2xl font-semibold mb-4">My Plans</h2>

							{providerPlans.length === 0 ? (
								<p>You don't have any plans created yet.</p>
							) : (
								<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{providerPlans.map(plan => (
										<li key={plan._id}>
											<PlanCard plan={plan} />
										</li>
									))}
								</ul>
							)}
						</section>

						<Link
							to={`/create-plan`}
							className="bg-blue-600 w-2/12 text-white  font-bold my-16 py-3 px-6 rounded shadow mt-4 hover:bg-blue-700"
						>
							Create New Plan
						</Link>
					</div>
				</>
			) : (
				<p className="text-center">You are not a provider.</p>
			)}
		</div>
	);
};

export default Dashboard;
