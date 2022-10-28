const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, min: 3, max: 252, required: true },
    password: { type: String, required: true },
    username: { type: String, min: 3, max: 24, required: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
