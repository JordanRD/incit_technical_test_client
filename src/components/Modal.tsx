import classNames from "classnames";
import { PropsWithChildren } from "react";

type ModalProps = PropsWithChildren<{
    className?: string;
    onClose?: () => void;
}>;

function Modal({ children, className, onClose }: ModalProps) {
    return (
        <div
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose?.();
                }
            }}
            tabIndex={-1}
            className="fixed inset-0 bg-neutral-500/50 z-30 grid place-items-center p-4"
        >
            <div className={classNames("bg-white", className)}>{children}</div>
        </div>
    );
}

export default Modal;
