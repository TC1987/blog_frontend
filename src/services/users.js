import axios from 'axios';

const baseUrl = '/api/users';

export const users_getUsers = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

export const users_getUser = async id => {
	try {
		const response = await axios.get(`${baseUrl}/${id}`);
		return response.data;
	} catch (err) {
		throw err.response.data;
	}
};