import { Navigate, createHashRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import MantraPage from "../pages/mantra/MantraPage";
import BhajanPage from "../pages/bhajan/BhajanPage";
import ReadingPage from "../pages/story/ReadingPage";
import LoginPage from "../pages/login/LoginPage";
import { useUserContext } from "../util/Auth";

const Root = () => {
    const userContext = useUserContext();

    if (userContext?.user) {
        return <Navigate to="/home/dashboard" replace={true} />
    } else {
        return <Navigate to="/login" replace={true} />
    }
}



const router = createHashRouter([
    {
        path: "/",
        element: <Root />,
    },
    {
        path: "home",
        element: <HomePage />,
        children: [
            {
                path: "dashboard",
                element: <DashboardPage />
            },
            {
                path: "mantra",
                element: <MantraPage />
            },
            {
                path: "bhajan",
                element: <BhajanPage />
            },
            {
                path: "reading",
                element: <ReadingPage />
            },
        ]
    },
    {
        path: "login",
        element: <LoginPage />,
    },
]);

export default router;