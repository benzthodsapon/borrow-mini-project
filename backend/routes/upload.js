const express = require("express");
const router = require("express").Router();

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { uploadFile, getFileStream } = require("./s3");

const app = express();

app.get("/images/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

router.post("/images", upload.single("image"), async (req, res) => {
  const file = req.file;
  if (file) {
    const result = await uploadFile(file);
    await unlinkFile(file.path);
    console.log("result : ", result);
    res.send({ imagePath: `/images/${result.Key}`, key: result.Key, location: result.Location});
  }
});

module.exports = router;
