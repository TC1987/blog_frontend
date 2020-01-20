import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import useField from '../../hooks/useField';

import { login } from '../../services/login';
import { user_login } from '../../reducers/userReducer';
import { setToken } from '../../utils/token';

import styles from './login.module.scss';

import abstractImg from '../../images/multi-color.jpg';

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
		<div className={ styles.container }>
			<div className={ styles.image }></div>
			{/* <h4 className={ styles.heading }><span className={ styles.heading__bold }>Welcome</span> Back</h4> */}
			<form onSubmit={ handleSubmit } className={ styles.form }>
				<input { ...email.attributes } className={ styles.form__field }></input>
				<input { ...password.attributes } className={ styles.form__field }></input>
				<button type="submit" value="Login" className={ `${styles.form__button} ${styles.form__button__login}` }>Login</button>
			</form>
			<p>Don't have an account? <span className={ styles.bold }><Link to={'/register'} className={ styles.link }>Register</Link></span></p>
		</div>
	);
};

const mapDispatchToProps = {
	user_login
};

export default connect(null, mapDispatchToProps)(Login);