import React, { useEffect } from "react";
import { useDashboardState } from "./Dashboard-hooks/useDashboardState";
import { useAuthState } from "../../../hooks/useAuthState";
import moment from "moment";
import { DATE_FORMAT } from "../../../constants";
import { useGlobalLoadingState } from "../../../hooks/useGlobalLoadingState";

const UsersTable = React.memo(() => {
    const { dashboardUsers, getUserDashboard, reset } = useDashboardState();
    // console.log("🚀 > UsersTable > dashboardUsers:", dashboardUsers)
    const user = useAuthState((v) => v.user);
    const setLoading = useGlobalLoadingState((st) => st.setLoading);
    useEffect(() => {
        if (user?.verified) {
            (async () => {
                setLoading(true);
                await getUserDashboard();
                setLoading(false);
            })();
        }
        return () => {
            reset();
        };
    }, [getUserDashboard, user, reset, setLoading]);

    return (
        <div className="bg-white drop-shadow-sm rounded-md flex flex-col w-full ">
            <div className="flex flex-row p-4">
                <h5>Users</h5>
            </div>
            <div className="w-full overflow-x-auto">
                <table className="w-full ">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Login Count</th>
                            <th>Logout Date</th>
                            <th>Sign Up Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboardUsers.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.login_count ?? "-"}</td>
                                    <td>
                                        {user.logout_at
                                            ? moment(user.logout_at).format(
                                                  DATE_FORMAT.display
                                              )
                                            : "-"}
                                    </td>
                                    <td>
                                        {user.created_at
                                            ? moment(user.created_at).format(
                                                  DATE_FORMAT.display
                                              )
                                            : "-"}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default UsersTable;
