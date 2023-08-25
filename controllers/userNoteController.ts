import { RequestHandler } from "express";
import { getConnection } from "typeorm";
import Logger from "../config/logger";
import { UserNote } from "../entities/user-note";
import { storeInCache } from "../middlewares/cache";
import { NoteService } from "../services/noteService";
import { createNoteValidation } from "../validations/noteValidation";
import { schemaValidation } from "../validations/schemaValidation";

export const createUserNote:RequestHandler = async (request:any, response) => {
    const logger = Logger.getInstance()
    const noteService = new NoteService()
    try{
        logger.log("request create user note")

        const user = request.user

        await schemaValidation(createNoteValidation, request.body)

        const connection = getConnection();

        const note = noteService.createNote({ type : request.body.type, content : request.body.note })

        const userNote = new UserNote();
         Object.assign(userNote, {
            user_id : user.id,
            note
         });

        const result = await connection.manager.save(userNote);
        logger.log("successfully created user note")
        return response.status(200).send(result)
    }catch(err){
        logger.log("failed to create user note")
        return response.status(500).send(err)
    }
}

export const getUserNoteByUserId:RequestHandler = async (request:any, response) => {
    try{

        const user = request.user

        const connection = getConnection();
        const result = await connection.manager.find(UserNote, { where : { user_id : user.id } });
        
        await storeInCache(request.originalUrl, result, 5)

        return response.status(200).send(result)
    }catch(err){
        return response.status(500).send(err)
    }
}

export const getUserNoteById:RequestHandler = async (request:any, response) => {
    try{

        const user = request.user

        const connection = getConnection();
        const result = await connection.manager.find(UserNote, { where : { user_id : user.id, id : request?.params?.id } });

        return response.status(200).send(result)
    }catch(err){
        return response.status(500).send(err)
    }
}

export const updateUserNote:RequestHandler = async (request:any, response) => {
    try{

        const user = request.user

        console.log(request.body)

        const connection = getConnection();
        const userNote = new UserNote();
         Object.assign(userNote, {
            user_id : user.id,
           ...request.body,
         });

         console.log(userNote)
     
         await connection.manager.update(UserNote, { user_id : user.id, id : request.params.id }, userNote);

         const result = await connection.manager.find(UserNote, { where : {  user_id : user.id  } })

        return response.status(200).send(result)
    }catch(err){
        return response.status(500).send(err)
    }
}

export const deleteUserNote:RequestHandler = async (request:any, response) => {
    try{

        const user = request.user

        const connection = getConnection();
     
         await connection.manager.delete(UserNote, { user_id : user.id, id : request.params.id });
         
        return response.status(200).send("successfully deleted.")
    }catch(err){
        return response.status(500).send(err)
    }
}