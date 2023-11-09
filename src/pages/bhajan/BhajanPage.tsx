import { Alert, Box, Button, Dialog, Tabs, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment, Tab, TextField, Typography, useTheme, Card, CardMedia, Skeleton, CardContent, LinearProgress, Snackbar } from "@mui/material";
import AppToolbar from "../../components/AppToolbar";
import { MdAdd } from "react-icons/md";
import { SimpleDialogProps } from "../../components/SimpleDialog";
import { useState } from "react";
import { TabPanel, a11yProps } from "../../components/SimpleTab";
import { AiOutlineLink } from "react-icons/ai";
import { formatFileSize } from "../../util/formatFileSize";
import UploadFileButton from "../../components/UploadFileButton";
import { useFirestoreCollectionData } from "reactfire";
import { DocumentData, addDoc, collection, limit, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";


type BhajanInputs = {
    title: string,
    singer: string,
    imageUrl: string
    mediaUrl: string | null
    god: string
}


async function addBhajanToDb(bhajan: BhajanInputs, file: File | null) {
    if (file) {
        throw Error("File upload not supported.");
    }

    const data = {
        ...bhajan,
        god: bhajan.god.toLowerCase(),
        likeCount: 0,
        timestamp: serverTimestamp()
    }
    return await addDoc(collection(db, "bhajan"), data)
}


function AddBhajanDialog({ open, onClose }: SimpleDialogProps) {
    const theme = useTheme();
    const [bhajanFile, setBhajanFile] = useState<File | null>(null);
    const [selectedTab, setSelectedTab] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setError,
        resetField,
        clearErrors
    } = useForm<BhajanInputs>();

    /* const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        if (isLoading) {
            return;
        }
        setSelectedTab(newValue);
        if (newValue === 0) {
            clearErrors("mediaUrl");
            setBhajanFile(null);
        } else if (newValue === 1) {
            setFileError(false);
            resetField("mediaUrl");
        }
    }; */

    const [fileError, setFileError] = useState(false);

    const onSubmit: SubmitHandler<BhajanInputs> = async (data) => {
        try {
            setLoading(true);
            if (selectedTab === 0 && !data.mediaUrl) {
                setError('mediaUrl', { type: 'custom', message: 'Enter media URL' }, { shouldFocus: true });
                setFileError(false);
            } else if (selectedTab === 1 && !bhajanFile) {
                clearErrors("mediaUrl");
                setFileError(true);
            }
            await addBhajanToDb(data, bhajanFile);
            reset();
            enqueueSnackbar("Bhajan added successfully!", { variant: "success" });
            onClose('success');
        } catch (error) {
            console.log(error);
            enqueueSnackbar(`${error}`, { variant: "error" });
        } finally {
            setLoading(false);
        }

    };

    const handleFileChange = (file: (File | null)) => {
        setBhajanFile(file);
        setFileError(false);
    };

    return (
        <Dialog
            open={open}
            component='form'
            onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>Add Bhajan</DialogTitle>
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
                            id="title"
                            label="Title"
                            disabled={isLoading}
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
                            id="imageUrl"
                            disabled={isLoading}
                            label="Image URL"
                            variant="outlined"
                            {...register("imageUrl")} />
                    </Grid>

                    <Grid item xs={12}>
                        {/* <Tabs
                            value={selectedTab}
                            onChange={handleTabChange} aria-label="basic tabs example">
                            <Tab label="Paste URL" {...a11yProps(0)} />
                            <Tab label="Upload File" {...a11yProps(1)} />
                        </Tabs> */}

                        <TabPanel value={selectedTab} index={0}>
                            <TextField
                                fullWidth
                                required
                                id="mediaUrl"
                                disabled={isLoading}
                                error={errors.mediaUrl ? true : false}
                                helperText={errors.mediaUrl?.message ?? ''}
                                label="File URL"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AiOutlineLink />
                                        </InputAdornment>
                                    )
                                }}
                                {...register("mediaUrl")} />
                        </TabPanel>
                        <TabPanel value={selectedTab} index={1}>
                            {bhajanFile && <Alert
                                variant="outlined"
                                onClose={() => { setBhajanFile(null); }}
                                sx={{ height: "43px", display: "flex", alignItems: "center" }}>
                                <Typography component="span">{bhajanFile.name}</Typography>
                                <Typography
                                    component="span"
                                    color={theme.palette.text.secondary}
                                    variant="caption">
                                    {formatFileSize(bhajanFile.size)}
                                </Typography>
                            </Alert>}

                            {!bhajanFile && <UploadFileButton
                                disabled={isLoading}
                                accept=".mp3"
                                onFileChange={handleFileChange}
                            />}
                            {fileError && <Alert severity="error" sx={{ mt: 1 }}>Add a bhajan file!</Alert>}
                        </TabPanel>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={() => {
                        reset();
                        onClose('discard');
                    }}
                    disabled={isLoading}>
                    Discard
                </Button>

                <Button
                    variant="contained"
                    type="submit"
                    disabled={isLoading}>
                    Add
                </Button>
            </DialogActions>
        </Dialog >
    );
}

const q = query(collection(db, "bhajan"), orderBy('timestamp', 'desc'), limit(10));

const fakeData = Array(10).fill({
    title: '',
    imageUrl: '',
    mediaUrl: '',
    god: '',
    likeCount: 0, // Or any other default value
});


function BhajanPage() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { status, data } = useFirestoreCollectionData(q);

    const isLoading = status === "loading" || !data

    if (status === "error") {
        return <>Error.</>;
    }

    return (
        <Box>
            <AppToolbar>
                <Typography variant="h6">Bhajan</Typography>
                <Button
                    variant="contained"
                    startIcon={<MdAdd />}
                    onClick={() => { setDialogOpen(true); }}>
                    Add Bhajan
                </Button>
            </AppToolbar>

            <Grid container spacing={2}>
                {
                    isLoading ? fakeData.map((doc) => (
                        <Grid item key={doc.id} xs={6}>
                            <BhajanCard doc={doc} /></Grid>
                    )) : data.map((doc) => (
                        <Grid item key={doc.id} xs={2}>
                            <BhajanCard doc={doc} />
                        </Grid>)
                    )
                }
            </Grid>

            <AddBhajanDialog
                open={dialogOpen}
                onClose={() => {
                    setDialogOpen(false);
                }} />
        </Box>
    );
}

export default BhajanPage;


function BhajanCard({ doc }: DocumentData) {
    return <Card sx={{ width: '100%', minHeight: '100%', m: 0 }}>
        {doc.imageUrl ? (
            <CardMedia
                component="img"
                image={doc.imageUrl}
                alt="image"
                sx={{
                    height: 240,
                    aspectRatio: '2:3',
                    objectPosition: 'center'
                }}
            />
        ) : (
            <Skeleton variant="rectangular" height={256} animation="wave"
                sx={{ aspectRatio: '2:3' }} />
        )}
        <CardContent sx={{ pt: 1 }}>
            {doc.title ? (
                <Typography variant="subtitle2"
                    component="div"
                    textAlign="center"
                    textOverflow="ellipsis"
                    sx={{ whiteSpace: 'nowrap', overflow: 'hidden', }}>
                    {doc.title}
                </Typography>
            ) : (
                <Skeleton variant="text" width="80%" animation="wave" />
            )}
            {doc.singer ? (
                <Typography variant="body2"
                    textAlign='center'
                    color="text.secondary"
                    sx={{ fontSize: 12 }}>
                    {doc.singer}
                </Typography>
            ) : (
                <Skeleton variant="text" width="100%" animation="wave" />
            )}
        </CardContent>
    </Card>

}