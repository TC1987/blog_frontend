import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { blogs_service_update, blogs_service_delete } from '../../services/blogs';
import { blogs_update, blogs_delete } from '../../reducers/blogReducer';

import styles from './blog.module.scss';

const Blog = props => {
	const { id, title, content, author, likes, pictureUrl, comments, readTime, updatedAt } = props.blog;
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
		props.blogs_update(updatedBlog);
	};

	const formatDate = timestamp => {
		if (!timestamp) {
			return;
		}

		const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

		const date = new Date(timestamp);

		return `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;
	}

	const formatContent = content => {
		if (content.length > 100) {
			return `${content.slice(0, 100)}...`;
		}
		return content;
	}

	return (
		<div className={ styles.blog }>
			<div className={ styles.content }>
				{pictureUrl && <img src={ pictureUrl } alt="image" className={ styles.blog__image }></img>}
				<div className={ styles.blog__text }>
					<p className={ styles.text__date }>{ formatDate(updatedAt) }</p>
					<p><Link to={`/blogs/${id}`} className={ styles.text__title }>{title}</Link></p>
					<p className={ styles.text__content }>{formatContent(content)}</p>
					<p className={ styles.text__author }>by {author.name}</p>
				</div>
			</div>
			<div className={ styles.stats }>
				<p className={ styles.stats__likes }>Like {likes}</p>
				<p className={ styles.stats__commentCount }>Comments {comments.length}</p>
				{/* <button onClick={() => likeBlog(props.blog)}>Like</button> */}
			</div>
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