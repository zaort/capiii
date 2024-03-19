export const setItem = (key, value) => {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (e) {
		console.error("Error saving to localStorage:", e);
	}
};

export const getItem = (key, fallbackValue) => {
	try {
		const item = localStorage.getItem(key);
		if (item) {
			return JSON.parse(item); // Parse if it's an object or array
		} else {
			return fallbackValue;
		}
	} catch (e) {
		console.error("Error retrieving from localStorage:", e);
		return fallbackValue;
	}
};

export const removeItem = key => {
	try {
		localStorage.removeItem(key);
	} catch (e) {
		console.error("Error removing item from localStorage:", e);
	}
};
