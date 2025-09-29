import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Menu, MenuItem, Box, styled, tableCellClasses } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { fetchSellerOrders, updateOrderStatus } from '../../../Redux Toolkit/Seller/sellerOrderSlice';
import { Order, OrderItem, OrderStatus } from '../../../types/orderTypes';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
    [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const orderStatusOptions = ['PENDING', 'PLACED', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export default function OrderTable() {
    const { sellerOrder } = useAppSelector(store => store);
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = React.useState<{ [key: number]: HTMLElement | null }>({});
    const jwt = localStorage.getItem("jwt") || "";

    const handleClick = (event: React.MouseEvent<HTMLElement>, orderId: number) => setAnchorEl(prev => ({ ...prev, [orderId]: event.currentTarget }));
    const handleClose = (orderId: number) => setAnchorEl(prev => ({ ...prev, [orderId]: null }));

    React.useEffect(() => { dispatch(fetchSellerOrders(jwt)); }, [dispatch, jwt]);

    const handleUpdateOrder = (orderId: number, orderStatus: OrderStatus) => {
        dispatch(updateOrderStatus({ jwt, orderId, orderStatus }));
        handleClose(orderId);
    };

    return (
        <>
            <h1 className='pb-5 font-bold text-xl'>All Orders</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Order Id</StyledTableCell>
                            <StyledTableCell>Products</StyledTableCell>
                            <StyledTableCell>Shipping Address</StyledTableCell>
                            <StyledTableCell align="center">Order Status</StyledTableCell>
                            <StyledTableCell align="right">Update</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sellerOrder.orders.map((item: Order) => (
                            <TableRow key={item._id}>
                                <TableCell>{item._id}</TableCell>
                                <TableCell>
                                    {item.orderItems.map((orderItem: OrderItem) => (
                                        <div key={orderItem._id} className='flex items-center gap-2 mb-2'>
                                            <img className='w-14 h-14 rounded-md' src={orderItem.product.images[0]} alt="" />
                                            <div>{orderItem.product.title}</div>
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <p>{item.shippingAddress.name}</p>
                                        <p>{item.shippingAddress.address}, {item.shippingAddress.city}</p>
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <Box className={`border px-2 py-1 rounded-full text-xs`}>
                                        {item.orderStatus}
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <Button size='small' onClick={(e) => handleClick(e, item._id)} variant="contained">Status</Button>
                                    <Menu anchorEl={anchorEl[item._id]} open={Boolean(anchorEl[item._id])} onClose={() => handleClose(item._id)}>
                                        {orderStatusOptions.map((status) => (
                                            <MenuItem key={status} onClick={() => handleUpdateOrder(item._id, status as OrderStatus)}>
                                                {status}
                                            </MenuItem>
                                        ))}
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