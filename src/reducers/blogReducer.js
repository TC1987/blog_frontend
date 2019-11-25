export const blogs_init = blogs => {
	return {
		type: 'BLOGS_INIT',
		payload: blogs
	};
};

export const blogs_add = blog => {
	return {
		type: 'BLOGS_ADD',
		payload: blog
	};
};

const blogReducer = (blogs = [], action) => {
	switch (action.type) {
		case 'BLOGS_INIT':
			return [...action.payload];
		case 'BLOGS_ADD':
			return [...blogs, action.payload];
		default:
			return blogs;
	}
};

export default blogReducer;