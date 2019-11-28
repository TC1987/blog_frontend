import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import userReducer from './reducers/userReducer';
import blogsReducer from './reducers/blogReducer';
import messageReducer from './reducers/messageReducer';

const reducers = combineReducers({
	user: userReducer,
	blogs: blogsReducer,
	message: messageReducer
});

const store = createStore(reducers);

ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.getElementById('root')
);