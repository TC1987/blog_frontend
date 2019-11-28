import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { users_getUsers } from '../../services/users';

const Users = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		users_getUsers()
			.then(users => setUsers(users));
	}, []);

	const usersList = () => {
		return (
			users.map(user => (
				<tr key={ user.id }>
					<td>{ user.name }</td>
					<td>{ user.blogs.length }</td>
				</tr>
			))
		);
	};

	return (
		<>
			<h1>Users</h1>
			<table>
				<thead>
					<tr>
						<th>Users</th>
						<th>Blogs Created</th>
					</tr>
				</thead>
				<tbody>
					{ usersList() }
				</tbody>
			</table>
		</>
	);
};

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps)(Users);