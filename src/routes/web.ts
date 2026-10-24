import express, { Express } from "express";

const router = express.Router();

const webRouter = (app: Express) => {
  router.get("/", (req, res) => {
    res.render("home.ejs");
  });

  router.get("/hoidanit", (req, res) => {
    res.send("Hello Eric web");
  });
  app.use("/", router);
};

export default webRouter;
