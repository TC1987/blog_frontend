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
			.then(blog => {
				setBlog(blog);
				blogs_service_update({
					...blog,
					views: blog.views + 1
				}).then(blog => console.log(blog.views));
			});
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

	const subscribe = (authorId) => {
		console.log(`Subscribing to ${authorId}`);
	};

	return blog ?
		<div>
			<p>Title: { blog.title }</p>
			<p>Content: { blog.content }</p>
			<p>Author: { blog.author.name }</p>
			{ user && user.id !== blog.author.id ? <p onClick={ () => subscribe(blog, blog.author.id) }>Subscribe To { blog.author.name }</p> : null }
			<p>Likes: { blog.likes }</p>
			<button onClick={ () => likeBlog(blog) }>Like</button>
			{ user && blog.author.id === user.id ?
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