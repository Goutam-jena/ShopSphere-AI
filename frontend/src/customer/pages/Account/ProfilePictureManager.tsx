







import React, { useRef, useState } from 'react';
import { Avatar, Button, CircularProgress, IconButton, Snackbar, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { uploadToCloudinary } from '../../../util/uploadToCloudnary';
import { fetchUserProfile, updateProfilePicture } from '../../../Redux Toolkit/Customer/UserSlice'; // Import fetchUserProfile

const ProfilePictureManager = () => {
    const dispatch = useAppDispatch();
    const { user, auth } = useAppSelector(store => store);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setIsLoading(true);
            setError(null);
            
            try {
                const data = await uploadToCloudinary(event.target.files[0]);
                
                if (data && data.url && auth.jwt) {
                    await dispatch(updateProfilePicture({ jwt: auth.jwt, imageUrl: data.url, publicId: data.public_id })).unwrap();
                    
                    // --- THIS IS THE FIX ---
                    // After the update is successful, re-fetch the user profile to update the navbar
                    dispatch(fetchUserProfile({ jwt: auth.jwt, navigate: null }));
                } else {
                    setError("Upload failed. Please try a different image.");
                }
            } catch (err: any) {
                setError("An error occurred. Please check the console for details.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleRemovePicture = async () => {
        if (auth.jwt) {
            setIsLoading(true);
            await dispatch(updateProfilePicture({ jwt: auth.jwt, imageUrl: "", publicId: "" }));
            
            // --- THIS IS THE FIX ---
            // Also re-fetch the profile after removing the picture
            dispatch(fetchUserProfile({ jwt: auth.jwt, navigate: null }));
            setIsLoading(false);
        }
    };

    const defaultAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="relative">
                <Avatar
                    sx={{ width: '10rem', height: '10rem', fontSize: '5rem' }}
                    src={user.user?.profilePic?.url || defaultAvatar}
                >
                    {!user.user?.profilePic?.url && user.user?.fullName?.[0]}
                </Avatar>
                {isLoading && (
                    <CircularProgress
                        size={168}
                        sx={{ position: 'absolute', top: -4, left: -4, zIndex: 1 }}
                    />
                )}
            </div>
            <div className="flex items-center space-x-2">
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    accept="image/*"
                />
                <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                >
                    Change
                </Button>
                {user.user?.profilePic?.url && (
                    <IconButton onClick={handleRemovePicture} color="error" disabled={isLoading}>
                        <DeleteIcon />
                    </IconButton>
                )}
            </div>
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
                <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ProfilePictureManager;
