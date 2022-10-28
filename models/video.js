const mongoose = require("mongoose");

const User = require("./user");

const videoSchema = new mongoose.Schema({
    title: { type: String, max: 180, required: true },
    youtube_id: { type: String, min: 11, max: 11, required: true },
    created_at: { type: Date, default: Date.now },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
