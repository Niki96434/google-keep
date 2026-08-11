export type Note = {
  id: string;
  user_id: string;
  title: string;
  content: string;
};

export type NotesGetOut = {
  notes: Note[];
};
export type NoteCreateIn = Pick<Note, "user_id" | "title" | "content">;

export type NoteCreateOut = Note;

export type NoteUpdateIn = Partial<Pick<Note, "title" | "content">>;

export type NoteUpdateOut = Note;
