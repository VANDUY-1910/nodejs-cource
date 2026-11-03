import { Request, Response } from "express";
const getDashboardPage = (req: Request, res: Response) => {
  return res.render("admin/dashboard.ejs");
};

export { getDashboardPage };
