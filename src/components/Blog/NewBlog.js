import React from 'react';
import { connect } from 'react-redux';

import { blogs_create } from '../../services/blogs';

import { blogs_add } from '../../reducers/blogReducer';
import { message_update } from '../../reducers/messageReducer';

import useField from '../../hooks/useField';

import { user_logout } from '../../reducers/userReducer';

const NewBlog = props => {
	const title = useField('text', 'Title');
	const content = useField(null, 'Content');

	const handleSubmit = async e => {
		e.preventDefault();

		const titleValue = title.attributes.value;
		const contentValue = content.attributes.value;

		const newBlog = {
			title: titleValue,
			content: contentValue,
			author: props.user.id
		};

		title.reset();
		content.reset();

		try {
			const createdBlog = await blogs_create(newBlog);

			props.blogs_add(createdBlog);
			props.message_update(`New Blog Created: ${titleValue}`);
			setTimeout(() => props.message_update(null), 3000);
			props.history.push('/');
		} catch (err) {
			// if (invalidorexpiredtoken) {
				window.localStorage.removeItem('user');
				window.localStorage.removeItem('token');
				props.user_logout();
			// }

			props.message_update(`Error: ${err}`);
			setTimeout(() => props.message_update(null), 3000);
			props.history.push('/');
		}
	};

	return (
		<form onSubmit={ handleSubmit }>
			<input { ...title.attributes }></input>
			<textarea { ...content.attributes }></textarea>
			<input type="submit" value="Create"></input>
		</form>
	);
};

const mapStateToProps = state => ({
	user: state.user
});

const mapDispatchToProps = {
	blogs_add,
	message_update,
	user_logout
};

export default connect(mapStateToProps, mapDispatchToProps)(NewBlog);