import {
    Avatar, Box, IconButton, Stack,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TablePagination, TableRow, styled,
    tableCellClasses
} from "@mui/material";

import { DocumentData } from "firebase/firestore";
import React from "react";

import { RiDeleteBin6Line } from "react-icons/ri";
import { DEFAULT_ITEMS_PER_PAGE } from "./MantraPage";
import { DataGrid } from "@mui/x-data-grid";
import DeleteButton from "../../components/DeleteButton";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.text.secondary,
        fontSize: 12.5,
        fontWeight: 700
    },
    [`&.${tableCellClasses.body}`]: {
        color: theme.palette.text.primary,
        fontSize: 14,
    },
}));


export interface MantaTableProps {
    data: DocumentData[],
    page: number,
    rowsPerPage: number,
    onPageChange: (page: number) => void,
    onRowsPerPageChange: (page: number) => void,
    onDeleteClick: (mantraId: string) => void
}

type LyricsProps = { lyrics?: string; };

const LyricsText = ({ lyrics }: LyricsProps) => {
    return (
        <div>
            <i>{lyrics ? lyrics.replaceAll("\\n", "\n") : ''}</i>
        </div>
    );
};


function MantraTable({ data, page, rowsPerPage, onPageChange, onRowsPerPageChange, onDeleteClick }: MantaTableProps) {

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        onPageChange(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onRowsPerPageChange(parseInt(event.target.value, DEFAULT_ITEMS_PER_PAGE));
    };

    const isEmpty = data.length === 0;

    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>

            <TableContainer sx={{ maxHeight: '80vh' }}>
                <Table sx={{ minWidth: 650, mt: 1 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell ></TableCell>
                            <StyledTableCell >Title</StyledTableCell>
                            <StyledTableCell >Lyrics</StyledTableCell>
                            <StyledTableCell >Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            isEmpty ? (<TableRow>
                                <TableCell sx={{ height: "65vh" }} align="center" colSpan={4}>No records found</TableCell>
                            </TableRow>)
                                : data.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>
                                            <Avatar component="span"
                                                sx={{ borderRadius: 2 }}
                                                alt="Image"
                                                src={row.imageUrl}
                                                variant="square" />
                                        </TableCell>
                                        <StyledTableCell>
                                            <Stack>
                                                <div>{row.title}</div>
                                                <div
                                                    color="text.secondary"
                                                    style={{ fontSize: 12 }}>
                                                    {row.singer}
                                                </div>
                                            </Stack>
                                        </StyledTableCell>
                                        <StyledTableCell >
                                            <LyricsText lyrics={row.lyrics} />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <DeleteButton onClick={() => { onDeleteClick(row.id); }} />
                                        </StyledTableCell>

                                    </TableRow>
                                ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={data.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ mt: 2 }}
            />
        </Box>
    );
}

export default MantraTable;
