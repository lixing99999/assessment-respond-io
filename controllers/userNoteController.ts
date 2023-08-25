import { RequestHandler } from "express";
import { getConnection } from "typeorm";
import Logger from "../config/logger";
import { UserNote } from "../entities/user-note";
import { storeInCache } from "../middlewares/cache";
import { UserNoteRepository } from "../repositories/userNoteRepository";
import { NoteService } from "../services/noteService";
import { createNoteValidation } from "../validations/noteValidation";
import { schemaValidation } from "../validations/schemaValidation";

export const createUserNote:RequestHandler = async (request:any, response) => {
    const logger = Logger.getInstance()
    const noteService = new NoteService()
    const userNoteRepository = new UserNoteRepository()
    try{
        logger.log("request create user note")

        const user = request.user

        await schemaValidation(createNoteValidation, request.body)

        const note = noteService.createNote({ type : request.body.type, content : request.body.note })
        const result = await userNoteRepository.createUserNote({ user_id : user.id, note } as UserNote)

        logger.log("successfully created user note")

        return response.status(200).send(result)
    }catch(err){
        logger.log("failed to create user note")
        return response.status(500).send(err)
    }
}

export const getUserNoteByUserId:RequestHandler = async (request:any, response) => {
    const userNoteRepository = new UserNoteRepository()
    try{

        const user = request.user

        const result = await userNoteRepository.getUserNotes({ where : { user_id : user.id } })
        
        await storeInCache(request.originalUrl, result, 5)

        return response.status(200).send(result)
    }catch(err){
        return response.status(500).send(err)
    }
}

export const getUserNoteById:RequestHandler = async (request:any, response) => {
    const userNoteRepository = new UserNoteRepository()
    try{

        const user = request.user

        const result = await userNoteRepository.getUserNote({ where : { user_id : user.id, id : request?.params?.id } })

        return response.status(200).send(result)
    }catch(err){
        return response.status(500).send(err)
    }
}

export const updateUserNote:RequestHandler = async (request:any, response) => {
    const userNoteRepository = new UserNoteRepository()

    try{

        const user = request.user
        const payload:UserNote = {
            ...request.body
        }

        await userNoteRepository.updateUserNote(payload, request.params.id, user.id)
        const result = await userNoteRepository.getUserNote({ where : { user_id : user.id, id : request.params.id } })

        return response.status(200).send(result)
    }catch(err){
        return response.status(500).send(err)
    }
}

export const deleteUserNote:RequestHandler = async (request:any, response) => {
    const userNoteRepository = new UserNoteRepository()
    try{

        const user = request.user
        await userNoteRepository.deleteUserNote(request.params.id, user.id)
   
        return response.status(200).send("successfully deleted.")
    }catch(err){
        return response.status(500).send(err)
    }
}