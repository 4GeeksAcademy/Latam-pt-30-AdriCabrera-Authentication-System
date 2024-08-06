import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Private = () => {
    const { store } = useContext(Context)
    const navigate = useNavigate()
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        if (!store.token) {
            setShowAlert(true)
            const timer = setTimeout(() => {
                navigate("/login")
            }, 3000)

            return () => clearTimeout(timer);
        }
    }, [store.token, navigate]);

    if (store.token) {
        return (
            <div className="text-center mt-5">
                <h1>Bienvenido!!</h1>
                <p>
                    <img src={rigoImageUrl} alt="Imagen de bienvenida" />
                </p>
            </div>
        );
    }

    return (
        <div className="text-center mt-5">
            {showAlert && (
                <div className="alert alert-warning" role="alert">
                    Debes iniciar sesión para acceder a esta página. Redirigiendo...
                </div>
            )}
        </div>
    );
};