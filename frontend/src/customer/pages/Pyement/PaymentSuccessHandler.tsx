import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../Redux Toolkit/Store';
import { paymentSuccess } from '../../../Redux Toolkit/Customer/OrderSlice';
import { Alert, AlertTitle } from '@mui/material';

const PaymentSuccessHandler = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { paymentOrderId } = useParams();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const paymentId = searchParams.get('razorpay_payment_id');
        const paymentLinkId = searchParams.get('razorpay_payment_link_id');
        const jwt = localStorage.getItem('jwt');

        if (paymentId && paymentLinkId && jwt) {
            dispatch(paymentSuccess({
                paymentId,
                paymentLinkId,
                jwt
            }));
        }
        
        // Redirect to order history after a short delay
        const timer = setTimeout(() => {
            navigate('/account/orders');
        }, 3000);

        return () => clearTimeout(timer);

    }, [dispatch, location, navigate, paymentOrderId]);

    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <Alert severity="success" sx={{width: 'fit-content'}}>
                <AlertTitle>Payment Successful</AlertTitle>
                Your order has been placed successfully. You are being redirected to your order history.
            </Alert>
        </div>
    );
};

export default PaymentSuccessHandler;