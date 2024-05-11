import { toast } from "react-toastify";
import Repositories from "../../repositories/repositories";
import { useAuthState } from "../../hooks/useAuthState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";

function NotVerified() {
    const user = useAuthState((st) => st.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (user?.verified) {
            navigate(ROUTES.home.dashboard.fullPath);
        }
    }, [navigate, user]);

    const handleResend = async () => {
        const errMsg =
            await Repositories.emailVerificationRepository.sendEmailVerification();
        if (errMsg) toast.error(errMsg);
    };

    return (
        <div className="page-container grid place-items-center">
            <div className="flex flex-col items-center">
                <h5>Not Verified</h5>
                <span className="text-center mb-2">
                    Please verify your email to access dashboard
                </span>
                <button onClick={handleResend} className="button primary">
                    Send verification email
                </button>
            </div>
        </div>
    );
}

export default NotVerified;
