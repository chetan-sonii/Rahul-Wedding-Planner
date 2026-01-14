const httpStatus = require("http-status"); // FIXED IMPORT
const { AuthService } = require("../services"); // Ensure this index export is correct
const CatchAsync = require("../utils/CatchAsync");

class AuthController {
    static registerUser = CatchAsync(async (req, res) => {
        const res_obj = await AuthService.registerUser(req.body);
        res.status(httpStatus.CREATED).json(res_obj);
    });

    static loginUser = CatchAsync(async (req, res) => {
        const res_obj = await AuthService.loginUser(req.body);
        res.status(httpStatus.OK).json(res_obj);
    });
}

module.exports = AuthController;