import {Route, Routes} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import {AuthGuard} from "./auth/authenticate";
import Logout from "./pages/logout/Logout";
import Profile from "./pages/profile/Profile";
import Index from "./pages/index/Index";
import Redirect from "./pages/redirect/Redirect";
import NotFound from "./pages/404/NotFound.tsx";
import {ErrorBoundary} from "react-error-boundary";
import FallBackUI from "./pages/fall_back_ui/FallBackUI.tsx";

const App = () => {
    return (
        <>
            <ErrorBoundary
                fallbackRender={FallBackUI}
                onReset={() => location.reload()}
            >
                <Routes>
                    <Route path="/" element={<Index/>}/>
                    <Route
                        path="/dashboard"
                        element={
                            <AuthGuard>
                                <Dashboard/>
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <AuthGuard>
                                <Profile/>
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/logout"
                        element={
                            <AuthGuard>
                                <Logout/>
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/:alias"
                        element={
                            <Redirect/>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <NotFound/>
                        }
                    />
                </Routes>
            </ErrorBoundary>
        </>
    );
};

export default App;
