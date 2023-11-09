import { Box, Button, Dialog, DialogContent, DialogTitle, DialogActions, Grid, TextField, Card, CardMedia, CardContent, Typography, Skeleton, Toolbar, ImageList, Stack } from "@mui/material";
import { SimpleDialogProps } from "../../components/SimpleDialog";
import { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from "react-hook-form";
import { db } from "../../firebase/firebase";
import { collection, serverTimestamp, addDoc, onSnapshot, query, orderBy, limit, DocumentData } from "firebase/firestore";
import { useFirestoreCollectionData } from "reactfire";
import { MdAdd } from "react-icons/md";
import styled from "@emotion/styled";
import AppToolbar from "../../components/AppToolbar";
import { url } from "inspector";

type StoryInputs = {
    title: string,
    imageUrl: string
    content: string
    god: string
}

type Story = {
    id: string,
    title: string,
    imageUrl: string
    content: string
    god: string,
    likeCount: number
}

async function addStoryToDb(story: StoryInputs) {
    const data = {
        ...story,
        god: story.god.toLowerCase(),
        likeCount: 0,
        timestamp: serverTimestamp()
    }
    return await addDoc(collection(db, "story"), data)
}

function AddStoryDialog({ open, onClose }: SimpleDialogProps) {

    const {
        register,
        handleSubmit,
        reset
    } = useForm<StoryInputs>();

    const onSubmit: SubmitHandler<StoryInputs> = async (data) => {
        try {
            await addStoryToDb(data);
            reset();
            onClose('success');
        } catch (error) {
            console.log(error);
        }

    };


    return (
        <Dialog
            onClose={() => { }}
            open={open}
            component='form'
            onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>Add Story</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ pt: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            variant="outlined"
                            {...register("title")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="imageUrl"
                            label="Image URL"
                            variant="outlined"
                            {...register("imageUrl")} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            multiline
                            rows={4}
                            id="content"
                            label="Content"
                            variant="outlined"
                            {...register("content")} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="god"
                            label="God"
                            variant="outlined"
                            {...register("god")} />
                    </Grid>

                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={() => {
                    reset();
                    onClose('discard');
                }}>Discard</Button>
                <Button
                    variant="contained"
                    type="submit"
                >Add</Button>
            </DialogActions>
        </Dialog>
    );
}


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

    const { status, data } = useFirestoreCollectionData(q);

    const isLoading = status === "loading" || !data;

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
                            <StoryCard doc={doc} />
                        </Grid>)
                    )
                }
            </Grid>

            <AddStoryDialog
                open={dialogOpen}
                onClose={(reason) => {
                    setDialogOpen(false);

                }} />
        </Box >

    );
}

export default ReadingPage;

function StoryCard({ doc }: DocumentData) {
    return <Card sx={{ width: '100%', minHeight: '100%' }}>
        {doc.imageUrl ? (<Box sx={{
            background: `linear-gradient(180deg, 
                rgba(0,0,0, 0.4), 
                rgba(0,0,0, 0.0)), url(${doc.imageUrl});`,
            backgroundSize: "cover",
            height: 256,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center"

        }}>
            <Typography
                variant="subtitle1"
                color="white"
                textAlign="center"
                sx={{ textShadow: "1px 2px #000", pt: 1 }}>
                {doc.title}
            </Typography>
        </Box>) : (
            <Skeleton variant="rectangular" height={256} animation="wave" />
        )}
        <CardContent sx={{ pt: 0.5 }}>
            {doc.timestamp ? (
                <Typography
                    variant="overline"

                    fontSize={10.5}
                    color="text.secondary">
                    {doc.timestamp.toDate().toDateString()}
                </Typography>
            ) : (
                <Skeleton variant="text" width="80%" animation="wave" />
            )}


            {doc.content ? (
                <Typography variant="body2" >
                    {doc.content}
                </Typography>
            ) : (
                <Skeleton variant="text" width="100%" animation="wave" />
            )}
        </CardContent>

    </Card>

}