import React from 'react';
import { connect } from 'react-redux';

import Blogs from '../Blogs/Blogs';
import Toggler from '../Toggler/Toggler';

import useField from '../../hooks/useField';

import { blogs_createNew } from '../../services/blogs';

const Dashboard = props => {
	const title = useField('text', 'Title');
	const content = useField('textarea', 'Content');

	const handleSubmit = e => {
		e.preventDefault();
	};

	return (
		<>
			<h1>Welcome Back { props.user.name }</h1>
			<Toggler buttonLabel="Create New Blog">
				<form onSubmit={ handleSubmit }>
					<input { ...title.attributes }></input>
					<input { ...content.attributes }></input>
					<input type="submit" value="Create"></input>
				</form>
			</Toggler>
			<Blogs />
		</>
	);
};

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps)(Dashboard);