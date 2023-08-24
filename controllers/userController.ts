import { RequestHandler } from "express";
import { Repository, getConnection } from "typeorm";
import { User } from "../entities/user";
import bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken'
import { v4 } from 'uuid'

export const getUsers: RequestHandler = (request, response) => {
  try {
    return response.status(200).send("hello");
  } catch (err) {
    return response.status(500).send(err);
  }
};

export const createUser: RequestHandler = async (request, response) => {
  try {
    const connection = getConnection();
    const body = request?.body;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(body.password, salt);

    const payload = {
      ...request?.body,
      password: password,
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
    const { username, password } = request.body;
    console.log(username)
    // Find the user by username
    const connection = await getConnection();
    const user: any = await connection.manager.findOne(User, {
      where: {
        username: username,
      },
    });

    if (!user) {
      return response.status(401).json({ message: "Authentication failed" });
    }
    
    // Compare the provided password with the stored hash
    const result = bcrypt.compare(password, user.password)

    const jwt_token = jwt.sign({
      id : user.id,
      username : user.username,
      email : user.email,
      fullname : `${user.first_name} ${user.lastname}`
    }, "yeAlI1njRFoawFkx4KtdjaOkXKna6N1p6Mbx8I3W5QsyhawczaojxZmrlBnjW3tG")


    return response.status(200).send(jwt_token)
  } catch (err) {
    return response.status(500).send(err);
  }
};
