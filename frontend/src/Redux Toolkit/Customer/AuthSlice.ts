import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, LoginRequest, SignupRequest, AuthState } from '../../types/authTypes';
import { api } from '../../Config/Api';

const initialState: AuthState = {
    jwt: localStorage.getItem("jwt"),
    role: null,
    loading: false,
    error: null,
    otpSent: false
};

const API_URL = '/auth';

export const sendLoginSignupOtp = createAsyncThunk('auth/sendLoginSignupOtp',
    async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
        const response = await api.post(`${API_URL}/sent/login-signup-otp`, { email });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.error || 'Failed to send OTP');
    }
});

export const signup = createAsyncThunk<AuthResponse, SignupRequest>('auth/signup',
    async (signupRequest, { rejectWithValue }) => {
    try {
        const response = await api.post<AuthResponse>(`${API_URL}/signup`, signupRequest);
        signupRequest.navigate("/");
        localStorage.setItem("jwt", response.data.jwt);
        return response.data;
    } catch (error: any) {
        return rejectWithValue('Signup failed');
    }
});

export const signin = createAsyncThunk<AuthResponse, LoginRequest>('auth/signin',
    async (loginRequest, { rejectWithValue }) => {
    try {
        const response = await api.post<AuthResponse>(`${API_URL}/signin`, loginRequest);
        localStorage.setItem("jwt", response.data.jwt);
        loginRequest.navigate("/");
        return response.data;
    } catch (error: any) {
        return rejectWithValue('Signin failed');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.jwt = null;
            state.role = null;
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendLoginSignupOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendLoginSignupOtp.fulfilled, (state) => {
                state.loading = false;
                state.otpSent = true;
            })
            .addCase(sendLoginSignupOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.jwt = action.payload.jwt;
                state.role = action.payload.role;
                state.loading = false;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(signin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signin.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.jwt = action.payload.jwt;
                state.role = action.payload.role;
                state.loading = false;
            })
            .addCase(signin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;