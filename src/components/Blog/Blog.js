import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { blogs_service_getOne, blogs_service_update, blogs_service_delete } from '../../services/blogs';
import { users_update } from '../../services/users';

import { blogs_update, blogs_delete } from '../../reducers/blogReducer';
import { user_update } from '../../reducers/userReducer';

import CommentList from '../CommentList/CommentList';

import styles from './blog.module.scss';

import bolt from '../../images/bolt2.svg';

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

	const editBlogLike = async (blog, type) => {
		let updatedBlog = {
			...blog,
		};

		if (type === 'INCREMENT') {
			updatedBlog.likes = updatedBlog.likes + 1;
		} else {
			updatedBlog.likes = updatedBlog.likes - 1;
		}

		updatedBlog = await blogs_service_update(updatedBlog);
		setBlog(updatedBlog);
	};

	const updateUserProperty = async updateObject => {
		const updatedUser = await users_update(updateObject);
		user_update(updatedUser);
		window.localStorage.setItem('user', JSON.stringify(updatedUser));
	}

	const { addUser, removeUser, addBlog, removeBlog, likeBlog, unlikeBlog } = {
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
		}),
		likeBlog: blogId => ({
			op: '$push',
			field: 'likedBlogs',
			value: blogId
		}),
		unlikeBlog: blogId => ({
			op: '$pull',
			field: 'likedBlogs',
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
				<button
					onClick={ () => updateUserProperty(addUser(userId)) }
					className={ styles.actions__follow }
				>
					Follow
				</button>
			)
		}
		
		return (
			<button
				onClick={ () => updateUserProperty(removeUser(userId)) }
				className={ styles.actions__follow }
			>
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
				<button
					onClick={ () => updateUserProperty(addBlog(blogId)) } 
					className={ styles.actions__save }
				>
					Save
				</button>
			)
		}

		return (
			<button
				onClick={ () => updateUserProperty(removeBlog(blogId)) }
				className={ styles.actions__save }	
			>
				Unsave
			</button>
		)
	}

	const displayLike = blog => {
		if (!user) {
			return;
		}

		const blogIndex = user.likedBlogs.findIndex(id => id === blog.id);

		if (blogIndex === -1) {
			return (
				<button onClick={ () => {
					updateUserProperty(likeBlog(blog.id));
					editBlogLike(blog, 'INCREMENT');
				} } className={ styles.actions__like }>
					Like
				</button>
			)
		}

		return (
			<button onClick={ () => {
				updateUserProperty(unlikeBlog(blog.id));
				editBlogLike(blog, 'DECREMENT');
			} } className={ styles.actions__like }>
				Unlike
			</button>
		)
	}

	// const displayEdit = () => {
	// 	if (!edit) {
	// 		return (
	// 			<React.Fragment>
	// 				<p>{ blog.title }</p>
	// 				<p>{ blog.content }</p>
	// 			</React.Fragment>
	// 		)
	// 	}

	// 	return (
	// 		<React.Fragment>
	// 			<input type="text" value={ title } onChange={ e => setTitle(e.target.value) } placeholder="Title" />
	// 			<textarea value={ content } onChange={ e => setContent(e.target.value) } placeholder="Content" />
	// 			<button>Save Changes</button>
	// 		</React.Fragment>
	// 	)
	// }

	const formatDate = timestamp => {
		if (!timestamp) {
			return;
		}

		const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

		const date = new Date(timestamp);

		return `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;
	}

	return blog &&
		<div className={ styles.container }>
			<div className={ styles.content }>
				{ blog.pictureUrl && <img src={ blog.pictureUrl } className={ styles.content__image }></img> }
				<p className={ styles.content__date }>{ formatDate(blog.updatedAt) }</p>
				<h1 className={ styles.content__title }>{ blog.title }</h1>
				<div className={ styles.content__authorTime }>
					<p className={ styles.content__authorTime__author }>By { blog.author.name }</p>
					<p className={ styles.content__authorTime__time }>{ blog.readTime } min read</p>
				</div>
				<p className={ styles.content__content }>{ blog.content }</p>
			</div>
			
			{/* <div className={ styles.titleContent }>
				{ displayEdit() }
			</div> */}

			<div className={ styles.likes }>
				<p className={ styles.likes__text }>{ blog.likes } <span className={ styles.likes__bold }>likes</span></p>
			</div>

			<div className={ `${ user && user.id !== blog.author.id ? styles.actions : styles.none }` }>
				{ user && user.id !== blog.author.id && displayFollow(blog.author.id) }
				{ user && user.id !== blog.author.id && displayLike(blog) }	
				{ user && user.id !== blog.author.id && displaySave(blog.id) }
			</div>

			{/* { user && blog.author.id === user.id &&
				<React.Fragment>
					<button onClick={ () => {
						setTitle(blog.title);
						setContent(blog.content);
						setEdit(edit => !edit)
					}}>Edit</button>
					<button onClick={ () => handleDelete(blog.id) }>Delete</button>
				</React.Fragment>
			} */}
			{/* <div className={ styles.heart }></div> */}
			<CommentList id={ blog.id } />
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