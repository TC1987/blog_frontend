import axios from 'axios';

const baseUrl = '/api/blogs';

export const blogs_getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

export const blogs_create = async blog => {
	const options = {
		headers: {
			Authorization: `Bearer ${window.localStorage.getItem('token')}`
		}
	};
	
	const response = await axios.post(baseUrl, blog, options);
	return response.data;
};