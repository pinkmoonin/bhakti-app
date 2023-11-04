import styled from "@emotion/styled";
import { Toolbar } from "@mui/material";
import { ReactNode } from "react";

type AppToolbarProps = {
    children: ReactNode;
};

const AppToolbar = (props: AppToolbarProps) => (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {props.children}
    </Toolbar>
);

export default AppToolbar;