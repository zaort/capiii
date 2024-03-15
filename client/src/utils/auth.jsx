import React, { createContext, useState, useEffect, useContext } from "react";
import decode from "jwt-decode";
import axios from "axios"; // Or your preferred HTTP library
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("id_token");
		if (token && !isTokenExpired(token)) {
			// console.log(token);
			const decodedToken = decode(token);
			// console.log(decodedToken);
			setUser({
				email: decodedToken.data.email,
				username: decodedToken.data.username,
				_id: decodedToken.data._id,
				isProvider: decodedToken.data.isProvider,
			});
		}
	}, []);

	const isTokenExpired = token => {
		try {
			const decoded = decode(token);
			if (decoded.exp < Date.now() / 1000) {
				return true;
			} else return false;
		} catch (err) {
			return false;
		}
	};

	const login = async token => {
		try {
			// const response = await axios.post("/login", { email, password });
			// const { token } = response.data;
			localStorage.setItem("id_token", token);
			// setUser(decode(token));
		} catch (error) {
			console.error("Login error:", error);
			throw error;
		}
	};

	const logout = () => {
		localStorage.removeItem("id_token");
		setUser(null);
	};

	return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
