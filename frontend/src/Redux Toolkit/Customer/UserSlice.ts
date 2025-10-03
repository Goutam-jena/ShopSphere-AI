import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../../types/userTypes";
import { api } from "../../Config/Api";

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
    profileUpdated: false,
};

//  FETCH USER PROFILE 
export const fetchUserProfile = createAsyncThunk<
    User,
    { jwt: string; navigate?: ((path: string) => void) | null }
>(
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
    }
);

//  UPDATE PROFILE PICTURE 
export const updateProfilePicture = createAsyncThunk<
    User,
    { jwt: string; imageUrl: string; publicId: string }
>(
    "user/updateProfilePicture",
    async ({ jwt, imageUrl, publicId }, { rejectWithValue }) => {
        try {
            const response = await api.patch<User>(
                "/api/users/profile/picture",
                { imageUrl, publicId },
                { headers: { Authorization: `Bearer ${jwt}` } }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue("Failed to update profile picture");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUserState: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
            state.profileUpdated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // --- FETCH USER PROFILE CASES ---
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
            })

            // --- UPDATE PROFILE PICTURE CASES ---
            .addCase(updateProfilePicture.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.profileUpdated = false;
            })
            .addCase(updateProfilePicture.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload;
                state.loading = false;
                state.profileUpdated = true;
            })
            .addCase(updateProfilePicture.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.profileUpdated = false;
            });
    },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
