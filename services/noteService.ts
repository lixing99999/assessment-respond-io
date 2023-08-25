import { Note } from "../interfaces/noteInterface"

export class NoteService {
    createNote(note: Note):string{
        switch(note.type){
            case "personal" : {
                return this.createPersonalNote(note.content)
            }
            case "work" : {
                return this.createPersonalNote(note.content)
            }
            case "meeting" : {
                return this.createPersonalNote(note.content)
            }
            default : {
                return  `This is a default note : ${note.content}` 
            }
        }
    }

    createPersonalNote(note:string){
        return `This is a personal note : ${note}`
    }

    createWorkNote(note:string){
        return `This is a work note : ${note}`
    }

    createMeetingNote(note:string){
        return `This is a meeting note : ${note}`
    }
}