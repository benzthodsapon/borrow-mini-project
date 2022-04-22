const express = require("express");
const app = express();
const port = 3001;
var jwt = require("jsonwebtoken");

app.get("/api/login", (req, res) => {
  const user = { id: 3 };
  const token = jwt.sign({ user }, "my_secret_key");
  res.json({
    token: token,
  });
});

app.get("/api/protected", ensureToken, (req, res) => {
  jwt.verify(req.token, "my_secret_key", function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else
      [
        res.json({
          text: "This is login success.",
          data: data,
        }),
      ];
  });
});

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

//listen for request on port 3000, and as a callback function have the port listened on logged
app.listen(port, function () {
  console.log("App listen on port 3000");
});
