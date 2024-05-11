import React, { useMemo } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { ROUTES } from "./constants";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Home/Dashboard/Dashboard";
import Register from "./pages/Register/Register";
import Landing from "./pages/Landing/Landing";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import Profile from "./pages/Profile/Profile";
import NotVerified from "./pages/Home/NotVerified";

function Routes() {
    const routes = useMemo(() => {
        const routes: RouteObject[] = [];

        routes.push({
            index: true,
            element: <Landing />,
        });

        routes.push({
            path: ROUTES.login.path,
            element: <Login />,
        });

        routes.push({
            path: ROUTES.register.path,
            element: <Register />,
        });

        routes.push({
            path: ROUTES.verifyEmail.path,
            element: <VerifyEmail />,
        });

        routes.push({
            path: ROUTES.home.path,
            element: <Home />,
            children: [
                {
                    index: true,
                    element: (
                        <Navigate to={ROUTES.home.dashboard.fullPath} replace />
                    ),
                },
                {
                    path: ROUTES.home.dashboard.path,
                    element: <Dashboard />,
                },
                {
                    path: ROUTES.home.profile.path,
                    element: <Profile />,
                },
                {
                    path: ROUTES.home.notVerified.path,
                    element: <NotVerified />,
                },
            ],
        });

        routes.push({
            path: "*",
            element: <Navigate to={ROUTES.home.fullPath} />,
        });

        return routes;
    }, []);
    return useRoutes(routes);
}

export default Routes;
