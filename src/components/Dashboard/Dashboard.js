import React from 'react';
import { connect } from 'react-redux';

import Blogs from '../Blogs/Blogs';

const Dashboard = props => {
	return (
		<>
			<h1>Welcome Back { props.user.name }</h1>
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