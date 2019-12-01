import React, { useState, useEffect } from 'react';

import useField from '../../hooks/useField';

import { getComments, addComment } from '../../services/comments';

const Comment = props => {
	const [comments, setComments] = useState([]);
	const comment = useField('text', 'Comment');
	const name = useField('text', 'Name');

	useEffect(() => {
		getComments(props.id).then(comments => {
			setComments(comments);
		});
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();

		const newComment = {
			comment: comment.attributes.value,
			name: name.attributes.value
		};

		comment.reset();
		name.reset();

		try {
			const savedComment = await addComment(props.id, newComment);
			setComments([...comments, savedComment]);
		} catch (err) {
			console.log(err.message);
		}
	};

	const listComments = () => {
		return comments.map(comment => (
			<li key={ comment.id }>
				<p>{ comment.comment }</p>
				<p>{ comment.name }</p>
			</li>
		));
	};

	return (
		<>
			<form onSubmit={ handleSubmit }>
				<input { ...comment.attributes} />
				<input { ...name.attributes} />
				<input type="submit" value="Add Comment" />
			</form>
			<ul>
				{ listComments() }
			</ul>
		</>
	);
};

export default Comment;