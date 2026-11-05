import { name } from "ejs";
import prisma from "config/prisma";
import { ACCOUNT_TYPE } from "config/constant";
import bcrypt from "bcrypt";
const saltRounds = 10;
// hash password
const hashPassword = async (plainText: string) => {
  return await bcrypt.hash(plainText, saltRounds);
};

//
const handleCreateUser = async (fullName: string, email: string, address: string, phone: string, avatar: string, role: string) => {
  const defaultPassword = await hashPassword("123456");
  const newUser = await prisma.user.create({
    data: {
      fullName: fullName,
      username: email,
      address: address,
      password: defaultPassword,
      accountType: ACCOUNT_TYPE.SYSTEM,
      avatar: avatar,
      phone: phone,
      roleId: +role, // "2" -> 2
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
//
const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};
//
const getAllRoles = async () => {
  const roles = await prisma.role.findMany();
  return roles;
};

export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, updateUserById, getAllRoles, hashPassword };
