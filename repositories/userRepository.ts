import { object } from "joi";
import { getConnection } from "typeorm";
import { User } from "../entities/user";

export class UserRepository {
    async getUser(filter:any){
        const connection = await getConnection();
        const user: any = await connection.manager.findOne(User, filter);
        return user
    }

    async createUser(body:object){
        const connection = await getConnection();

        const user = new User();
        Object.assign(user, {
          ...body,
        });
    
        return await connection.manager.save(user);
    }
}