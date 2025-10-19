// import React, { useEffect, useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { TextField, Button, Alert, CircularProgress } from '@mui/material';
// import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
// import { sendLoginSignupOtp, signin } from '../../../Redux Toolkit/Customer/AuthSlice';
// import { useNavigate } from 'react-router-dom';
// import OTPField from '../../components/OtpFild/OTPField';

// interface LoginFormProps { switchForm: () => void; }

// const LoginForm: React.FC<LoginFormProps> = ({ switchForm }) => {
//     const dispatch = useAppDispatch();
//     const navigate = useNavigate();
//     const { auth } = useAppSelector(store => store);
//     const [code, setCode] = useState(new Array(6).fill(""));
//     const [timer, setTimer] = useState<number>(30);
//     const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

//     const formik = useFormik({
//         initialValues: { email: '' },
//         validationSchema: Yup.object({ email: Yup.string().email('Invalid email address').required('Required') }),
//         onSubmit: values => {
//             dispatch(signin({ email: values.email, otp: code.join(""), navigate }));
//         },
//     });
    
//     const handleOtpChange = (otpValue: string) => {
//         setCode(otpValue.split(""));
//     };

//     const handleSendOTP = () => {
    
//         dispatch(sendLoginSignupOtp({ email: `signing_${formik.values.email}` }));
   
//         setIsTimerActive(true);
//         setTimer(30);
//     };

//     const handleResendOTP = () => {
//         handleSendOTP(); 
//     };

//     useEffect(() => {
//         let interval: NodeJS.Timeout | undefined;
//         if (isTimerActive && timer > 0) {
//             interval = setInterval(() => setTimer(prev => prev - 1), 1000);
//         } else if (timer === 0) {
//             setIsTimerActive(false);
//         }
//         return () => { if (interval) clearInterval(interval); };
//     }, [isTimerActive, timer]);

//     return (
//         <div className='space-y-5'>
//             <h1 className='text-xl text-center font-bold'>Login</h1>
//             <form onSubmit={formik.handleSubmit} className="space-y-4">
//                 <TextField fullWidth name="email" label="Email" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} disabled={auth.otpSent} />
//                 
//                 {auth.otpSent ? (
//                     <div className="space-y-4">
//                         <p className="font-medium text-sm text-center">Enter The OTP sent to your Email</p>
//                         <div className='flex justify-center'>
//                             <OTPField code={code} setCode={setCode} isError={!!auth.error} />
//                         </div>
//                         <p className="text-xs text-center">
//                             {!isTimerActive ? (
//                                 <>Didn’t receive OTP? <span onClick={handleResendOTP} className="text-primary-color cursor-pointer hover:underline font-semibold">Resend OTP</span></>
//                             ) : ( <span>Resend OTP in {timer} seconds</span> )}
//                         </p>
//                         <Button fullWidth type="submit" variant="contained" disabled={auth.loading || code.join("").length !== 6}>
//                             {auth.loading ? <CircularProgress size={24}/> : "Login"}
//                         </Button>
//                     </div>
//                 ) : (
//                     <Button fullWidth onClick={handleSendOTP} variant="contained" disabled={auth.loading || !formik.values.email}>
//                         {auth.loading ? <CircularProgress size={24}/> : "Send OTP"}
//                     </Button>
//                 )}
//             </form>
//             {auth.error && <Alert severity="error" sx={{mt: 2}}>{auth.error}</Alert>}
//             <div className="text-center">
//                 Don't have an account? <Button onClick={switchForm}>Sign up</Button>
//             </div>
//         </div>
//     );
// };
// export default LoginForm;













































import React, { useEffect, useState } from 'react';
import { Alert, Button, CircularProgress, Snackbar, TextField } from '@mui/material';
import OTPInput from '../../components/OtpFild/OTPInput';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { useNavigate } from 'react-router-dom';
import { sendLoginSignupOtp, signin } from '../../../Redux Toolkit/Customer/AuthSlice';

const LoginForm = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [timer, setTimer] = useState<number>(30);
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { auth } = useAppSelector(store => store);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: (values) => {
            // Pass both email and the collected OTP
            dispatch(signin({ email: values.email, otp, navigate }));
        }
    });

    const handleOtpChange = (otpValue: string) => {
        setOtp(otpValue);
    };

    const handleSendOTP = () => {
        dispatch(sendLoginSignupOtp({ email: formik.values.email }));
        setIsOtpSent(true);
        setTimer(30);
        setIsTimerActive(true);
    };

    const handleResendOTP = () => {
        dispatch(sendLoginSignupOtp({ email: "signing_" + formik.values.email }));
        setTimer(30);
        setIsTimerActive(true);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsTimerActive(false);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isTimerActive, timer]);

    return (
        <div>
            <h1 className='text-center font-bold text-xl text-primary-color pb-8'>Login</h1>
            <form onSubmit={formik.handleSubmit} className="space-y-5">
                <TextField
                    fullWidth
                    name="email"
                    label="Enter Your Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email ? formik.errors.email as string : undefined}
                />

                {isOtpSent && (
                    <div className="space-y-2">
                        <p className="font-medium text-sm">* Enter The OTP sent to your Email</p>
                        <OTPInput length={6} onChange={handleOtpChange} error={false} />
                        <p className="text-xs space-x-2">
                            {isTimerActive ? (
                                <span>Resend OTP in {timer} seconds</span>
                            ) : (
                                <>
                                    Didn’t receive OTP?{" "}
                                    <span onClick={handleResendOTP} className="text-teal-600 cursor-pointer hover:text-teal-800 font-semibold">
                                        Resend OTP
                                    </span>
                                </>
                            )}
                        </p>
                    </div>
                )}

                {isOtpSent ? (
                    <div>
                        <Button
                            disabled={auth.loading || otp.length !== 6}
                            onClick={() => formik.handleSubmit()}
                            fullWidth
                            variant='contained'
                            sx={{ py: "11px" }}
                        >
                            {auth.loading ? <CircularProgress size={24} /> : "Login"}
                        </Button>
                    </div>
                ) : (
                    <Button
                        disabled={auth.loading}
                        fullWidth
                        variant='contained'
                        onClick={handleSendOTP}
                        sx={{ py: "11px" }}
                    >
                        {auth.loading ? <CircularProgress size={24} /> : "Send OTP"}
                    </Button>
                )}
            </form>
        </div>
    );
}

export default LoginForm;