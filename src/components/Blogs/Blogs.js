import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { blogs_getAll } from '../../services/blogs';

import { blogs_init, blogs_add } from '../../reducers/blogReducer';
import { message_update } from '../../reducers/messageReducer';

import Blog from '../Blog/Blog';

const Blogs = props => {
	useEffect(() => {
		blogs_getAll().then(blogs => {
			props.blogs_init(blogs);
		});
	}, []);



	const blogList = () => {
		return props.blogs.map(blog => (
			<li key={ blog.id }>
				<Blog blog={ blog } />
			</li>
		));
	};

	return (
		<ul>
			{ blogList() }
		</ul>
	);
};

const mapStateToProps = state => {
	return {
		user: state.user,
		blogs: state.blogs,
		message: state.message
	};
};

const mapDispatchToProps = {
	blogs_init,
	blogs_add,
	message_update
};

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);