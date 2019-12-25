import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { blogs_service_getOne, blogs_service_update, blogs_service_delete } from '../../services/blogs';
import { blogs_update, blogs_delete } from '../../reducers/blogReducer';

import Comments from '../Comments/Comments';

const SingleBlog = props => {
	const [blog, setBlog] = useState(null);
	const { user } = props;

	useEffect(() => {
		blogs_service_getOne(props.match.params.id)
			.then(blog => setBlog(blog));
	}, []);

	const handleEdit = id => {
		
	};

	const handleDelete = async id => {
		try {
			const deletedBlog = await blogs_service_delete(id);
			props.blogs_delete(deletedBlog.id);
		} catch (err) {
			console.log(err);
		}
	};

	const likeBlog = async blog => {
		let updatedBlog = {
			...blog,
			likes: blog.likes + 1,
		};

		updatedBlog = await blogs_service_update(updatedBlog);
		setBlog(updatedBlog);
	}; 

	return blog ?
		<div>
			<p>Title: { blog.title }</p>
			<p>Content: { blog.content }</p>
			<p>Author: { blog.author.name }</p>
			<p>Likes: { blog.likes }</p>
			<button onClick={ () => likeBlog(blog) }>Like</button>
			{  blog.author.id === user.id ?
				<>
					<button onClick={ () => handleEdit(blog.id) }>Edit</button>
					<button onClick={ () => handleDelete(blog.id) }>Delete</button>
				</>
				:
				null
			}
			<Comments id={ blog.id } />
		</div>
		:
		null;
};

const mapStateToProps = state => {
	return {
		user: state.user,
		blogs: state.blogs
	};
};

const mapDispatchToProps = {
	blogs_update,
	blogs_delete
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleBlog);