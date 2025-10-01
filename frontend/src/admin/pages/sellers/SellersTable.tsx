import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Menu, MenuItem } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { fetchSellers, updateSellerAccountStatus } from '../../../Redux Toolkit/Seller/sellerSlice';
import { Seller } from '../../../types/sellerTypes';

export default function SellersTable() {
    const dispatch = useAppDispatch();
    const { sellers } = useAppSelector(store => store);
    const [anchorEl, setAnchorEl] = React.useState<{ [key: string]: HTMLElement | null }>({});

    React.useEffect(() => {
        dispatch(fetchSellers("PENDING_VERIFICATION")); // Fetch pending sellers by default
    }, [dispatch]);

    const handleClick = (event: React.MouseEvent<HTMLElement>, sellerId: string) => {
        setAnchorEl(prev => ({ ...prev, [sellerId]: event.currentTarget }));
    };

    const handleClose = (sellerId: string) => {
        setAnchorEl(prev => ({ ...prev, [sellerId]: null }));
    };

    const handleUpdateStatus = (sellerId: number, status: string) => {
        dispatch(updateSellerAccountStatus({ id: sellerId, status }));
        handleClose(String(sellerId));
    };

    return (
        <>
            <h1 className='pb-5 font-bold text-xl'>Manage Sellers</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="sellers table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Seller Name</TableCell>
                            <TableCell>Business Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sellers.sellers.map((seller: Seller) => (
                            <TableRow key={seller._id}>
                                <TableCell>{seller.sellerName}</TableCell>
                                <TableCell>{seller.businessDetails.businessName}</TableCell>
                                <TableCell>{seller.email}</TableCell>
                                <TableCell>{seller.accountStatus}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        onClick={(e) => handleClick(e, String(seller._id))}
                                        variant="contained"
                                    >
                                        Update Status
                                    </Button>
                                    <Menu
                                        anchorEl={anchorEl[String(seller._id)]}
                                        open={Boolean(anchorEl[String(seller._id)])}
                                        onClose={() => handleClose(String(seller._id))}
                                    >
                                        <MenuItem onClick={() => handleUpdateStatus(seller._id!, 'ACTIVE')}>Approve</MenuItem>
                                        <MenuItem onClick={() => handleUpdateStatus(seller._id!, 'SUSPENDED')}>Suspend</MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}