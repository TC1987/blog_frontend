import React from 'react';

import styles from './comments.module.scss';

const Comments = ({ comments }) => {
	const formatDate = timestamp => {
		if (!timestamp) {
			return;
		}

		const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

		const date = new Date(timestamp);

		return `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;
	}

	const formatTime = timestamp => {
		if (!timestamp) {
			return;
		}

		const date = new Date(timestamp);

		return `${date.getHours()}:${date.getMinutes()}`;
	}

	return (
		<ul className={ styles.container }>
			{ comments.map(comment => (
				<li key={ comment.id } className={ styles.item }>
					<div className={ styles.authorDate }>
						<p className={ styles.item__author }>{ comment.author.name }</p>
						<p className={ styles.item__date }>{ formatDate(comment.date) }</p>
					</div>
					<p className={ styles.item__content }>{ comment.comment }</p>
				</li>
			)) }
		</ul>
	)
}

export default Comments;