// backend/src/routes/index.js
const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/Contact.controller");
const PublicController = require("../controllers/Public.controller");
const routes = [
    {
        path: '/auth',
        route: require("./auth.route")
    },
    {
        path: '/vendors', // Add this new route group
        route: require("./vendor.route")
    },
    { path: '/user', route: require("./user.route") },
    { path: "/admin", route:require("./admin.route") },

];
router.post("/contact", ContactController.submitContact);


// Public Homepage Route
router.get("/public/homepage", PublicController.getHomepageData);
routes.forEach((cur) => router.use(cur.path, cur.route));
module.exports = router;