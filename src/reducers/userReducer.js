export const user_login = user => {
	return {
		type: 'USER_LOGIN',
		payload: user
	};
};

const userReducer = (state = null, action) => {
	switch (action.type) {
		case 'USER_LOGIN':
			return action.payload;
		default:
			return state;
	}
};

export default userReducer;