import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	const handleLogout = async () => {
		await actions.logout()
		navigate("/")
	}

	return (
		<nav className="navbar navbar-dark bg-dark">
			<div className="container d-flex justify-content-between align-items-center">
				<div className="d-flex align-items-center">
					<Link to="/" className="navbar-brand">
						React Boilerplate
					</Link>
					<Link to="/private" className="navbar-brand ms-3">
						Private
					</Link>
				</div>
				<div className="d-flex gap-2">
					{store.token ? (
						<button className="btn btn-danger" type="button" onClick={handleLogout}>
							Cerrar sesión
						</button>
					) : (
						<>
							<Link to="/signup">
								<button className="btn btn-light">Signup</button>
							</Link>
							<Link to="/login">
								<button className="btn btn-light">Login</button>
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	)
}