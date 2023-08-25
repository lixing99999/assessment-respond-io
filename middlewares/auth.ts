import { RequestHandler, Request} from 'express';
import * as jwt from 'jsonwebtoken';
import _ from 'lodash'

export const auth:RequestHandler = (request:any, response:any, next:any) => {

  const excludePath = ["/api/login", '/api/user']
  if(request.method == "POST" && _.includes(excludePath, request.path)) return next()

  const token = request.header('Authorization');

  if (!token) {
    return response.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.SECRET_KEY as any, (err:any, decoded:any) => {
    if (err) {
      return response.status(403).json({ message: 'Failed to authenticate token' });
    }

    request.user = decoded
    next(); 
  });
}
