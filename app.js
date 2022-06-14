const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  }
  
  app.use("/api", require("./routes/api.routes"));
  
  app.use((req, res, next) => {
    next(createError.NotFound());
  });

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message
  });
});


app.listen(PORT, () =>
  console.log({
    Home: `🚀 @ http://localhost:${PORT}`,
    Routing: `🚀 @ http://localhost:${PORT}/api`,
    Users: `🚀 @ http://localhost:${PORT}/api/users`,
    Blogs: `🚀 @ http://localhost:${PORT}/api/blogs`,
    Comment: `🚀 @ http://localhost:${PORT}/api/blog/comment/2`
  })
);
