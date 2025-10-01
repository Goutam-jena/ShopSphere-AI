import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { signin } from '../../../Redux Toolkit/Customer/AuthSlice';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const AdminLogin = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { auth } = useAppSelector(state => state);

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema,
        onSubmit: (values) => {
            
            console.log("Admin login attempt with:", values);
            
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <h1 className='text-xl text-center font-bold'>Admin Login</h1>
            <TextField
                fullWidth
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            <Button fullWidth type="submit" variant="contained" disabled={auth.loading}>
                {auth.loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
        </form>
    );
};

export default AdminLogin;