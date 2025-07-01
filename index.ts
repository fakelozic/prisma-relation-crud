import express, { Request, Response, NextFunction, Application } from "express";
import "dotenv/config";
import cors from "cors";

import userRoutes from "./routes/userRoutes";

const app = express();
const port = process.env.PORT;

// Middlewares
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/comments", commentRoutes);
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
