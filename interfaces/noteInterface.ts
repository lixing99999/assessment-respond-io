type NoteType = "personal" | "work" | "meeting"

export interface Note {
  type : NoteType,
  content : string
}