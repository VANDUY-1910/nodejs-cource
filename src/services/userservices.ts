import getConnection from "config/database";
import { name } from "ejs";
import prisma from "config/prisma";
//
const handleCreateUser = async (fullName: string, email: string, address: string) => {
  const newUser = await prisma.user.create({
    data: {
      fullName: fullName,
      username: email,
      address: address,
      password: "",
      accountType: "",
    },
  });
  return newUser;
};
const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id: +id },
  });
  return user;
};

const handleDeleteUser = async (id: string) => {
  const deleteUser = await prisma.user.delete({
    where: { id: +id },
  });
  return deleteUser;
};
//
const updateUserById = async (id: string, fullName: string, email: string, address: string) => {
  const updatedUser = await prisma.user.update({
    where: { id: +id },
    data: {
      fullName: fullName,
      username: email,
      address: address,
      password: "",
      accountType: "",
    },
  });
  return updatedUser;
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, updateUserById };
