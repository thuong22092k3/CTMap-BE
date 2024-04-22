import express from "express";
import mongoose from "mongoose";
import router from "./routes/RoutesAccident";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello Thương");
});

app.use("/", router);

mongoose
  .connect(
    "mongodb+srv://admin:admin@ctmap.h2a0aqu.mongodb.net/CTMap?retryWrites=true&w=majority&appName=CTmap"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("server running on port 3000");
    });
  });
