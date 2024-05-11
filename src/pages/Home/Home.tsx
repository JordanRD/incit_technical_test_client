import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
// import { useAuthState } from "../../hooks/useAuthState";
// import { isNil } from "lodash";

function Home() {
    // const noUser = useAuthState((st) => isNil(st.user));
    // if (noUser) return null;
    return (
        <div className="page-container flex flex-col bg-neutral-100 p-4 gap-4">
            <Sidebar />
            <Outlet />
        </div>
    );
}

export default Home;
