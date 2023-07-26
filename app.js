const express = require("express");
const passport = require("passport");
require("./passport");
const path = require("path");
const session = require("express-session");
//const cookieSession = require('cookie-session');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));

function isLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

const port = 5000;

app.get("/", (req, res) => {
  //res.json({message: "You are not logged in"})
  res.sendFile("index.html");
});

app.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/failed", (req, res) => {
  res.send("Failed");
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/protected",
    failureRedirect: "/failed",
  })
);

app.get("/auth/protected", isLoggedIn, (req, res) => {
  let name = req.user.displayName;
 // res.send(`welcome ${name}`);
  res.status(400).send(`welcome ${name}`)
  //,"<button><a href='/logout'>logout from Google</a></button>")
});
app.get("/logout", (req, res) => {
  req.session = null;
  //req.logout();
  res.redirect("/");
});

app.listen(port, () => console.log(`server running on port  ${port}`));
