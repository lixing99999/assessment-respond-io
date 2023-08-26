type NoteType = "personal" | "work" | "meeting"

export interface CreateNote {
  type : NoteType,
  content : string
}

export interface Note {
  generateContent(content:string) : string
}