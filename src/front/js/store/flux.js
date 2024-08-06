const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			user: null,
			error: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			setToken: () => {
				const token = sessionStorage.getItem('token')
				const user = JSON.parse(sessionStorage.getItem('user'))
				setStore({ ...getStore(), user: user, token: token })
				},

			signup: async (email, password) => {
				try {
					const response = await fetch("https://psychic-space-eureka-g4x4gpgpg549cvq56-3001.app.github.dev/api/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({email: email, password: password})
					})

					if (!response.ok) {
                        const errorData = await response.json()
                        setStore({ ...getStore(), error: errorData.message || "Email incorrecto" })
                        return false
					}

					const data = await response.json()
					setStore({user: data.user})
					console.log("Esta es la data", data)
					return true
				
				} catch (error) {
					console.log(error)
				}
			},

			login: async (email, password) => {
				try {
					const response = await fetch("https://psychic-space-eureka-g4x4gpgpg549cvq56-3001.app.github.dev/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({email : email, password : password})
					})

					if (!response.ok) {
                        const errorData = await response.json()
                        setStore({ ...getStore(), error: errorData.message || "Email o password incorrectos" })
                        return false
					}

					const data = await response.json()
					sessionStorage.setItem("token", data.token)
					sessionStorage.setItem("user", JSON.stringify(data.user))
					setStore({ ...getStore(), token: data.token, user: data.user, error: null })
					return true

				} catch (error) {
					setStore({ ...getStore(), error: "Error de red o servidor" })
				}
			},

			logout: async () => {
				sessionStorage.removeItem("token");
				sessionStorage.removeItem("user");
				setStore({ ...getStore(), token: null, user: null })
			}
		}
	}
}

export default getState;
