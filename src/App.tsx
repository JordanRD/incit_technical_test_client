import {  HashRouter } from "react-router-dom";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";

import "react-toastify/ReactToastify.min.css";
import Authenticator from "./handlers/Authenticator";
import GlobalLoading from "./components/GlobalLoading";

function App() {
    return (
        <HashRouter>
            <ToastContainer
                pauseOnFocusLoss={false}
                // limit={3}
                // stacked
                newestOnTop={true}
                autoClose={2500}
            />
            <GlobalLoading/>
            <Authenticator />
            <Routes />
        </HashRouter>
    );
}

export default App;
