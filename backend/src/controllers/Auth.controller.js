const AuthService = require("../services/AuthService");
const CatchAsync = require("../utils/CatchAsync");

class AuthController {
    static registerUser = CatchAsync(async (req, res) => {
        const res_obj = await AuthService.registerUser(req.body);
        // Changed to 201 (Created)
        res.status(201).json({ success: true, ...res_obj });
    });

    static loginUser = CatchAsync(async (req, res) => {
        const res_obj = await AuthService.loginUser(req.body);
        // Changed to 200 (OK)
        res.status(200).json({ success: true, ...res_obj });
    });

    static Profile = CatchAsync(async (req, res) => {
        const res_obj = await AuthService.Profile(req.user);
        res.status(200).json({ success: true, ...res_obj });
    });
}

module.exports = AuthController;