import { SubmitHandler, useForm } from "react-hook-form";
import { SimpleDialogProps } from "../../components/SimpleDialog";
import { addStoryToDb } from "./addStoryToDb";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";

export type StoryInputs = {
    title: string,
    imageUrl: string
    content: string
    god: string
}


function AddStoryDialog({ open, onClose }: SimpleDialogProps) {
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm<StoryInputs>();

    const onSubmit: SubmitHandler<StoryInputs> = async (data) => {
        try {
            setLoading(true);
            await addStoryToDb(data);
            reset();
            onClose('success');
            enqueueSnackbar("Story added successfully!", { variant: "success" },);
        } catch (error) {
            console.log(error);
            enqueueSnackbar(`${error}`, { variant: "error" });
        } finally {
            setLoading(false);
        }

    };

    return (
        <Dialog
            open={open}
            component='form'
            onSubmit={handleSubmit(onSubmit)}>

            <DialogTitle>Add Story</DialogTitle>
            {isLoading && <LinearProgress />}

            <DialogContent>
                <Grid container spacing={2} sx={{ pt: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            disabled={isLoading}
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
                            disabled={isLoading}
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
                            disabled={isLoading}
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
                            disabled={isLoading}
                            id="god"
                            label="God"
                            variant="outlined"
                            {...register("god")} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={isLoading}
                    variant="outlined" onClick={() => {
                        reset();
                        onClose('discard');
                    }}>Discard</Button>
                <Button
                    disabled={isLoading}
                    variant="contained"
                    type="submit">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddStoryDialog;