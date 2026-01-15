const { Contact } = require("../models"); // Ensure you export this in models/index.js
const CatchAsync = require("../utils/CatchAsync");

exports.submitContact = CatchAsync(async (req, res) => {
    const { name, email, subject, message } = req.body;
    await Contact.create({ name, email, subject, message });
    res.status(201).json({ success: true, message: "Message sent successfully!" });
});