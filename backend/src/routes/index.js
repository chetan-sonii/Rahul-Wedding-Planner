// backend/src/routes/index.js
const express = require("express");
const router = express.Router();

const routes = [
    {
        path: '/auth',
        route: require("./auth.route")
    },
    {
        path: '/vendors', // Add this new route group
        route: require("./vendor.route")
    },
    { path: '/user', route: require("./user.route") }
];

routes.forEach((cur) => router.use(cur.path, cur.route));
module.exports = router;