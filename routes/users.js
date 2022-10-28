const joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const User = require("../models/user");

const validationSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(1000).required(),
    username: joi.string().min(3).max(24).required()
});

router.post("/", async (req, res) => {
    const newUser = req.body;

    try {
        await validationSchema.validateAsync( newUser );
    }
    catch(err) {
        return res.status(400).send({"message": err.details[0].message });
    }

    newUser.password = await bcrypt.hash(newUser.password, 10);

    try {
        const user = new User(newUser);
        await user.save();

        return res.status(202).send(user);
    }
    catch(err) {
        console.error(err);
        return res.status(400).send({"message":"Bad Request"});
    }

});

module.exports = router;
