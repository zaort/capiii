import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../utils/queries";
import { Link } from 'react-router-dom';

const Profile = () => {
	const [userData, setUserData] = useState({});
	const { user, logout } = useAuth();
	const [subscribedPlans, setSubscribedPlans] = useState([]); // For subscriptions
	const { loading, error, data } = useQuery(GET_USER);

	useEffect(() => {
		if (!loading && data && data.me) {
			setUserData(data.me);
			setSubscribedPlans(data.me.subscribedPlans);
		}
	}, [loading, data]);

	return (
		<div className="container mx-auto mt-8">
			<h1 className="text-3xl font-bold mb-6">My Profile</h1>

			{loading && (
				<p className="text-center">Loading profile data...</p>
			)}
			{error && (
				<p className="text-center text-red-600">Error fetching profile data!</p>
			)}

			{user && (
				<div>
					<h2>User Details</h2>
					<p>
						<strong>Username:</strong> {userData.username}
					</p>
					<p>
						<strong>Email:</strong> {userData.email}
					</p>

					<h2 className="text-2xl font-semibold mt-8">My Subscriptions</h2>
					{subscribedPlans.length === 0 ? (
						<p>You are not currently subscribed to any plans.</p>
					) : (
						<ul className="list-disc ml-6 mt-2">
							{subscribedPlans.map(plan => (
								<li key={plan._id}>
									{plan.name} - ${plan.price}/month
								</li>
							))}
						</ul>
					)}

					{/* Manage Subscription Button (Conditional) */}
					{subscribedPlans.length > 0 && (
						<button
							className="bg-blue-600 text-white font-bold py-3 px-6 rounded shadow mt-4 hover:bg-blue-700">
							<Link to="/subscription-list">Manage Subscriptions</Link>
						</button>
					)}

					<button
						className="bg-gray-600 text-white font-bold py-3 px-6 rounded shadow mt-4"
						onClick={logout}
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
};

export default Profile;