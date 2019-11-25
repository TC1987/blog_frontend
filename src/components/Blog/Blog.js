import React from 'react';

const Blog = ({ title, content, author }) => {
	return (
		<div>
			<p>{ title }</p>
			<p>{ content }</p>
			<p>{ author }</p>
		</div>
	);
};

export default Blog;