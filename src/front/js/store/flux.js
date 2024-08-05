const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isLoggedIn: false
		},
		actions: {
			// Use getActions to call a function within a fuction
				login: () => {
					setStore ({isLoggedIn: true})
				}
			}
		}
	};

export default getState;
