import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { blogs_getAll } from '../../services/blogs';
import { blogs_init } from '../../reducers/blogReducer';

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
				<Blog { ...blog } />
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
		blogs: state.blogs
	};
};

const mapDispatchToProps = {
	blogs_init
};

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);