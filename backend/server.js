const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const connectDb = require("./config/connectdb");

const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/categoryRoute");
const uploadRouter = require("./routes/uploadRoute");

dotenv.config();
const PORT = process.env.PORT || 4000;

connectDb();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(logger("dev"));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/file", uploadRouter);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
