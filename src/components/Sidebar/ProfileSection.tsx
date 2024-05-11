import React, { useCallback, useMemo, useRef, useState } from "react";
import { useAuthState } from "../../hooks/useAuthState";
import FloatingDropdown from "../FloatingDropdown";
import classNames from "classnames";
import Repositories from "../../repositories/repositories";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useGlobalLoadingState } from "../../hooks/useGlobalLoadingState";

function ProfileSection() {
    const { user } = useAuthState();
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const { loading, setLoading } = useGlobalLoadingState();

    const handleLogout = useCallback(async () => {
        if (loading) return;
        setLoading(true);
        await Repositories.userRepository.logout();
        setLoading(false);
        window.location.reload();
    }, [loading, setLoading]);

    const menus = useMemo(() => {
        return [
            {
                name: "Profile",
                icon: "fa-regular fa-user",
                onClick: () => {
                    navigate(ROUTES.home.profile.fullPath);
                    setDropdownOpen(false);
                },
            },
            {
                name: "Logout",
                icon: "fa-solid fa-arrow-right-from-bracket text-red-600",
                onClick: handleLogout,
            },
        ];
    }, [handleLogout, navigate]);

    return (
        <React.Fragment>
            <button
                onClick={() => {
                    setDropdownOpen((p) => !p);
                }}
                ref={anchorRef}
                className="hover:drop-shadow-sm h-full duration-100 transition-all active:bg-neutral-100 flex flex-row items-center gap-4 bg-neutral-50 rounded-lg py-2 px-4"
            >
                <i
                    className={classNames(
                        "fa-solid fa-chevron-down scale-75 transition-all duration-200 ",
                        {
                            "rotate-180": dropdownOpen,
                        }
                    )}
                ></i>
                <div className="flex-col items-end hidden sm:flex">
                    <span className="font-medium">{user?.name || "-"}</span>
                    <small className="tiny">{user?.email || "-"}</small>
                </div>
                <i className="fa-regular fa-user"></i>
            </button>
            {dropdownOpen && (
                <FloatingDropdown
                    onOutsideClick={() => setDropdownOpen(false)}
                    anchorRef={anchorRef}
                    className=" flex flex-col"
                >
                    {menus.map((menu) => (
                        <button
                            onClick={menu.onClick}
                            className="px-4 py-2 border-b hover:bg-neutral-50 active:bg-neutral-100 flex gap-3 items-center text-sm border-neutral-200 border-solid last:border-b-0"
                        >
                            <i className={menu.icon}></i>
                            {menu.name}
                        </button>
                    ))}
                </FloatingDropdown>
            )}
        </React.Fragment>
    );
}

export default ProfileSection;
