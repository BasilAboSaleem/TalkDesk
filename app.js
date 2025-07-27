const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const path = require("path");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const cookieParser = require('cookie-parser');

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static + views
app.set("view engine", "ejs");
app.use(express.static("public"));

// Extra middleware
app.use(cookieParser());
app.use(methodOverride('_method'));

// Session & flash
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    collectionName: 'sessions',
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24
  }
}));
app.use(flash());

// Expose flash + setting globally
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});
//app.use(require('./middlewares/authMiddlewares').checkIfUser);



// Auto refresh
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => liveReloadServer.refresh("/"), 100);
});

/* Routers
const coreRoute = require('./routes/coreRoute');
const authRoute = require('./routes/authRoute');
const reviewRoute = require('./routes/reviewRoute');
app.use(coreRoute);
app.use(authRoute);
app.use(reviewRoute);
/*
const dashboardRoute = require('./routes/dashboardRoute');


app.use(dashboardRoute);*/

// Connect DB + Start
const port = process.env.PORT || 3001;
mongoose.connect(process.env.MONGODB_URL)
  .then(() => app.listen(port, () => console.log(`http://localhost:${port}/`)))
  .catch(err => console.log(err));
