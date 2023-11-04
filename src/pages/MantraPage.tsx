import {
    Box, Button, Dialog, DialogTitle, DialogActions,
    Grid, Table, TableBody, TableCell, TableContainer,
    TablePagination, TableHead, TableRow, TextField, Toolbar, Typography,
    DialogContent, Alert, IconButton, styled
} from "@mui/material";

import { useState } from "react";

import { MdAdd, MdCloudUpload } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { SimpleDialogProps } from "../components/SimpleDialog";
import AppToolbar from "../components/AppToolbar";

function createData(title: string, singer: string, lyrics: string) {
    return { title, singer, lyrics };
}


const rows = [

    createData('Hare Krishna Hare Ram', 'ISKCON', 'Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare, Hare Rama, Hare Rama, Rama Rama, Hare Hare'),
    createData('Om Namah Shivaya', 'Various Artists', 'Om Namah Shivaya'),
    createData('Gayatri Mantra', 'Anuradha Paudwal', 'Om Bhur Bhuva Swaha, Tat Savitur Varenyam, Bhargo Devasya Dheemahi, Dhiyo Yo Nah Prachodayat'),
    createData('Jai Ganesh Deva', 'Anuradha Paudwal', 'Jai Ganesh, Jai Ganesh, Jai Ganesh Deva, Mata Jaki Parvati, Pita Mahadeva'),
    createData('Vande Mataram', 'Lata Mangeshkar', 'Vande Mataram, Sujalam Sufalam, Malayaj Sheetalam, Shasyashyamalam'),
    createData('Hanuman Chalisa', 'Gulshan Kumar', 'Shri Guru Charan Saroj Raj, Nij Man Mukar Sudhari, Barnau Raghuvar Bimal Jasu, Jo Dayaku Phal Chari'),
    createData('Om Shanti Om', 'Karunesh', 'Om Shanti Om, Shanti Shanti Om'),
    createData('Krishna Das', 'Krishna Das', 'Hare Krishna Hare Ram, Ram Ram Hare Hare'),
    createData('Sri Venkateshwara Suprabhatam', 'MS Subbulakshmi', 'Kowsalya Supraja Rama Purva Sandhya Pravarthate, Uthishta Narasardoola, Karthavyam Daivamahnikam'),
    createData('Shiva Tandava Stotram', 'Ravana', 'Jatatavigalajjala pravahapavitasthale, Galeavalambya lambitam bhujangatungamalikam'),

];


function MantraTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8); // You can set the default number of rows per page.

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <TableContainer>
                <Table sx={{ minWidth: 650, mt: 1 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell >Singer</TableCell>
                            <TableCell >Lyrics</TableCell>
                            <TableCell >Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow
                                key={row.title}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell >{row.singer}</TableCell>
                                <TableCell >{row.lyrics}</TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="delete" size="small" color="error">
                                        <RiDeleteBin6Line />
                                    </IconButton>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={rows.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        </>
    );
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


function AddMantraDialog({ open, onClose }: SimpleDialogProps) {
    const [mantraFile, setMantraFile] = useState<File | null>(null);

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Add Mantra</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ pt: 1 }}>
                    <Grid item xs={12}>
                        <TextField fullWidth id="outlined-basic" label="Title" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth id="outlined-basic" label="Singer" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            id="outlined-basic"
                            label="Lyrics"
                            variant="outlined" />
                    </Grid>

                    <Grid item xs={12}>
                        {mantraFile && <Alert onClose={() => {
                            setMantraFile(null);
                        }}>{mantraFile.name}</Alert>}

                        {!mantraFile && <Button component="label" variant="contained" startIcon={<MdCloudUpload />}>
                            Upload file
                            <VisuallyHiddenInput type="file" onChange={(event) => {
                                if (event.target.files && event.target.files.length > 0) {
                                    setMantraFile(event.target.files[0]);
                                } else {
                                    setMantraFile(null);
                                }
                            }

                            } />
                        </Button>
                        }

                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={() => {
                    onClose('discard');
                }}>Discard</Button>
                <Button variant="contained">Add</Button>
            </DialogActions>
        </Dialog >
    );
}


function MantraPage() {
    const [dialogOpen, setDialogOpen] = useState(false);

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

            <MantraTable />
            <AddMantraDialog open={dialogOpen} onClose={(reason) => {
                if (reason === 'discard') {
                    setDialogOpen(false);
                }
            }} />
        </Box>
    );
}

export default MantraPage;