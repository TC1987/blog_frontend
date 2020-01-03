import React from 'react';
import { connect } from 'react-redux';

import { users_register } from '../../services/users';
import { user_login } from '../../reducers/userReducer';
import { message_update } from '../../reducers/messageReducer';

import useField from '../../hooks/useField';

const Register = props => {
	const name = useField('text', 'Name');
	const email = useField('email', 'Email');
	const password = useField('password', 'Password');

	const register = async e => {
		e.preventDefault();

		const userData = {
			name: name.attributes.value,
			email: email.attributes.value,
			password: password.attributes.value
		}

		try {
			const { user, token } = await users_register(userData);
			props.user_login(user);
			window.localStorage.setItem('token', token);
			window.localStorage.setItem('user', JSON.stringify(user));
			props.message_update(`Welcome to BlogWorld ${user.name}.`);
			setTimeout(() => props.message_update(''), 3000);
			props.history.push('/');
		} catch (err) {
			console.log(err);
			name.reset();
			email.reset();
			password.reset();
		}
	}

	return (
		<React.Fragment>
			<form onSubmit={ register }>
				<input { ...name.attributes } />
				<input { ...email.attributes } />
				<input { ...password.attributes } />
				<input type="submit" value="Register" />
			</form>
		</React.Fragment>
	)
}

const mapDispatchToProps = {
	user_login,
	message_update
};

export default connect(null, mapDispatchToProps)(Register);