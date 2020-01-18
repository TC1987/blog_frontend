import React from 'react';
import { connect } from 'react-redux';

import Blogs from '../BlogList/BlogList';

const Dashboard = props => {
	return (
		<>
			{ props.message ? <p>{ props.message }</p> : null }
			<Blogs />
		</>
	);
};

const mapStateToProps = state => {
	return {
		message: state.message
	};
};

export default connect(mapStateToProps)(Dashboard);