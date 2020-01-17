import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { blogs_service_update, blogs_service_delete } from '../../services/blogs';
import { blogs_update, blogs_delete } from '../../reducers/blogReducer';

const Blog = props => {
	const { id, title, content, author, likes, pictureUrl } = props.blog;
	const { user } = props;

	console.log(pictureUrl);

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
		props.blogs_update(updatedBlog);
	};

	return (
		<div>
			{pictureUrl ? <img src={pictureUrl} alt="image" style={{ height: '200px', display: 'block' }}></img> : null}
			<Link to={`/blogs/${id}`}>Title: {title}</Link>
			<p>Content: {content}</p>
			<p>Author: {author.name}</p>
			<p>Likes: {likes}</p>
			<button onClick={() => likeBlog(props.blog)}>Like</button>
			{user && author.id === user.id ?
				<>
					<button onClick={() => handleEdit(id)}>Edit</button>
					<button onClick={() => handleDelete(id)}>Delete</button>
				</>
				:
				null
			}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

const mapDispatchToProps = {
	blogs_update,
	blogs_delete
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);