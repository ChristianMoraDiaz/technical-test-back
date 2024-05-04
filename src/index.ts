import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import diaryRouter from "./routes/employee";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/ping", (_req, res) => {
  console.log("someone ping here!!");
  res.send("pong");
});

app.use("/api/employee", diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
});
