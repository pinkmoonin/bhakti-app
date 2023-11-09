import {
    Box, Skeleton, Stack, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography
} from "@mui/material";

interface CeneteredSkeletonProps {
    width?: string | number
    height?: string | number
    variant?: "text" | "rectangular" | "rounded" | "circular",
    fontSize?: number
    centered?: boolean
}

const CustomSkeleton = ({ fontSize, variant, width: w, height: h, centered }: CeneteredSkeletonProps) => (
    <Typography fontSize={fontSize}>
        <Box display="flex" justifyContent={centered ? "center" : "start"} alignItems={"center"}>
            <Skeleton variant={variant} sx={{ height: h, width: w }} />
        </Box>
    </Typography>
);

function LoadingTableSkeleton() {
    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer >
                <Table sx={{ minWidth: 650, mt: 1 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell width="25%">
                                <CustomSkeleton centered width="32%" fontSize={12} />
                            </TableCell>
                            <TableCell >
                                <CustomSkeleton centered width="15%" fontSize={12} />
                            </TableCell>
                            <TableCell width="10%">
                                <CustomSkeleton centered width="50%" fontSize={12} />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Array.from({ length: 7 }, (_, index) => (
                                <TableRow key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell width={48}>
                                        <Skeleton variant="rounded" height={48} />
                                    </TableCell>

                                    <TableCell>
                                        <Stack>
                                            <CustomSkeleton fontSize={13} width="80%" />
                                            <CustomSkeleton fontSize={10} width="50%" />
                                        </Stack>
                                    </TableCell>

                                    <TableCell >
                                        <CustomSkeleton fontSize={13} width="100%" />
                                    </TableCell>

                                    <TableCell align="center">
                                        <CustomSkeleton centered variant="rounded" width={40} height={40} />
                                    </TableCell>

                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default LoadingTableSkeleton;