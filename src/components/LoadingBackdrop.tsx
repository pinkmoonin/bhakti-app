import { Backdrop, CircularProgress } from "@mui/material"

interface LoadingBackdropProps {
    open: boolean
}

function LoadingBackdrop({ open }: LoadingBackdropProps) {
    return (
        <Backdrop
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}>
            <CircularProgress />
        </Backdrop>
    );
}

export default LoadingBackdrop;