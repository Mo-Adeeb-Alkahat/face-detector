const express = require("express");
const bodyParser = require("body-parser"); //for reading the req
const bcrypt = require("bcryptjs");
const app = express();
const cors = require("cors");

const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "password",
    database: "face-db",
  },
});

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("succes");
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

// :id   means what ever number we get
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

//const salt = bcrypt.genSaltSync(10);
//const hash = bcrypt.hashSync("B4c0/\/", salt);

//bcrypt.compareSync("B4c0/\/", hash); // true
//bcrypt.compareSync("not_bacon", hash); // false

app.listen(3001, () => {
  console.log("app is running");
});
