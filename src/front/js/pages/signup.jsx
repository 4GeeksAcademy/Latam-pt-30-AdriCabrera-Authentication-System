import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signup = () => {
    const { store, actions } = useContext(Context)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")

        if (!email || !password) {
            setError("Por favor, completa todos los campos.")
            return
        }

        const success = await actions.signup(email, password)

        if (success) {
            navigate("/login")
        } else {
            setError(store.error)
        }
    }

    return (
        <div className="container d-flex justify-content-center mt-3">
            <form onSubmit={handleSubmit}>
                <h1 className="container d-flex justify-content-center m-3">
                    Registro de Usuario
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
                {error && (
                    <p className="text-danger fst-italic">{error}</p>
                )}
                <button type="submit" className="btn btn-primary">
                    Registrarme
                </button>
            </form>
        </div>
    )
}