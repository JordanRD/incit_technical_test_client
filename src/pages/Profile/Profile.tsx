import React, { useMemo, useState } from "react";
import { useAuthState } from "../../hooks/useAuthState";
import ModalChangePassword from "../../components/ModalChangePassword/ModalChangePassword";
import ModalUpdateUser from "../../components/ModalChangePassword/ModalChangePassword";

function Profile() {
    const [showModalChangePassword, setShowModalChangePassword] =
        useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);

    const user = useAuthState((v) => v.user);

    const infos = useMemo(() => {
        return [
            {
                title: "Name",
                desc: user?.name,
                action: (
                    <abbr title="change name">
                        <button
                            onClick={() => setShowModalUpdateUser(true)}
                            className="icon-button"
                        >
                            <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                    </abbr>
                ),
            },
            {
                title: "Email",
                desc: user?.email,
            },
        ];
    }, [user]);
    return (
        <div className="page-container grid place-items-center p-4">
            {showModalChangePassword && (
                <ModalChangePassword
                    onClose={() => setShowModalChangePassword(false)}
                />
            )}
            {showModalUpdateUser && (
                <ModalUpdateUser
                    onClose={() => setShowModalUpdateUser(false)}
                />
            )}
            <div className="flex flex-col p-4 gap-4 flex-grow bg-white rounded-md drop-shadow-md max-w-full w-[30rem] h-full">
                <h5>Profile</h5>
                {infos.map((info) => (
                    <div className="flex gap-4">
                        <div className="flex flex-col " key={info.title}>
                            <span className="font-medium ">{info.title}</span>
                            <span className="text-neutral-500">
                                {info.desc}
                            </span>
                        </div>
                        {info.action}
                    </div>
                ))}
                <div className="flex-grow"></div>
                <button
                    onClick={() => setShowModalChangePassword(true)}
                    className="button primary outlined"
                >
                    {user?.hasPassword ? "Change Password" : "Add Password"}
                </button>
            </div>
        </div>
    );
}

export default Profile;
