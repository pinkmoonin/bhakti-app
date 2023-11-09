import {
    Box, Divider, Drawer,
    List, ListItem, ListItemButton,
    ListItemIcon, ListItemText,
    Toolbar, Typography, useTheme
} from '@mui/material';

import { GiMeditation } from 'react-icons/gi'
import { LuLayoutDashboard } from 'react-icons/lu'
import { BsFileMusic, BsBook } from 'react-icons/bs'
import { MdLogout } from 'react-icons/md'
import { auth } from '../../firebase/firebase';
import { useUserContext } from '../../util/Auth';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { IconType } from 'react-icons/lib';

const drawerWidth = 240;

type NavigationItem = {
    label: string,
    route: string,
    icon: IconType
};

interface NavigationProps {
    items: NavigationItem[],
    currentRoute: string,
    onItemClick: (route: string) => void
}

function NavigationDrawer({ items, currentRoute, onItemClick }: NavigationProps) {
    const theme = useTheme();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            console.log("logged out");
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >

            <Toolbar>
                <Typography variant='h6' color={theme.palette.primary.main}>
                    Admin Panel
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {items.map((item) => (
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => { onItemClick(item.route) }}
                            selected={currentRoute === item.route}>
                            <ListItemIcon><item.icon /></ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <List sx={{ height: '100%' }}></List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon><MdLogout /></ListItemIcon>
                        <ListItemText primary="Log Out" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}


const navItems: NavigationItem[] = [
    {
        label: "Dashboard",
        route: "/home/dashboard",
        icon: LuLayoutDashboard
    },
    {
        label: "Reading",
        route: "/home/reading",
        icon: BsBook
    },
    {
        label: "Mantra",
        route: "/home/mantra",
        icon: GiMeditation
    },
    {
        label: "Bhajan",
        route: "/home/bhajan",
        icon: BsFileMusic
    }
]

function HomePage() {
    const currentUser = useUserContext();
    const location = useLocation();
    const navigate = useNavigate();

    if (!currentUser?.user) {
        return <Navigate to="/login" replace={true} />;
    }

    return (
        <Box sx={{ display: "flex" }}>
            <NavigationDrawer
                items={navItems}
                currentRoute={location.pathname}
                onItemClick={(route) => {
                    navigate(route);
                }} />

            <Box component="main" sx={{ flexGrow: 1, pl: 4, pr: 4 }}>
                <Outlet />
            </Box>
        </Box>
    );
}

export default HomePage;