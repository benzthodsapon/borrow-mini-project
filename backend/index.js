const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// authentication
app.use("/auth", require("./routes/auth"));

app.listen(4000, () => {
  console.log("Listening on port 4000");
});