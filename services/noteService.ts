import { CreateNote, Note } from "../interfaces/noteInterface"

export class NoteService {
    createNote(type: string):Note{
        switch(type){
            case "work" : {
                return new Work()
            }
            case "meeting" : {
                return new Meeting()
            }
            default : {
                return new Personal()
            }
        }
    }
}

class Personal implements Note{
    generateContent(content:string): string {
        return `This is a personal note : ${content}`
    }
}

class Work implements Note{
    generateContent(content:string): string {
        return `This is a work note : ${content}`
    }
}

class Meeting implements Note{
    generateContent(content:string): string {
        return `This is a meeting note : ${content}`
    }
}