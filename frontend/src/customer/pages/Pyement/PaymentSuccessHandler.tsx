

import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { paymentSuccess } from "../../../Redux Toolkit/Customer/OrderSlice";
import { fetchUserCart } from "../../../Redux Toolkit/Customer/CartSlice";
import { 
    Alert, 
    AlertTitle, 
    Backdrop, 
    Button, 
    CircularProgress, 
    Grid, 
    Typography 
} from "@mui/material";

const PaymentSuccessHandler = () => {
    // --- FIX #1: Correctly read all necessary IDs from the URL ---
    const { paymentOrderId } = useParams();
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const paymentId = urlParams.get("razorpay_payment_id");
    const paymentLinkId = urlParams.get("razorpay_payment_link_id");
    // --- END OF FIX #1 ---

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { orders } = useAppSelector((store) => store);
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        if (paymentId && paymentLinkId && jwt) {
            // --- FIX #2: Pass the correct IDs to the backend ---
            const data = { paymentId, paymentLinkId, jwt };
            
            const processPayment = async () => {
                try {
                    await dispatch(paymentSuccess(data)).unwrap();
                    dispatch(fetchUserCart(jwt)); // Re-fetch the cart after success
                } catch (error) {
                    console.error("CRITICAL ERROR caught in PaymentSuccessHandler:", error);
                }
            };
            processPayment();
            // --- END OF FIX #2 ---
        }
    }, [dispatch, paymentId, paymentLinkId, jwt]);

    return (
        <div className="min-h-[90vh] flex flex-col justify-center items-center px-5 lg:px-20">
            {orders.loading ? (
                <Backdrop
                    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={orders.loading}
                >
                    <CircularProgress color="inherit" />
                    <Typography sx={{ ml: 2 }}>Finalizing your order...</Typography>
                </Backdrop>
            ) : (
                <div className="w-full max-w-2xl text-center">
                    <Alert
                        variant="filled"
                        severity="success"
                        sx={{ mb: 6, width: "100%", textAlign: 'left' }}
                    >
                        <AlertTitle>Your order is placed successfully!</AlertTitle>
                        Thank you for shopping with us.
                    </Alert>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div className="space-y-4">
                                <Button
                                    onClick={() => navigate("/account/order")}
                                    variant="contained"
                                    fullWidth
                                >
                                    View My Orders
                                </Button>
                                <Button
                                    onClick={() => navigate("/")}
                                    variant="outlined"
                                    fullWidth
                                >
                                    Continue Shopping
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default PaymentSuccessHandler;