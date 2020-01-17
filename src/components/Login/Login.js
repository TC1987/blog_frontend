import React from 'react';
import { connect } from 'react-redux';

import useField from '../../hooks/useField';

import { login } from '../../services/login';
import { user_login } from '../../reducers/userReducer';
import { setToken } from '../../utils/token';

const Login = props => {
	const email = useField('text', 'Email');
	const password = useField('password', 'Password');

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const { user, token } = await login({
				email: email.attributes.value,
				password: password.attributes.value
			});
			props.user_login(user);
			setToken(token); // This isn't doing anything right now.
			window.localStorage.setItem('token', token);
			window.localStorage.setItem('user', JSON.stringify(user));
		} catch (err) {
			console.log(err);
			email.reset();
			password.reset();
		}
	};

	return (
		<div>
			<form onSubmit={ handleSubmit }>
				<input { ...email.attributes }></input>
				<input { ...password.attributes }></input>
				<input type="submit" value="Login"></input>
			</form>
		</div>
	);
};

const mapDispatchToProps = {
	user_login
};

export default connect(null, mapDispatchToProps)(Login);