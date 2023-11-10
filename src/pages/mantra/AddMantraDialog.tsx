import {
    Alert, Button, Dialog, DialogActions,
    DialogContent, DialogTitle, Grid,
    InputAdornment,
    LinearProgress, TextField, Typography, useTheme
} from "@mui/material";
import { useState } from "react";
import { SimpleDialogProps } from "../../components/SimpleDialog";
import UploadFileButton from "../../components/UploadFileButton";
import { formatFileSize } from "../../util/formatFileSize";
import { useSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";
import { addMantraToDb } from "./addMantraToDb";
import { AiOutlineLink } from "react-icons/ai";


export interface MantraInputs {
    god: string,
    title: string,
    singer: string,
    imageUrl: string,
    lyrics: string
}

function AddMantraDialog({ open, onClose }: SimpleDialogProps) {
    const theme = useTheme();
    const [mantraFile, setMantraFile] = useState<File | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [fileError, setFileError] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const { register, handleSubmit, reset } = useForm<MantraInputs>();

    const handleFileChange = (file: File | null) => {
        setMantraFile(file);
        if (file) {
            setFileError(false);
        }
    }

    const onSubmit: SubmitHandler<MantraInputs> = async (data) => {
        try {
            if (!mantraFile) {
                setFileError(true);
                return;
            }

            setLoading(true);
            await addMantraToDb(data, mantraFile);
            reset();
            setFileError(false);
            setMantraFile(null);
            onClose('success');
            enqueueSnackbar("Mantra added successfully!", { variant: "success" });
        } catch (error) {
            console.log(error);
            enqueueSnackbar(`${error}`, { variant: "error" });
        } finally {
            setLoading(false);
        }

    };

    return (
        <Dialog open={open} component="form" onSubmit={handleSubmit(onSubmit)}>

            <DialogTitle>Add Mantra</DialogTitle>
            {isLoading && <LinearProgress />}
            <DialogContent>
                <Grid container spacing={2} sx={{ pt: 1 }}>
                    <Grid item xs={12}>
                        <TextField required
                            fullWidth
                            disabled={isLoading}
                            id="god"
                            label="God"
                            variant="outlined"
                            {...register("god")} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required
                            fullWidth
                            disabled={isLoading}
                            id="title"
                            label="Title"
                            variant="outlined"
                            {...register("title")} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required
                            fullWidth
                            disabled={isLoading}
                            id="singer"
                            label="Singer"
                            variant="outlined"
                            {...register("singer")} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            disabled={isLoading}
                            multiline
                            rows={4}
                            id="lyrics"
                            label="Lyrics"
                            variant="outlined"
                            {...register("lyrics")} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            disabled={isLoading}
                            id="imageUrl"
                            label="Image URL"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AiOutlineLink />
                                    </InputAdornment>
                                )
                            }}
                            {...register("imageUrl")} />
                    </Grid>

                    <Grid item xs={12}>
                        {mantraFile && <Alert
                            variant="outlined"
                            onClose={() => {
                                setMantraFile(null);
                            }}
                            sx={{ height: '43px', display: 'flex', alignItems: 'center' }}
                        >
                            <Typography component="span">{mantraFile.name} </Typography>
                            <Typography
                                component="span"
                                color={theme.palette.text.secondary}
                                variant="caption">{formatFileSize(mantraFile.size)}</Typography>
                        </Alert>}

                        {!mantraFile && <UploadFileButton
                            disabled={isLoading}
                            accept=".mp3"
                            onFileChange={handleFileChange}
                        />}
                        {fileError && <Alert severity="error" sx={{ mt: 1 }}>Please add mantra file</Alert>}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    disabled={isLoading}
                    onClick={() => { onClose('discard'); }}>
                    Discard
                </Button>

                <Button
                    variant="contained"
                    type="submit"
                    disabled={isLoading}>Add</Button>
            </DialogActions>
        </Dialog >
    );
}

export default AddMantraDialog;