import express from "express";
const app = express();
import cors from "cors";

app.use(cors());

import { mainRoutes } from "./routes/main.js";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", mainRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running one ahead");
});
