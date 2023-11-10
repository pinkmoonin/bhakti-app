import { Box } from '@mui/material';
import { GiMeditation } from 'react-icons/gi'
import { useUserContext } from '../../util/Auth';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { HiMiniBookOpen } from "react-icons/hi2"
import { BiSolidDashboard } from "react-icons/bi"
import { RiFileMusicFill } from "react-icons/ri"
import NavigationDrawer, { NavigationItem } from './NavigationDrawer';

const navItems: NavigationItem[] = [
    {
        label: "Dashboard",
        route: "/home/dashboard",
        icon: BiSolidDashboard
    },
    {
        label: "Reading",
        route: "/home/reading",
        icon: HiMiniBookOpen
    },
    {
        label: "Mantra",
        route: "/home/mantra",
        icon: GiMeditation
    },
    {
        label: "Bhajan",
        route: "/home/bhajan",
        icon: RiFileMusicFill
    }
]

function HomePage() {
    const currentUser = useUserContext();
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavItemClick = (route: string) => { navigate(route); };

    if (!currentUser?.user) {
        return <Navigate to="/login" replace={true} />;
    }

    return (
        <Box sx={{ display: "flex" }}>
            <NavigationDrawer
                items={navItems}
                currentRoute={location.pathname}
                onItemClick={handleNavItemClick} />

            <Box component="main" sx={{ flexGrow: 1, pl: 4, pr: 4 }}>
                <Outlet />
            </Box>
        </Box>
    );
}

export default HomePage;