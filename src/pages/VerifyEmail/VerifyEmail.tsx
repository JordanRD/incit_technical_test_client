import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Repositories from "../../repositories/repositories";
import { useAuthState } from "../../hooks/useAuthState";
import { ROUTES } from "../../constants";

function VerifyEmail() {
    const { code } = useParams();
    const user = useAuthState((st) => st.user);
    const [verified, setVerified] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    useEffect(() => {
        if (code) {
            (async () => {
                const errMsg =
                    await Repositories.emailVerificationRepository.verifyEmail(
                        code
                    );
                if (errMsg) {
                    setErrMsg(errMsg);
                } else {
                    setVerified(true);
                }
            })();
        }
    }, [code]);
    // if (code) {
    // }
    return (
        <div className="page-container grid place-items-center">
            {verified || errMsg ? (
                <div className="flex flex-col items-center  justify-center">
                    <h5 className="text-red-600">
                        {verified
                            ? "Email Verified!"
                            : errMsg
                            ? "Email Verification Failed!"
                            : ""}
                    </h5>
                    <span className="text-neutral-700 mb-2">{errMsg}</span>
                    {user ? (
                        <NavLink
                            to={ROUTES.home.fullPath}
                            className="button primary"
                        >
                            To Home
                        </NavLink>
                    ) : (
                        <NavLink
                            to={ROUTES.home.fullPath}
                            className="button primary"
                        >
                            To Login
                        </NavLink>
                    )}
                </div>
            ) : (
                <h5>Verifying your email...</h5>
            )}
        </div>
    );
}

export default VerifyEmail;
