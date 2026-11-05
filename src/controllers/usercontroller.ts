import { Request, Response } from "express";
import { getAllUsers, handleCreateUser, handleDeleteUser, getUserById, updateUserById, getAllRoles } from "services/userservices";
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
const getCreateUserPage = async (req: Request, res: Response) => {
  const roles = await getAllRoles();
  return res.render("admin/user/create.ejs", {
    roles: roles,
  });
};
//
const postCreateUser = async (req: Request, res: Response) => {
  const { fullName, username, phone, role, address } = req.body;
  const file = req.file;
  const avatar = file?.filename ?? "";
  // handle create user
  await handleCreateUser(fullName, username, address, phone, avatar, role);
  return res.redirect("/admin/user");
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
