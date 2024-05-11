import { useGlobalLoadingState } from "../hooks/useGlobalLoadingState";

function GlobalLoading() {
    const loading = useGlobalLoadingState((st) => st.loading);
    if (loading)
        return (
            <div className="fixed z-50 bottom-0 top-0 left-0 right-0 h-full w-full bg-black/50 flex items-center justify-center">
                <div className="spinner animate-spin "> </div>
            </div>
        );
    return null;
}

export default GlobalLoading;
