import { RequestHandler } from "express";

export const getUsers:RequestHandler = (request, response) => {
    try{
        return response.status(200).send("hello")
    }catch(err){
        return response.status(500).send(err)
    }
}