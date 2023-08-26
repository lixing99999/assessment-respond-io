import bcrypt from "bcrypt";
import { jwtUserInfo } from "../interfaces/userInterface";
import jwt from 'jsonwebtoken'

export class UserService {
    async generatePassword(password:string){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash
    }

    async generateToken(payload:jwtUserInfo){
        return await jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn : '10h' })
    }
}