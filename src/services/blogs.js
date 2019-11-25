import axios from 'axios';

const baseUrl = '/api/blogs';

export const blogs_getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

export const blogs_createNew = async blog => {
	const response = await axios.post(baseUrl);
	return response.data;
};