require("dotenv").config();
const express = require("express");
const app = express();
const animeRouter = require("./routers/anime");

//port
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//homepage route
app.get("/", (req, res) => {
  return res.send({
    err: false,
    msg: "Welcome to RESTful CRUD API with Nodejs, Express, Mysql",
    written_by: "Ratchanon",
  });
});

//Router
app.use("/anime", animeRouter);

// Run Server
app.listen(port, () => {
  console.log(`listening on port: ${port}...`);
});
