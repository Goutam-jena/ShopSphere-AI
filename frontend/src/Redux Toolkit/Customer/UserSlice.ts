











import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../../types/userTypes";
import { api } from "../../Config/Api";
import { RootState } from "../Store";

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  profileUpdated: false,
};

// --- THIS IS THE UPDATED FUNCTION ---
// The 'navigate' parameter is now optional (navigate?) to make it more flexible.
export const fetchUserProfile = createAsyncThunk<User, { jwt: string; navigate?: ((path: string) => void) | null }>(
  "user/fetchUserProfile",
  async ({ jwt, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.get<User>("/api/users/profile", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      // Only navigate if the navigate function is provided
      if (navigate && response.data.role === "ROLE_ADMIN") {
        navigate("/admin");
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Failed to fetch user profile");
    }
  }
);

// This function is for updating the profile picture
export const updateProfilePicture = createAsyncThunk<
  User,
  { jwt: string; imageUrl: string; publicId: string }
>(
  "user/updateProfilePicture",
  async ({ jwt, imageUrl, publicId }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
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
      // Cases for fetchUserProfile
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

      // Cases for updateProfilePicture
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
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;