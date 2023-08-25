import { RequestHandler } from "express";
import { Repository, getConnection } from "typeorm";
import { User } from "../entities/user";
import bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken'
import { UserService } from "../services/userService";
import { jwtUserInfo } from "../interfaces/userInterface";
import { UserRepository } from "../repositories/userRepository";
import { schemaValidation } from "../validations/schemaValidation";
import { createUserValidation } from "../validations/userValidation";

export const getUsers: RequestHandler = (request, response) => {
  try {
    return response.status(200).send("hello");
  } catch (err) {
    return response.status(500).send(err);
  }
};

export const createUser: RequestHandler = async (request, response) => {
  try {
    const userService = new UserService()

    await schemaValidation(createUserValidation, request.body)

    const connection = getConnection();

    const payload = {
      ...request?.body,
      password: await userService.generatePassword(request.body.password),
    };

    const user = new User();
    Object.assign(user, {
      ...payload,
    });

    const result = await connection.manager.save(user);
    return response.status(200).send(result);
  } catch (err) {
    return response.status(500).send(err);
  }
};

export const login: RequestHandler = async (request, response) => {
  try {
    const userService = new UserService()
    const userRepository = new UserRepository()
    const { username, password } = request.body;

    const user = await userRepository.getUser({ where : { username } })

    if (!user) return response.status(401).json({ message: "Authentication failed" });

    await bcrypt.compare(password, user.password)

    const jwtUserInfo:jwtUserInfo = { id: user.id,  username : user.username, email : user.email, fullname : `${user.first_name} ${user.last_name}` }
    const token = await userService.generateToken(jwtUserInfo)
    return response.status(200).send(token)
  } catch (err) {
    return response.status(500).send(err);
  }
};
