import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Alert, CircularProgress } from '@mui/material';
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
    const [timer, setTimer] = useState<number>(30);
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema: Yup.object({ email: Yup.string().email('Invalid email address').required('Required') }),
        onSubmit: values => {
            dispatch(sendLoginSignupOtp({ email: `signing_${values.email}` }));
            setIsTimerActive(true);
            setTimer(30);
        },
    });

    const handleLogin = () => {
        dispatch(signin({ email: formik.values.email, otp: code.join(""), navigate }));
    };

    const handleResendOTP = () => {
        formik.handleSubmit(); // Resubmit the formik form to trigger OTP send
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsTimerActive(false);
            if(interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isTimerActive, timer]);

    return (
        <div className='space-y-5'>
            <h1 className='text-xl text-center font-bold'>Login</h1>
            {!auth.otpSent ? (
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <TextField fullWidth name="email" label="Email" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} />
                    <Button fullWidth type="submit" variant="contained" disabled={auth.loading}>
                        {auth.loading ? <CircularProgress size={24}/> : "Send OTP"}
                    </Button>
                </form>
            ) : (
                <div className="space-y-4">
                    <p className="font-medium text-sm text-center">Enter The OTP sent to your Email</p>
                    <div className='flex justify-center'>
                        <OTPField code={code} setCode={setCode} isError={!!auth.error} />
                    </div>
                    <p className="text-xs text-center">
                        {!isTimerActive ? (
                             <>Didn’t receive OTP? <span onClick={handleResendOTP} className="text-primary-color cursor-pointer hover:underline font-semibold">Resend OTP</span></>
                        ) : (
                            <span>Resend OTP in {timer} seconds</span>
                        )}
                    </p>
                    <Button fullWidth onClick={handleLogin} variant="contained" disabled={auth.loading}>
                        {auth.loading ? <CircularProgress size={24}/> : "Login"}
                    </Button>
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