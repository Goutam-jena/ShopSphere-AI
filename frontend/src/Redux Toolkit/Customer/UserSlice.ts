import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../../types/userTypes";
import { api } from "../../Config/Api";

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
    profileUpdated: false,
};

export const fetchUserProfile = createAsyncThunk<User, { jwt: string; navigate?: ((path: string) => void) | null }>(
    "user/fetchUserProfile",
    async ({ jwt, navigate }, { rejectWithValue }) => {
    try {
        const response = await api.get<User>("/api/users/profile", {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        if (navigate && response.data.role === "ROLE_ADMIN") {
            navigate("/admin");
        }
        return response.data;
    } catch (error: any) {
        return rejectWithValue("Failed to fetch user profile");
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUserState: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;