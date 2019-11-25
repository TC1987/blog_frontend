import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import userReducer from './reducers/userReducer';
import blogsReducer from './reducers/blogReducer';

const reducers = combineReducers({
	user: userReducer,
	blogs: blogsReducer
});

const store = createStore(reducers);

ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.getElementById('root')
);