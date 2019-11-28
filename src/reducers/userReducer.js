export const user_login = user => {
	return {
		type: 'USER_LOGIN',
		payload: user
	};
};

export const user_logout = () => {
	return {
		type: 'USER_LOGOUT'
	}
}

const userReducer = (user = null, action) => {
	switch (action.type) {
		case 'USER_LOGIN':
			return action.payload;
		case 'USER_LOGOUT':
			return null;
		default:
			return user;
	}
};

export default userReducer;