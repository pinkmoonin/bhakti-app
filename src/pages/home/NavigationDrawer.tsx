import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Theme, Toolbar, Typography, styled, useTheme } from "@mui/material";
import { IconType } from "react-icons";
import { auth } from "../../firebase/firebase";
import { MdLogout } from "react-icons/md";

const drawerWidth = 240;

export type NavigationItem = {
    label: string,
    route: string,
    icon: IconType
};

interface NavigationProps {
    items: NavigationItem[],
    currentRoute: string,
    onItemClick: (route: string) => void
}

const NavigationList = styled(List)<{ component?: React.ElementType }>({
    '& .MuiListItemButton-root': {
        paddingLeft: 24,
        paddingRight: 24,
    },
    '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginRight: 16,
        fontSize: 20
    }
});


const NavigationListItem = styled(ListItem)<{ component?: React.ElementType, selected?: boolean }>(({ theme, selected }) => ({
    '& .MuiListItemText-root': {
        color: selected ? theme.palette.primary.main : theme.palette.text.secondary
    },
    '& .MuiListItemIcon-root': {
        color: selected ? theme.palette.primary.main : theme.palette.text.secondary
    }
}));


const StyledDrawer = styled(Drawer)(() => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
}));


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
        <StyledDrawer variant="permanent" anchor="left">
            <Toolbar>
                <Typography variant='h6' color={theme.palette.primary.main}>
                    Admin Panel
                </Typography>
            </Toolbar>
            <Divider />
            <NavigationList>
                {items.map((item) => (
                    <NavigationListItem disablePadding selected={currentRoute === item.route}>
                        <ListItemButton
                            onClick={() => { onItemClick(item.route) }}
                            selected={currentRoute === item.route}>
                            <ListItemIcon><item.icon /></ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </NavigationListItem>
                ))}
            </NavigationList>
            <List sx={{ height: '100%' }}></List>
            <Divider />
            <NavigationList>
                <NavigationListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon><MdLogout /></ListItemIcon>
                        <ListItemText primary="Log Out" />
                    </ListItemButton>
                </NavigationListItem>
            </NavigationList>
        </StyledDrawer>
    )
}

export default NavigationDrawer;