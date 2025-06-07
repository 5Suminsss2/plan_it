const dotenv = require("dotenv");

// NODE_ENV에 따라 불러올 env 파일 결정
const env = process.env.NODE_ENV || "development"; // 기본은 development
const envFile = `.env.${env}`;
dotenv.config({ path: envFile });

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const routes = require("./routes");

const app = express();
connectDB();

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

app.use(cors());
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on port ${PORT}`);
});
