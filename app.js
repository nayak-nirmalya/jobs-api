require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// connect db
const connectDB = require("./db/connect");

// middleware
const authenticateUser = require("./middleware/authentication");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

// security packages
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");

// dummy route to check if server working or not
app.get("/", (req, res) => res.send("Hello World!"));

// middelware to limit requests per user
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(express.json());

// extra packages
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.get("/", (req, res) => {
  res.send("Jobs API!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is Listening on Port ${port}...`)
    );
  } catch (error) {
    console.error(error);
  }
};

start();
module.exports = app;
