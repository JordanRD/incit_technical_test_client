import { FormEvent, useCallback, useState } from "react";
import Modal from "../Modal";
import { toast } from "react-toastify";
import Repositories from "../../repositories/repositories";
import { useAuthState } from "../../hooks/useAuthState";
import { useGlobalLoadingState } from "../../hooks/useGlobalLoadingState";

type ModalProfileProps = {
    onClose: () => void;
};

function ModalChangePassword({ onClose }: ModalProfileProps) {
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const { user, getAndSetUser } = useAuthState((st) => st);
    const { loading, setLoading } = useGlobalLoadingState();

    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            // prevent spam click
            e.preventDefault();
            if (loading) return;
            if (user?.hasPassword && !oldPassword) {
                return toast.error("enter old password");
            }
            if (!password) {
                return toast.error("enter password");
            }
            if (confirmationPassword !== password)
                return toast.error("confirmation password does not match!");

            setLoading(true);
            const errMsg = await Repositories.userRepository.changePassword(
                password,
                oldPassword
            );
            //refresh user data
            setLoading(false);
            if (errMsg) {
                toast.error(errMsg);
            } else {
                getAndSetUser();
                toast.success("password updated!");
                onClose();
            }
        },
        [
            oldPassword,
            password,
            confirmationPassword,
            getAndSetUser,
            loading,
            onClose,
            setLoading,
            user,
        ]
    );

    return (
        <Modal
            onClose={onClose}
            className="flex flex-col rounded-md w-[30rem] max-w-full "
        >
            <div className="py-2 px-4 border-b flex items-center border-solid border-neutral-200">
                <h6>
                    {user?.hasPassword ? "Change Password" : "Add Password"}
                </h6>
                <div className="flex-grow"></div>
                <button onClick={onClose} className="icon-button">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col p-4 gap-4 flex-grow"
            >
                {user?.hasPassword && (
                    <div className="form-label">
                        <label htmlFor="password">Old Password*</label>
                        <input
                            autoFocus
                            required
                            className="input"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            id="password"
                            type="password"
                            autoComplete="current-password"
                        />
                    </div>
                )}
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
                <div className="form-label mb-4">
                    <label htmlFor="confirmation-password">
                        Confirmation Password*
                    </label>
                    <input
                        required
                        className="input"
                        value={confirmationPassword}
                        onChange={(e) =>
                            setConfirmationPassword(e.target.value)
                        }
                        id="confirmation-password"
                        type="password"
                        autoComplete="new-password"
                    />
                </div>
                <button type="submit" className="button contained primary">
                    {user?.hasPassword ? "Change Password" : "Add Password"}
                </button>
            </form>
        </Modal>
    );
}

export default ModalChangePassword;
