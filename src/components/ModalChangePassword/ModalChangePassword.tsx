import { FormEvent, useCallback, useState } from "react";
import Modal from "../Modal";
import { toast } from "react-toastify";
import Repositories from "../../repositories/repositories";
import { useAuthState } from "../../hooks/useAuthState";
import { useGlobalLoadingState } from "../../hooks/useGlobalLoadingState";

type ModalProfileProps = {
    onClose: () => void;
};

function ModalUpdateUser({ onClose }: ModalProfileProps) {
    const { user, getAndSetUser } = useAuthState((st) => st);
    const [name, setName] = useState(() => user?.name || "");
    const { loading, setLoading } = useGlobalLoadingState();

    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            // prevent spam click
            e.preventDefault();
            if (loading) return;

            if (!name) {
                return toast.error("enter name");
            }

            setLoading(true);
            const errMsg = await Repositories.userRepository.updateUser({
                name,
            });
            //refresh user data
            setLoading(false);
            if (errMsg) {
                toast.error(errMsg);
            } else {
                getAndSetUser();
                toast.success("name updated!");
                onClose();
            }
        },
        [name, getAndSetUser, loading, onClose, setLoading]
    );

    return (
        <Modal
            onClose={onClose}
            className="flex flex-col rounded-md w-[30rem] max-w-full "
        >
            <div className="py-2 px-4 border-b flex items-center border-solid border-neutral-200">
                <h6>Update User Information</h6>
                <div className="flex-grow"></div>
                <button onClick={onClose} className="icon-button">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col p-4 gap-4 flex-grow"
            >
                <div className="form-label">
                    <label htmlFor="name">Name*</label>
                    <input
                        required
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        type="text"
                        autoComplete="name"
                    />
                </div>
                <button type="submit" className="button contained primary">
                    Update
                </button>
            </form>
        </Modal>
    );
}

export default ModalUpdateUser;
