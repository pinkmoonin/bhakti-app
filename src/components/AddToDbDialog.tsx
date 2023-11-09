import { CircularProgress, Dialog, DialogContent, Stack, Typography } from "@mui/material";


interface AddToDbDialogProps {
    show: boolean
}
export function AddToDbDialog({ show }: AddToDbDialogProps) {
    return <Dialog open={show}>
        <DialogContent>
            <Stack spacing={2} direction="row" alignItems="center">
                <CircularProgress />
                <Typography>Adding to database</Typography>
            </Stack>
        </DialogContent>
    </Dialog>
}