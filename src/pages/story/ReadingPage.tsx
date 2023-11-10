import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { useFirestoreCollectionData } from "reactfire";
import { MdAdd } from "react-icons/md";
import AppToolbar from "../../components/AppToolbar";
import { useSnackbar } from "notistack";
import LoadingBackdrop from "../../components/LoadingBackdrop";
import StoryCard from "./StoryCard";
import { deleteStoryFromDb } from "./addStoryToDb";
import AddStoryDialog from "./AddStoryDialog";

const q = query(collection(db, "story"), orderBy('timestamp', 'desc'), limit(10));

const fakeData = Array(8).fill({
    title: '',
    imageUrl: '',
    content: '',
    god: '',
    likeCount: 0, // Or any other default value
});

function ReadingPage() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { status, data } = useFirestoreCollectionData(q, { idField: "id" });
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const isLoading = status === "loading" || !data;

    const handleDeleteClick = async (storyId: string) => {
        try {
            setOpenBackdrop(true);
            await deleteStoryFromDb(storyId);
            enqueueSnackbar({ variant: "success", message: "Story deleted successfully!" });
        } catch (error) {
            console.log(error);
            enqueueSnackbar({ variant: "success", message: "" + error });
        } finally {
            setOpenBackdrop(false);
        }
    };

    if (status === "error") {
        return <>Error.</>;
    }

    return (

        <Box >
            <AppToolbar>
                <Typography variant="h6">Reading</Typography>
                <Button
                    variant="contained"
                    startIcon={<MdAdd />}
                    onClick={() => { setDialogOpen(true); }}>
                    Add Story
                </Button>
            </AppToolbar>

            <Grid container spacing={3}>
                {
                    isLoading ? fakeData.map((doc) => (
                        <Grid item key={doc.id} xs={3}>
                            <StoryCard doc={doc} /></Grid>
                    )) : data.map((doc) => (
                        <Grid item key={doc.id} xs={3}>
                            <StoryCard doc={doc} onDeleteClick={handleDeleteClick} />
                        </Grid>)
                    )
                }
            </Grid>

            <AddStoryDialog
                open={dialogOpen}
                onClose={() => { setDialogOpen(false); }} />

            <LoadingBackdrop open={openBackdrop} />
        </Box >
    );
}

export default ReadingPage;