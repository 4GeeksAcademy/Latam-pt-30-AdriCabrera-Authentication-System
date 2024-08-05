import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que el formulario se envíe por defecto
        // Aquí deberías implementar la lógica para verificar el inicio de sesión
        // Por ahora, simplemente marcamos como logueado
        actions.login(true);
    };

    return (
        <div className="container d-flex justify-content-center mt-3">
            <form onSubmit={handleSubmit}>
                <h1 className="container d-flex justify-content-center m-3">
                    Login
                </h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {store.isLoggedIn ? (
                    <Link to={"/dashboard"}></Link>
                ) : (
                    <p className="text-danger fst-italic">Please enter email and password!</p>
                )}
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};