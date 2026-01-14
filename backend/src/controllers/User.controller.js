const { User } = require("../models");

// 1. Toggle Favorites
exports.toggleFavorite = async (req, res) => {
    try {
        const { vendorId } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.favorites) user.favorites = [];

        const index = user.favorites.indexOf(vendorId);
        let message = "";

        if (index === -1) {
            user.favorites.push(vendorId);
            message = "Added to favorites";
        } else {
            user.favorites.splice(index, 1);
            message = "Removed from favorites";
        }

        await user.save();
        res.status(200).json({ success: true, message, favorites: user.favorites });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 2. Get Dashboard Data
exports.getDashboardData = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("favorites");

        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        res.status(200).json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                favorites: user.favorites || [],
                partnerName: user.partnerName || "",
                weddingDate: user.weddingDate || "",
                budget: user.budget || 0,
                checklist: user.checklist || []
            }
        });
    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// 3. Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        // Add guestCount to destructuring
        const { name, partnerName, weddingDate, budget, guestCount } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { name, partnerName, weddingDate, budget, guestCount },
            { new: true }
        );
        // ... return response
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 4. Manage Checklist
exports.manageChecklist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { action, text, itemId, dueDate, note } = req.body; // Added dueDate, note
        const user = await User.findById(userId);

        if (!user.checklist) user.checklist = [];

        if (action === 'add') {
            user.checklist.push({
                text,
                isCompleted: false,
                dueDate: dueDate || null,
                note: note || ""
            });
        } else if (action === 'toggle' && itemId) {
            const item = user.checklist.id(itemId);
            if (item) item.isCompleted = !item.isCompleted;
        } else if (action === 'delete' && itemId) {
            user.checklist.pull(itemId);
        } else if (action === 'edit' && itemId) { // Optional: Edit capability
            const item = user.checklist.id(itemId);
            if (item) {
                if (text) item.text = text;
                if (dueDate !== undefined) item.dueDate = dueDate;
                if (note !== undefined) item.note = note;
            }
        }

        await user.save();
        res.status(200).json({ success: true, checklist: user.checklist });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};