export const ENDPOINT = import.meta.env.VITE_ENDPOINT!;

export const GOOGLE_LOGIN_URL = `${ENDPOINT}/auth/google`;
export const FACEBOOK_LOGIN_URL = `${ENDPOINT}/auth/facebook`;

export const DATE_FORMAT = {
    display: "DD MMM YYYY HH:mm",
};

export const ROUTES = {
    login: {
        path: "login",
        fullPath: "/login",
    },
    register: {
        path: "register",
        fullPath: "/register",
    },
    verifyEmail: {
        path: "verify-email/:code",
        getFullPath: (code: string) => "/verify-email/" + code,
    },
    home: {
        path: "home",
        fullPath: "/home",
        dashboard: {
            path: "dashboard",
            fullPath: "/home/dashboard",
        },
        profile: {
            path: "profile",
            fullPath: "/home/profile",
        },
        notVerified: {
            path: "not-verified",
            fullPath: "/home/not-verified",
        },
    },
};
