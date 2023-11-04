import { ThemeOptions, createTheme } from "@mui/material";

const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#ED5432',
        },
        secondary: {
            main: '#ff9b50',
        },
    },
};

const theme = createTheme(themeOptions);

export default theme;