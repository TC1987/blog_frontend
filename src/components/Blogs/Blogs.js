import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { blogs_getAll, blogs_create } from '../../services/blogs';

import { blogs_init, blogs_add } from '../../reducers/blogReducer';
import { message_update } from '../../reducers/messageReducer';

import useField from '../../hooks/useField';

import Blog from '../Blog/Blog';
import Toggler from '../Toggler/Toggler';

const Blogs = props => {
	const title = useField('text', 'Title');
	const content = useField('textarea', 'Content');

	useEffect(() => {
		blogs_getAll().then(blogs => {
			props.blogs_init(blogs);
		});
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();

		const titleValue = title.attributes.value;
		const contentValue = content.attributes.value;

		const newBlog = {
			title: titleValue,
			content: contentValue,
			author: props.user.id
		};

		title.reset();
		content.reset();

		try {
			const createdBlog = await blogs_create(newBlog);


			// How does dispatching an action work? What is the execution flow? How
			// can we call two action creators here when it is expected for a re
			// render to occur after the first one?


			props.blogs_add(createdBlog);
			props.message_update('hello');
			setTimeout(() => props.message_update(null), 3000);
		} catch (err) {
			console.log(err);
		}
	};

	const blogList = () => {
		return props.blogs.map(blog => (
			<li key={ blog.id }>
				<Blog blog={ blog } />
			</li>
		));
	};

	return (
		<>
			<Toggler buttonLabel="Create New Blog">
				<form onSubmit={ handleSubmit }>
					<input { ...title.attributes }></input>
					<input { ...content.attributes }></input>
					<input type="submit" value="Create"></input>
				</form>
			</Toggler>
			<ul>
				{ blogList() }
			</ul>
		</>
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