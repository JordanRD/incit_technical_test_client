import { NavLink } from "react-router-dom";

import { ROUTES } from "../../constants";
import { useAuthState } from "../../hooks/useAuthState";
import React from "react";

function Landing() {
    const user = useAuthState((st) => st.user);

    return (
        <div className="flex gap-4 flex-col w-full h-full">
            <div className="flex flex-row gap-4 w-full border-b border-neutral-200 border-solid p-4">
                <h5>INCIT</h5>
                <div className="flex-grow"></div>
                {user ? (
                    <NavLink
                        className="button contained primary"
                        to={ROUTES.home.fullPath}
                    >
                        Home
                    </NavLink>
                ) : (
                    <React.Fragment>
                        <NavLink
                            className="button contained primary"
                            to={ROUTES.login.fullPath}
                        >
                            Login
                        </NavLink>
                        <NavLink
                            className="button contained primary"
                            to={ROUTES.register.fullPath}
                        >
                            Register
                        </NavLink>
                    </React.Fragment>
                )}
            </div>
            <div className="p-4 items-center justify-center w-full h-full">
                <h1>Landing Page</h1>
            </div>
        </div>
    );
}

export default Landing;
