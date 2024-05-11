import React, { useEffect, useState } from "react";
import { ROUTES } from "../../constants";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import Repositories from "../../repositories/repositories";
import { useGlobalLoadingState } from "../../hooks/useGlobalLoadingState";

function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [confirmationPassword, setconfirmationPassword] = useState("");
    const [password, setPassword] = useState("");
    const { loading, setLoading } = useGlobalLoadingState();

    useEffect(() => {
        if (email || name || password) {
            window.onbeforeunload = (e) => {
                e.preventDefault();
                return true;
            };
            return () => {
                window.onbeforeunload = null;
            };
        }
    }, [email, name, password]);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (loading) return;
            if (!name) return toast.error("enter name!");
            if (!email) return toast.error("enter email address!");
            if (!password) return toast.error("enter password!");
            if (confirmationPassword !== password)
                return toast.error("confirmation password not match!");
            setLoading(true);
            const errMsg = await Repositories.userRepository.register(
                name,
                email,
                password
            );
            setLoading(false);
            if (errMsg) return toast.error(errMsg);
            toast.success(
                "Registration successful! Please proceed to login using your credentials. Welcome!"
            );
            navigate(ROUTES.login.fullPath, { replace: true });
        } catch (error) {
            setLoading(false);
            toast.error("Something Wrong!");
        }
    };

    return (
        <div className="page-container grid place-items-center bg-neutral-900 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white flex flex-col p-4 rounded-lg gap-2 w-[min(100%,30rem)]"
            >
                <h4 className="mb-4">Register</h4>
                <div className="form-label">
                    <label htmlFor="name">Name*</label>
                    <input
                        required
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        id="name"
                        type="name"
                    />
                </div>
                <div className="form-label">
                    <label htmlFor="email">Email*</label>
                    <input
                        required
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        type="email"
                    />
                </div>
                <div className="form-label">
                    <label htmlFor="password">Password*</label>
                    <input
                        required
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        type="password"
                        autoComplete="new-password"
                    />
                </div>
                <div className="form-label">
                    <label htmlFor="confirmation-password">
                        Confirmation Password*
                    </label>
                    <input
                        required
                        className="input"
                        value={confirmationPassword}
                        onChange={(e) =>
                            setconfirmationPassword(e.target.value)
                        }
                        id="confirmation-password"
                        type="password"
                        autoComplete="new-password"
                    />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <button className="button primary" type="submit">
                        Register
                    </button>
                    <Link
                        className="button primary"
                        to={ROUTES.login.fullPath}
                        type="button"
                    >
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
