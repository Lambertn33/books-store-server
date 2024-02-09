import express from "express";

import bodyParser from "body-parser";

import cors from "cors";

import { userRoutes, bookRoutes } from "./routes";

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/auth", userRoutes);

app.use("/api/books", bookRoutes);

app.listen(4000);
