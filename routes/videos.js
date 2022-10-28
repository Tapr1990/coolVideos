const joi = require("joi");
const express = require("express");
const router = express.Router();

const Video = require("../models/video");
const auth = require("../middleware/auth");

const validationSchema = joi.object({
    title: joi.string().max(180).required(),
    youtube_id: joi.string().min(11).max(11).required()
});

router.get("/", async (req, res) => {

});

router.post("/", auth, async (req, res) => {
    const newVideo = req.body;

    try {
        await validationSchema.validateAsync( newVideo );
    }
    catch(err) {
        return res.status(400).send({"message": err.details[0].message });
    }

    newVideo.user_id = req.userPayload._id;

    const video = new Video(newVideo);
    await video.save();

    return res.status(202).send(video);
});

module.exports = router;
