import React, { useMemo } from "react";
import { useDashboardState } from "./Dashboard-hooks/useDashboardState";
import classNames from "classnames";

const Statistics = React.memo(() => {
    const { averageUsersLast7Days, todaysUsersCount, usersCount } =
        useDashboardState((st) => st.dashboardStatistic);

    const statistics = useMemo(() => {
        return [
            {
                name: "Total User",
                value: usersCount,
                icon: "fa-solid fa-users",
            },
            {
                name: "Today's Active Users",
                value: todaysUsersCount,
                icon: "fa-solid fa-users",
            },
            {
                name: "Average Active Users Last 7 Days",
                value: averageUsersLast7Days,
                icon: "fa-solid fa-users",
            },
        ];
    }, [averageUsersLast7Days, todaysUsersCount, usersCount]);

    return (
        <div className="grid md:grid-cols-3 gap-4">
            {statistics.map((statistic) => (
                <div className="bg-white p-4 drop-shadow-sm gap-1 rounded-md flex flex-col justify-between">
                    <div className="flex flex-row items-center gap-4">
                        <span className="text-neutral-700 flex-grow">
                            {statistic.name}
                        </span>
                        <i
                            className={classNames(statistic.icon, "text-xl ")}
                        ></i>
                    </div>
                    <h4> {statistic.value} </h4>
                </div>
            ))}
            {/* <div className="bg-white p-4 drop-shadow-sm rounded-md flex flex-col">
                <span className="text-neutral-700">Active User Today</span>
                <h5> {todaysUsersCount} </h5>
            </div>
            <div className="bg-white p-4 drop-shadow-sm rounded-md flex flex-col">
                <span className="text-neutral-700">
                    Average Active User Last 7 Days
                </span>
                <h5> {averageUsersLast7Days} </h5>
            </div> */}
        </div>
    );
});

export default Statistics;
