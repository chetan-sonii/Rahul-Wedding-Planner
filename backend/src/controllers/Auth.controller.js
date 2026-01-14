// src/controllers/Auth.controller.js
const { AuthService } = require("../services");
const CatchAsync = require("../utils/CatchAsync");

class AuthController {
    static registerUser = CatchAsync(async (req, res) => {
        const res_obj = await AuthService.registerUser(req.body);
        console.log(res_obj);
        res.status(201).json(res_obj); // <- use numeric 201
    });

    static loginUser = CatchAsync(async (req, res) => {
        const res_obj = await AuthService.loginUser(req.body);
        res.status(200).json(res_obj); // <- use numeric 200
    });
}

module.exports = AuthController;
