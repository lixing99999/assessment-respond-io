import { RequestHandler } from 'express'
import _ from 'lodash'
import * as redis from 'redis'
import Logger from '../config/logger'

const logger = Logger.getInstance()
const client = redis.createClient({
    url : 'redis://localhost:6379'
})

client.connect()
client.on("connect", () => {
    logger.log("redis client connected")
})

client.on("error", (err) => {
    logger.log(err)
})

export const cacheMachanism:RequestHandler = async (request, response, next) => {
    const key = request.originalUrl
    const data:any = await client.get(key)
    if(_.isEmpty(data)) {
        console.log("next")
        next()
    }
    else {
        console.log("cahced")
        response.send(JSON.parse(data))
    }
}


export const storeInCache = (key:any, data:any, expirationInSeconds:any) => {
    client.setEx(key, expirationInSeconds, JSON.stringify(data))
}