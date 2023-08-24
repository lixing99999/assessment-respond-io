import { RequestHandler } from "express";
import { getConnection } from "typeorm";
import { UserNote } from "../entities/user-note";

export const createUserNote:RequestHandler = async (request:any, response) => {
    try{

        const user = request.user

        console.log(user)

        const connection = getConnection();
        const userNote = new UserNote();
         Object.assign(userNote, {
            user_id : user.id,
           ...request.body,
         });

         console.log(userNote)
     
         const result = await connection.manager.save(userNote);

        return response.status(200).send(result)
    }catch(err){
        return response.status(500).send(err)
    }
}

// api/user/:id/note
// api/note

export const getUserNoteById:RequestHandler = async (request:any, response) => {
    try{

        const user = request.user

        const connection = getConnection();
        const result = await connection.manager.find(UserNote, { where : { user_id : user.id } });

        return response.status(200).send(result)
    }catch(err){
        return response.status(500).send(err)
    }
}