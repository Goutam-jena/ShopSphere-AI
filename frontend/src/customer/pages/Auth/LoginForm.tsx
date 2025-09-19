import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { sendLoginSignupOtp, signin } from '../../../Redux Toolkit/Customer/AuthSlice';
import { useNavigate } from 'react-router-dom';
import OTPField from '../../components/OtpFild/OTPField';

interface LoginFormProps { switchForm: () => void; }

const LoginForm: React.FC<LoginFormProps> = ({ switchForm }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { auth } = useAppSelector(store => store);
    const [code, setCode] = useState(new Array(6).fill(""));

    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema: Yup.object({ email: Yup.string().email('Invalid email address').required('Required') }),
        onSubmit: values => {
            dispatch(sendLoginSignupOtp({ email: `signing_${values.email}` }));
        },
    });

    const handleLogin = () => {
        dispatch(signin({ email: formik.values.email, otp: code.join(""), navigate }));
    };

    return (
        <div className='space-y-5'>
            <h1 className='text-xl text-center font-bold'>Login</h1>
            {!auth.otpSent ? (
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <TextField fullWidth name="email" label="Email" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} />
                    <Button fullWidth type="submit" variant="contained">Send OTP</Button>
                </form>
            ) : (
                <div className="space-y-4">
                    <div className='flex justify-center'>
                            <OTPField code={code} setCode={setCode} isError={!!auth.error} />
                    </div>
                    <Button fullWidth onClick={handleLogin} variant="contained">Login</Button>
                </div>
            )}
            {auth.error && <Alert severity="error">{auth.error}</Alert>}
            <div className="text-center">
                Don't have an account? <Button onClick={switchForm}>Sign up</Button>
            </div>
        </div>
    );
};
export default LoginForm;