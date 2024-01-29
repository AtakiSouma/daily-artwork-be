import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression"; // làm giảm kích thước nén dữ liệu
import dotenv from "dotenv";
import { connectDB } from "../src/config/connectDB";
import { errorHandler } from "./libs/handlers/errorsHandlers";
import path from "path";
import { route } from "./routes";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
connectDB();
route(app);
app.use(errorHandler);

export default app;
