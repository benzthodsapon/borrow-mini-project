const express = require("express");
const app = express();
const port = 3001;

const posts = [
  {
    username: "jan",
    title: "Test Jan!"
  },
  {
    username: "Benz",
    title: "Test Benz!"
  },
];

app.get("/posts",(req, res) => {
  res.json(posts);
})

//listen for request on port 3000, and as a callback function have the port listened on logged
app.listen(port);