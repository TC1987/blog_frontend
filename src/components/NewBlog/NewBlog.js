import React, { useState } from 'react';
import { connect } from 'react-redux';

import { blogs_create } from '../../services/blogs';

import { blogs_add } from '../../reducers/blogReducer';
import { message_update } from '../../reducers/messageReducer';

import useField from '../../hooks/useField';

import styles from './newblog.module.scss';

const NewBlog = props => {
	const title = useField('text', 'Title');
	const content = useField(null, 'Content');
	const [image, setImage] = useState(null);

	const fileChange = e => {
		console.log(e.target.files[0]);
		setImage(e.target.files[0]);
	}

	const handleSubmit = async e => {
		e.preventDefault();

		const formData = new FormData();
		formData.set('title', title.attributes.value);
		formData.set('content', content.attributes.value);
		formData.set('image', image);
		formData.set('author', props.user.id)

		const titleValue = title.attributes.value;
		const contentValue = content.attributes.value;

		try {
			const createdBlog = await blogs_create(formData);

			
			props.blogs_add(createdBlog);
			props.message_update(`New Blog Created: ${titleValue}`);
			setTimeout(() => props.message_update(null), 3000);
			title.reset();
			content.reset();
			props.history.push('/');
		} catch (err) {
			console.log(err);
			props.message_update(err);
			// props.message_update(`Error: ${err}`);
			setTimeout(() => props.message_update(null), 3000);
		}
	};

	return (
		<div className={ styles.container }>
			{ props.message && <p className={ styles.message }>{ props.message }</p> }
			<form onSubmit={handleSubmit} className={ styles.form }>
				<input {...title.attributes}></input>
				<textarea {...content.attributes} className={ styles.form__content }></textarea>
				<label htmlFor="file_upload" className={ styles.form__file__label }>{ image ? image.name : 'Choose File' }</label>
				<input type="file" name="image" id="file_upload" onChange={ fileChange } className={ styles.form__file }></input>
				<button type="submit" className={ styles.form__button } onClick={ handleSubmit }>Create Post</button>
			</form >
		</div>
	);
};

const mapStateToProps = state => ({
	user: state.user,
	message: state.message
});

const mapDispatchToProps = {
	blogs_add,
	message_update
};

export default connect(mapStateToProps, mapDispatchToProps)(NewBlog);
