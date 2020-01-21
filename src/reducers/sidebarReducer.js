export const toggleSidebar = () => {
	return {
		type: 'TOGGLE_SIDEBAR'
	}
}

export default (state = true, action) => {
	switch (action.type) {
		case 'TOGGLE_SIDEBAR':
			return !state;
		default:
			return state;
	}
}