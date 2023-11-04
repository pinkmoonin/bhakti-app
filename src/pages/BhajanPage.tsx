import { Box, Button, Typography } from "@mui/material";
import AppToolbar from "../components/AppToolbar";
import { MdAdd } from "react-icons/md";

function BhajanPage() {
    return (
        <Box>
            <AppToolbar>
                <Typography variant="h6">Bhajan</Typography>
                <Button
                    variant="contained"
                    startIcon={<MdAdd />}
                    onClick={() => {

                    }}>
                    Add Bhajan
                </Button>
            </AppToolbar>

        </Box>
    );
}

export default BhajanPage;