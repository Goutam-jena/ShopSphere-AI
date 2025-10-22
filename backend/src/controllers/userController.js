
const UserService = require('../services/UserService');
const UserError = require('../exceptions/UserError');

const handleErrors = (err, res) => {
    if (err instanceof UserError) {
        return res.status(404).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
};

const getUserProfileByJwt = async (req, res) => {
    try {
        const user = await req.user;
        return res.status(200).json(user);
    } catch (err) {
        handleErrors(err, res);
    }
};

const getUserByEmail = async (req, res) => {
    // ... (your existing code for this function)
};

// --- ADD THIS NEW FUNCTION ---
const updateUserProfilePicture = async (req, res) => {
    try {
        const user = await req.user;
        const { imageUrl, publicId } = req.body; // Expecting the new image URL and public_id
        const updatedUser = await UserService.updateProfilePicture(user._id, imageUrl, publicId);
        return res.status(200).json(updatedUser);
    } catch (err) {
        handleErrors(err, res);
    }
};
// --- END OF ADDITION ---

module.exports = {
    getUserProfileByJwt,
    getUserByEmail,
    updateUserProfilePicture, // Add the new function to the exports
};
