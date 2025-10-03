const UserService = require('../services/UserService');

const getUserProfileByJwt = async (req, res) => {
    try {
        const user = await req.user;
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const updateUserProfilePicture = async (req, res) => {
    try {
        const user = await req.user;
        const { imageUrl, publicId } = req.body;
        const updatedUser = await UserService.updateProfilePicture(user._id, imageUrl, publicId);
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = { getUserProfileByJwt, updateUserProfilePicture };