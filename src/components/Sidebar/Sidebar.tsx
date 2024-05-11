import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";
import classNames from "classnames";
import ProfileSection from "./ProfileSection";
import React from "react";

const tabs = [
    {
        name: "Dashboard",
        to: ROUTES.home.dashboard.fullPath,
    },
];

const Sidebar = React.memo(() => {
    return (
        <div className="flex flex-row h-[5rem]  p-2 gap-4 justify-center items-center bg-white drop-shadow-sm z-20 sticky top-4 rounded-lg">
            {/* <div className="flex-grow"></div> */}
            <ul className="flex flex-row gap-4 items-center px-4">
                {tabs.map((tab) => (
                    <li key={tab.name}>
                        <Link
                            className={classNames(
                                "p-1 rounded-lg inline-block font-medium items-center "
                            )}
                            to={tab.to}
                        >
                            {tab.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="flex-grow"></div>
            <ProfileSection />
        </div>
    );
});

export default Sidebar;
