import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { blogs_service_getOne, blogs_service_update, blogs_service_delete } from '../../services/blogs';
import { users_update } from '../../services/users';

import { blogs_update, blogs_delete } from '../../reducers/blogReducer';
import { user_update } from '../../reducers/userReducer';

import Comments from '../Comments/Comments';

import useField from '../../hooks/useField';

const SingleBlog = props => {
	const [blog, setBlog] = useState(null);
	const [edit, setEdit] = useState(false);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const { user, user_update } = props;

	useEffect(() => {
		blogs_service_getOne(props.match.params.id)
			.then(blog => {
				setBlog(blog);
				blogs_service_update({
					...blog,
					views: blog.views + 1
				});
				return () => {
					console.log('Component has been unmounted');
				}
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

	const updateUserProperty = async updateObject => {
		const updatedUser = await users_update(updateObject);
		user_update(updatedUser);
		window.localStorage.setItem('user', JSON.stringify(updatedUser));
		console.log(updatedUser);
	}

	const { addUser, removeUser, addBlog, removeBlog } = {
		addUser: userId => ({
			op: '$push',
			field: 'followedUsers',
			value: userId
		}),
		removeUser: userId => ({
			op: '$pull',
			field: 'followedUsers',
			value: userId
		}),
		addBlog: blogId => ({
			op: '$push',
			field: 'savedBlogs',
			value: blogId
		}),
		removeBlog: blogId => ({
			op: '$pull',
			field: 'savedBlogs',
			value: blogId
		})
	}

	const displayFollow = userId => {
		if (!user) {
			return;
		}

		const authorIndex = user.followedUsers.findIndex(id => id === userId);

		if (authorIndex === -1) {
			return (
				<button onClick={ () => updateUserProperty(addUser(userId)) }>
					Follow { blog.author.name }
				</button>
			)
		}
		
		return (
			<button onClick={ () => updateUserProperty(removeUser(userId)) }>
				Unfollow
			</button>
		)
	}

	const displaySave = (blogId) => {
		if (!user) {
			return;
		}

		const blogIndex = user.savedBlogs.findIndex(id => id === blogId);

		if (blogIndex === -1) {
			return (
				<button onClick={ () => updateUserProperty(addBlog(blogId)) }>
					Save
				</button>
			)
		}

		return (
			<button onClick={ () => updateUserProperty(removeBlog(blogId)) }>
				Unsave
			</button>
		)
	}

	const displayEdit = () => {
		if (!edit) {
			return (
				<React.Fragment>
					<p>Title: { blog.title }</p>
					<p>Content: { blog.content }</p>
				</React.Fragment>
			)
		}

		return (
			<React.Fragment>
				<input type="text" value={ title } onChange={ e => setTitle(e.target.value) } placeholder="Title" />
				<textarea value={ content } onChange={ e => setContent(e.target.value) } placeholder="Content" />
				<button>Save Changes</button>
			</React.Fragment>
		)
	}

	return blog &&
		<div>
			{ displayEdit() }
			<Link to={ `/users/${blog.author.id}` }>Author: { blog.author.name }</Link>
			{ user.id !== blog.author.id && displayFollow(blog.author.id) }
			{ user.id !== blog.author.id && displaySave(blog.id) }
			<p>Likes: { blog.likes }</p>
			<button onClick={ () => likeBlog(blog) }>Like</button>
			{ user && blog.author.id === user.id &&
				<React.Fragment>
					<button onClick={ () => {
						setTitle(blog.title);
						setContent(blog.content);
						setEdit(edit => !edit)
					}}>Edit</button>
					<button onClick={ () => handleDelete(blog.id) }>Delete</button>
				</React.Fragment>
			}
			<Comments id={ blog.id } />
		</div>
};

const mapStateToProps = state => {
	return {
		user: state.user,
		blogs: state.blogs
	};
};

const mapDispatchToProps = {
	blogs_update,
	blogs_delete,
	user_update
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleBlog);