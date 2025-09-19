import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { sendLoginSignupOtp, signup } from '../../../Redux Toolkit/Customer/AuthSlice';
import { useNavigate } from 'react-router-dom';
import OTPField from '../../components/OtpFild/OTPField';

interface SignupFormProps { switchForm: () => void; }

const SignupForm: React.FC<SignupFormProps> = ({ switchForm }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { auth } = useAppSelector(store => store);
    const [code, setCode] = useState(new Array(6).fill(""));

    const formik = useFormik({
        initialValues: { fullName: '', email: '' },
        validationSchema: Yup.object({
            fullName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: values => {
            dispatch(sendLoginSignupOtp({ email: values.email }));
        },
    });

    const handleSignup = () => {
        dispatch(signup({ ...formik.values, otp: code.join(""), navigate }));
    };

    return (
        <div className='space-y-5'>
            <h1 className='text-xl text-center font-bold'>Sign Up</h1>
            {!auth.otpSent ? (
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <TextField fullWidth name="fullName" label="Full Name" value={formik.values.fullName} onChange={formik.handleChange} error={formik.touched.fullName && Boolean(formik.errors.fullName)} helperText={formik.touched.fullName && formik.errors.fullName} />
                    <TextField fullWidth name="email" label="Email" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} />
                    <Button fullWidth type="submit" variant="contained">Send OTP</Button>
                </form>
            ) : (
                <div className="space-y-4">
                    <div className='flex justify-center'>
                        <OTPField code={code} setCode={setCode} isError={!!auth.error} />
                    </div>
                    <Button fullWidth onClick={handleSignup} variant="contained">Sign Up</Button>
                </div>
            )}
            {auth.error && <Alert severity="error">{auth.error}</Alert>}
            <div className="text-center">
                Already have an account? <Button onClick={switchForm}>Login</Button>
            </div>
        </div>
    );
};
export default SignupForm;