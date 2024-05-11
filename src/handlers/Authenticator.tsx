import React, { useLayoutEffect } from "react";
import { useAuthState } from "../hooks/useAuthState";
import { useMatch, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";

function Authenticator() {
    const getAndSetUser = useAuthState((st) => st.getAndSetUser);
    // const setLoading = useGlobalLoadingState((state) => state.setLoading);
    const navigate = useNavigate();
    const matchingRoute = useMatch(ROUTES.home.fullPath + "/*");

    const isRouteMatch = matchingRoute !== null;
    // console.log("🚀 > Authenticator > isMatch:", isMatch);

    // const userNotExist = isNil(user);
    useLayoutEffect(() => {
        (async () => {
            // setLoading(true);
            const user = await getAndSetUser();
            // setLoading(false);
            if (user) return;
            if (isRouteMatch) {
                navigate(ROUTES.login.fullPath, { replace: true });
            }
        })();
    }, [getAndSetUser, navigate, isRouteMatch]);
    return <React.Fragment />;
}

export default Authenticator;
