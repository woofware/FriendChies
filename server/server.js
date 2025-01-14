const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const userRouter = require("./routes/userRoute");
const profileRouter = require("./routes/profileRoute");
const chatRouter = require("./routes/chatRoute");
const imageRouter = require("./routes/imageRoute");

const app = express();

const PORT = 3000;

const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.YOUR_ACCESS_KEY_ID,
  secretAccessKey: process.env.YOUR_SECRET_ACCESS_KEY,
  region: process.env.YOUR_S3_BUCKET_REGION,
});
const s3 = new AWS.S3();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Build file
app.use(express.static("../client/"));
app.use("/build", express.static(path.join(__dirname, "../build")));

app.use("/api/user", userRouter);
app.use("/api/dogs", profileRouter);
app.use("/api/chat", chatRouter);
app.use('/api/images', imageRouter);

app.get("/api/generate-presigned-url", (req, res) => {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: req.query.fileName, // The name of the file to upload
    Expires: 60, // The URL expiration time in seconds
    ContentType: req.query.fileType, // The type of file to upload
  };

  s3.getSignedUrl("putObject", params, (err, url) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error generating the URL" });
    } else {
      res.json({ url });
    }
  });
});

// serve index.html
app.get("/*", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../build/index.html"));
});

app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for..."),
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on port 3000.`));
