import { useEffect } from "react";
import { useAuthState } from "../../../hooks/useAuthState";
import Statistics from "./Statistics";
import UsersTable from "./UsersTable";
import { ROUTES } from "../../../constants";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = useAuthState((st) => st.user);
  
    const navigate = useNavigate();
    useEffect(() => {
        if (user && !user.verified) {
            navigate(ROUTES.home.notVerified.fullPath);
        }
    }, [navigate, user]);
    return (
        <div className="page-container flex flex-col gap-4 ">
            <Statistics />
            <UsersTable />
        </div>
    );
}

export default Dashboard;
