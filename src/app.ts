import express from "express";
import userRoute from "./modules/user/user.route";
import authRoute from "./modules/auth/auth.route";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();

app.use(express.json());


app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);


app.get("/", (req, res) => {
  res.send("Welcome to Nexora Backend!");
});

app.use(errorMiddleware);
export default app;