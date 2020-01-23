import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Comments from '../Comments/Comments';
import useField from '../../hooks/useField';
import { getComments, addComment } from '../../services/comments';
import styles from './commentlist.module.scss';

const CommentList = props => {
	const [comments, setComments] = useState([]);
	const comment = useField(null, 'Comment');

	useEffect(() => {
		getComments(props.id).then(comments => {
			setComments(comments);
		});
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();

		const newComment = {
			comment: comment.attributes.value,
			author: props.user.id,
			authorName: props.user.name
		};

		comment.reset();

		try {
			const savedComment = await addComment(props.id, newComment);
			savedComment.author = {
				id: savedComment.author,
				name: props.user.name
			}
			setComments(comments => [...comments, savedComment]);
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<div className={ styles.container }>
			<Comments comments={ comments } />
			{ props.user &&
				<form onSubmit={ handleSubmit } className={ styles.form }>
					<textarea { ...comment.attributes} className={ styles.form__content } />
					<button type="submit" className={ styles.form__button }>Post Comment</button>
				</form>
			}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(CommentList);