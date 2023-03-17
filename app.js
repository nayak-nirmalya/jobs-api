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

app.use(express.json());
// extra packages

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
    console.log(error);
  }
};

start();
