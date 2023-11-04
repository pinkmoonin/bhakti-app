import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";
import MantraPage from "../pages/MantraPage";
import BhajanPage from "../pages/BhajanPage";
import ReadingPage from "../pages/ReadingPage";
import LoginPage from "../pages/LoginPage";
import { useUserContext } from "../util/Auth";

const Root = () => {
    const userContext = useUserContext();

    if (userContext?.user) {
        return <Navigate to="/home/dashboard" replace={true} />
    } else {
        return <Navigate to="/login" replace={true} />
    }
}



const router = createBrowserRouter([
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