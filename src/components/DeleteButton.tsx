import { IconButton, SxProps, Theme } from "@mui/material"
import { RiDeleteBin6Line } from "react-icons/ri"

interface DeleteButtonProps {
    onClick: () => void
    sx?: SxProps<Theme>,
}

function DeleteButton({ sx, onClick }: DeleteButtonProps) {
    return <IconButton
        aria-label="delete"
        size="small"
        color="error"
        onClick={onClick}
        sx={sx}>
        <RiDeleteBin6Line />
    </IconButton>
}


export default DeleteButton