import React, { useState } from 'react';
import { connect } from 'react-redux';

import Toggler from '../Toggler/Toggler';
import useField from '../../hooks/useField';

import { login } from '../../services/login';
import { user_login } from '../../reducers/userReducer';

const Login = props => {
	const email = useField('text', 'Email');
	const password = useField('password', 'Password');
	let client;

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			client = await login({
				email: email.attributes.value,
				password: password.attributes.value
			});
			props.user_login(client.user);
			window.localStorage.setItem('token', client.token);
			window.localStorage.setItem('user', JSON.stringify(client.user));
		} catch (err) {
			console.log(err);
			email.reset();
			password.reset();
		}
	};

	return (
		<div>
			<Toggler buttonLabel="Login">
				<form onSubmit={ handleSubmit }>
					<input { ...email.attributes }></input>
					<input { ...password.attributes }></input>
					<input type="submit" value="Login"></input>
				</form>
			</Toggler>
		</div>
	);
};

const mapDispatchToProps = {
	user_login
};

export default connect(null, mapDispatchToProps)(Login);