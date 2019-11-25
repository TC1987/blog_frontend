export const blogs_init = blogs => {
	return {
		type: 'BLOGS_INIT',
		payload: blogs
	};
};

const blogReducer = (blogs = [], action) => {
	switch (action.type) {
		case 'BLOGS_INIT':
			return [...action.payload];
		default:
			return blogs;
	}
};

export default blogReducer;