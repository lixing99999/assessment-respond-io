import { getConnection } from "typeorm";
import { deleteUserNote } from "../controllers/userNoteController";
import { UserNote } from "../entities/user-note";

export class UserNoteRepository {
    async getUserNotes(filter:object){
        const connection = getConnection();
        return await connection.manager.find(UserNote, filter);
    }

    async getUserNote(filter:object){
        const connection = getConnection();
        return await connection.manager.findOne(UserNote, filter);
    }

    async createUserNote(body:UserNote){
        const connection = getConnection();

        const userNote = new UserNote();
         Object.assign(userNote, body);

        const result = await connection.manager.save(userNote);
    }

    async updateUserNote(body:UserNote, id:string, userId:string){
        const connection = getConnection();
        await connection.manager.update(UserNote, { user_id : userId, id : id }, body);
    }

    async deleteUserNote(id:string, userId:string){
        const connection = getConnection();
        await connection.manager.delete(UserNote, { user_id : userId, id : id });
    }
}