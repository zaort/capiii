import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";

const NavBar = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	return (
		<nav className="bg-white shadow-md py-4 px-6">
			<div className="container mx-auto flex items-center justify-between">
				<Link to="/" className="text-2xl font-semibold">
					CAPIII
				</Link>

				<div className="space-x-6">
					<Link to="/plans" className="hover:text-blue-600">
						Plans
					</Link>
					{/* Add more links if needed: "About", "Contact", etc. */}

					{user ? (
						<>
							<Link to="/profile" className="hover:text-blue-600">
								Profile
							</Link>
							<button
								onClick={() => {
									logout();
									navigate("/");
								}}
								className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
							>
								Logout
							</button>
						</>
					) : (
						<>
							<Link to="/login" className="hover:text-blue-600">
								Login
							</Link>
							<Link
								to="/register"
								className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
							>
								Sign Up
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
