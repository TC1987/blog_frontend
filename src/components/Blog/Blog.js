import React from 'react';
import { connect } from 'react-redux';

const Blog = ({ id, title, content, author, user }) => {
	const handleEdit = e => {
		
	};

	const handleDelete = e => {

	};

	return (
		<div>
			<p>Title: { title }</p>
			<p>Content: { content }</p>
			<p>Author: { author.name }</p>
			{  author.id === user.id ?
				<>
					<button onClick={ handleEdit }>Edit</button>
					<button onClick={ handleDelete }>Delete</button>
				</>
				:
				null
			}
		</div>
	);
};

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(Blog);