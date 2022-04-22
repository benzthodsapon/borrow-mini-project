const express = require("express");

const app = express();

app.use(express.json());

// authentication
app.use("/auth", require("./routes/auth"));

app.listen(4000, () => {
  console.log("Listening on port 4000");
});