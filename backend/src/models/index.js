// Export as 'User' so: const { User } = require('../models') works
module.exports.User = require("./User.model");
module.exports.Profile = require("./Profile.model");