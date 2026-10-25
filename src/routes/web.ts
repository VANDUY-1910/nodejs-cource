import express, { Express } from "express";
import { getCreateUserPage, getHomePage } from "../controllers/usercontroller";

const router = express.Router();

const webRouter = (app: Express) => {
  router.get("/", getHomePage);

  router.get("/create-user", getCreateUserPage);
  app.use("/", router);
};

export default webRouter;
