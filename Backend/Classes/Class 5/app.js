import express from "express";
import 'dotenv/config';
import cors from "cors";
import DBConnect from "./database/database.js";
import router from "./routes/routes.js";

const app = express();
const port = 5000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

// DB connection
DBConnect();

app.listen(port, () => {
  console.log("server is running on port", port);
});