import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { UserService } from "../services/userService";
import { jwtUserInfo } from "../interfaces/userInterface";
import { UserRepository } from "../repositories/userRepository";
import { schemaValidation } from "../validations/schemaValidation";
import { createUserValidation } from "../validations/userValidation";
import Logger from "../config/logger";

export const getUser: RequestHandler = async (request:any, response) => {
  const logger = Logger.getInstance()
  logger.log("request get user")
  try {
    const userRepository = new UserRepository()
    const result = await userRepository.getUser({ where : { id : request.user.id } })
    logger.log("successfully get user")
    return response.status(200).send(result);
  } catch (err) {
    logger.log("failed to get user")
    return response.status(500).send(err);
  }
};

export const createUser: RequestHandler = async (request, response) => {
  const logger = Logger.getInstance()
  logger.log("request create user")
  try {
    const userService = new UserService()
    const userRepository = new UserRepository()

    await schemaValidation(createUserValidation, request.body)

    const userExist = await userRepository.getUser({ where : {  username : request.body.username, email : request.body.email  } })
    if(userExist) throw new Error("user already exist")

    const payload = {
      ...request?.body,
      password: await userService.generatePassword(request.body.password),
    };

    const result = await userRepository.createUser(payload)
    logger.log("successfully create user")
    return response.status(200).send(result);
  } catch (err:any) {
    const error = err.message ?? err
    logger.log("failed to create user")
    return response.status(500).send(error);
  }
};

export const login: RequestHandler = async (request, response) => {
  const logger = Logger.getInstance()
  logger.log("request login")
  try {
    const userService = new UserService()
    const userRepository = new UserRepository()
    const { username, password } = request.body;

    const user = await userRepository.getUser({ where : { username } })

    if (!user) return response.status(401).json({ message: "Authentication failed" });

    await bcrypt.compare(password, user.password)

    const jwtUserInfo:jwtUserInfo = { id: user.id,  username : user.username, email : user.email, fullname : `${user.first_name} ${user.last_name}` }
    const token = await userService.generateToken(jwtUserInfo)
    logger.log("successfully login")
    return response.status(200).send(token)
  } catch (err) {
    logger.log("failed to login")
    return response.status(500).send(err);
  }
};
