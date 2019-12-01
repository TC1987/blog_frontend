import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { blogs_service_update, blogs_service_delete } from '../../services/blogs';
import { blogs_update, blogs_delete } from '../../reducers/blogReducer';

import Comments from '../Comments/Comments';

const Blog = props => {
	const blog = props.blog || props.location.state;
	const { id, title, content, author, likes } = props.blog || props.location.state;
	const { user } = props;

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
		console.log('updatedBlog');
		console.log(updatedBlog);
		console.log('-----------');
		props.blogs_update(updatedBlog);
	}; 

	return (
		<div>
			{ props.location && props.location.state ?
				<p>Title: { title }</p>
				:	
				<Link to={{
					pathname: `/blogs/${id}`,
					state: props.blog || props.location.state
				}}>
					Title: { title }
				</Link>
			}
			<p>Content: { content }</p>
			<p>Author: { author.name }</p>
			<p>Likes: { likes }</p>
			<button onClick={ () => likeBlog(blog) }>Like</button>
			{  author.id === user.id ?
				<>
					<button onClick={ () => handleEdit(id) }>Edit</button>
					<button onClick={ () => handleDelete(id) }>Delete</button>
				</>
				:
				null
			}
			{ props.location && props.location.state ?
				<Comments id={ id } />
				:
				null
			}
		</div>
	);
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

export default connect(mapStateToProps, mapDispatchToProps)(Blog);