require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();

const videoRouter = require("./routes/videos");
const userRouter = require("./routes/users");
const loginRouter = require("./routes/login");

mongoose
.connect(`mongodb://${ process.env.DB_HOST }/${ process.env.DB_NAME }`)
.then( () => console.log("MongoDB connected"))
.catch( err => console.error(err) ) ;

app.set("view engine", "ejs");

/* middleware de parsamento de HTTP body */
app.use( express.json() );

app.get("/", async (req, res) => {
    const Video = require("./models/video");

    const videos = await Video.find().populate("user_id", "username").sort({ created_at: -1 }).limit(10).lean();

    return res.render("home", {videos});
});

app.use("/api/videos", videoRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.listen( process.env.HTTP_PORT );
