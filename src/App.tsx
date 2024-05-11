import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";

import "react-toastify/ReactToastify.min.css";
import Authenticator from "./handlers/Authenticator";
import GlobalLoading from "./components/GlobalLoading";

function App() {
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
}

export default App;
