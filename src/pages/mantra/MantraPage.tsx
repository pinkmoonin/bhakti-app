import { Backdrop, Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { MdAdd } from 'react-icons/md'
import AppToolbar from "../../components/AppToolbar";
import MantraTable from "./MantraTable";
import AddMantraDialog from "./AddMantraDialog";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useFirestoreCollectionData } from "reactfire";
import { deleteMantraFromDb } from "./addMantraToDb";
import LoadingTableSkeleton from "./LoadingTableSkeleton";

function buildFirestoreQuery(page: number, rowsPerPage: number) {
    return query(
        collection(db, "mantra"),
        orderBy('timestamp', 'desc'),
        limit(rowsPerPage)
    );
}


export const DEFAULT_ITEMS_PER_PAGE = 10;


function MantraPage() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
    const { status, data } = useFirestoreCollectionData(buildFirestoreQuery(page, rowsPerPage), { idField: "id" });

    const [openBackdrop, setOpenBackdrop] = useState(false);

    const handleChangeRowsPerPage = (rowsPerPage: number) => {
        setRowsPerPage(rowsPerPage);
        setPage(0);
    };

    const handleDeleteMantra = async (mantraId: string) => {
        try {
            setOpenBackdrop(true);
            await deleteMantraFromDb(mantraId);
        } catch (error) {
            console.log(error);
        } finally {
            setOpenBackdrop(false);
        }
    };
    let componentToRender;
    switch (status) {
        case 'loading':
            componentToRender = <LoadingTableSkeleton />;
            break;
        case 'success':
            componentToRender = <MantraTable
                data={data}
                onDeleteClick={handleDeleteMantra}
                onPageChange={setPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                page={page}
                rowsPerPage={rowsPerPage}
            />
            break;
        case 'error':
            componentToRender = <div>Error Component</div>;
            break;
        default:
            componentToRender = <div>Default Component</div>;
    }

    return (
        <Box>
            <AppToolbar>
                <Typography variant="h6">Mantra</Typography>
                <Button
                    variant="contained"
                    startIcon={<MdAdd />}
                    onClick={() => { setDialogOpen(true); }}>
                    Add Mantra
                </Button>
            </AppToolbar>
            {componentToRender}
            <AddMantraDialog open={dialogOpen} onClose={() => { setDialogOpen(false); }} />
            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}>
                <CircularProgress />
            </Backdrop>
        </Box>
    );
}

export default MantraPage;