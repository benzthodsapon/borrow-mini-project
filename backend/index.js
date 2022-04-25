const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: true, 
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

// authentication
app.use("/auth", require("./routes/auth"));

// borrow
app.use("/borrow", require("./routes/borrow"));

// upload
app.use('/upload', require("./routes/upload"));

app.listen(3000, () => {
  console.log("Listening on port 3000");
});