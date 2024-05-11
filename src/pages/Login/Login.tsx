import React, { useState } from "react";
import { FACEBOOK_LOGIN_URL, GOOGLE_LOGIN_URL, ROUTES } from "../../constants";

import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import Repositories from "../../repositories/repositories";
import { useGlobalLoadingState } from "../../hooks/useGlobalLoadingState";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { loading, setLoading } = useGlobalLoadingState();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;
        try {
            setLoading(true);
            const errMsg = await Repositories.userRepository.login(
                email,
                password
            );
            setLoading(false);
            setLoading(false);
            if (errMsg) return toast.error(errMsg);
            navigate(ROUTES.home.fullPath);
        } catch (error) {
            setLoading(false);
            console.error(error);
            toast.error("Something Wrong!");
        }
        // console.log(email, password);
    };

    return (
        <div className="page-container grid place-items-center bg-neutral-900 p-4 ">
            <form
                onSubmit={handleSubmit}
                className="bg-white flex flex-col p-4 rounded-lg gap-2 w-[min(100%,30rem)]"
            >
                <h4 className="mb-4">Login</h4>
                <div className="form-label">
                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                        id="email"
                        className="input"
                        type="email"
                    />
                </div>
                <div className="form-label">
                    <label htmlFor="password">Password</label>
                    <input
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        type="password"
                        className="input"
                    />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    <button
                        className="button primary col-span-full"
                        type="submit"
                    >
                        Login
                    </button>

                    <NavLink
                        className="button primary outlined"
                        to={GOOGLE_LOGIN_URL}
                        type="button"
                    >
                        Login with Google
                    </NavLink>
                    <NavLink
                        className="button primary primary outlined"
                        to={FACEBOOK_LOGIN_URL}
                        type="button"
                    >
                        Login with Facebook
                    </NavLink>
                    <NavLink
                        className="button primary col-span-full"
                        to={ROUTES.register.fullPath}
                        type="button"
                    >
                        Register
                    </NavLink>
                </div>
            </form>
        </div>
    );
}

export default Login;
