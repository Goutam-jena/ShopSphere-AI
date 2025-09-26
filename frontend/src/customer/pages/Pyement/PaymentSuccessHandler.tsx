import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../Redux Toolkit/Store';
import { paymentSuccess } from '../../../Redux Toolkit/Customer/OrderSlice';

const PaymentSuccessHandler = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { paymentOrderId } = useParams();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const paymentId = searchParams.get('razorpay_payment_id');
        const paymentLinkId = searchParams.get('razorpay_payment_link_id');

        if (paymentId && paymentLinkId && paymentOrderId) {
            dispatch(paymentSuccess({
                paymentId,
                paymentLinkId,
                jwt: localStorage.getItem('jwt')!
            }));
            // Navigate to order history after dispatching
            navigate('/account/orders');
        }
    }, [dispatch, location, navigate, paymentOrderId]);

    return (
        <div className='h-screen flex items-center justify-center'>
            <h1 className='text-2xl font-bold'>Processing your payment...</h1>
        </div>
    );
};

export default PaymentSuccessHandler;