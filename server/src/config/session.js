const session = require("express-session");
const MongoStore = require("connect-mongo").default;

const sessionConfig = session({
  name: "authlab.sid",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions"
  }),
  cookie: {
    httpOnly: true,
    secure: false, // true only in production (https)
    maxAge: 1000 * 60 * 60 // 1 hour
  }
});

module.exports = sessionConfig;