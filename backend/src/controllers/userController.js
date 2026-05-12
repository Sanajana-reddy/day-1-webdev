import { User } from '../models/user/user.model.js';

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-__v');

        if (!user) {
            return res.status(404).json({ status: "NOT_FOUND", message: "User not found" });
        }

        return res.status(200).json({
            status: "SUCCESS",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error("Error fetching current user:", error.message);
        return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", message: "Error fetching user" });
    }
};
