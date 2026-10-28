import { Request, Response } from "express";
import { getAllUsers, handleCreateUser, handleDeleteUser, getUserById, updateUserById } from "services/userservices";
//
const getHomePage = async (req: Request, res: Response) => {
  // get users
  const users = await getAllUsers();
  //console.log("check: ", users);
  return res.render("home", {
    users: users,
  });
};
//
const getCreateUserPage = (req: Request, res: Response) => {
  return res.render("create-user");
};
//
const postCreateUser = async (req: Request, res: Response) => {
  const { fullName, email, address } = req.body;
  // handle create user
  await handleCreateUser(fullName, email, address);
  return res.redirect("/");
};
const postDeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (typeof id !== "string") {
    return res.status(400).send("Invalid user ID");
  }

  await handleDeleteUser(id);
  return res.redirect("/");
};
const getViewUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (typeof id !== "string") {
    return res.status(400).send("Invalid user ID");
  }
  const user = await getUserById(id);
  //console.log(user);
  return res.render("view-user", {
    id: id,
    user: user,
  });
};
//
const postUpdateUser = async (req: Request, res: Response) => {
  const { id, fullName, email, address } = req.body;
  //
  await updateUserById(id, fullName, email, address);
  return res.redirect("/");
};
//
export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser };
