import React from 'react';
import { connect } from 'react-redux';

import { blogs_service_update, blogs_service_delete } from '../../services/blogs';
import { blogs_update, blogs_delete } from '../../reducers/blogReducer';

const Blog = props => {
	const { id, title, content, author, likes } = props.blog;
	const { user } = props;

	const handleEdit = id => {
		
	};

	const handleDelete = async id => {
		const deletedBlog = await blogs_service_delete(id);
		props.blogs_delete(deletedBlog.id);
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
			<p>Title: { title }</p>
			<p>Content: { content }</p>
			<p>Author: { author.name }</p>
			<p>Likes: { likes }</p>
			<button onClick={ () => likeBlog(props.blog) }>Like</button>
			{  author.id === user.id ?
				<>
					<button onClick={ () => handleEdit(id) }>Edit</button>
					<button onClick={ () => handleDelete(id) }>Delete</button>
				</>
				:
				null
			}
		</div>
	);
};

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = {
	blogs_update,
	blogs_delete
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);