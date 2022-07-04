import { Note } from "./types";

export const getNotesBySession = async (session: string): Promise<Note[]> => {
  return await fetch(`https://challenge.leadjet.io/${session}/notes`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const saveNoteToSession = async (
  session: string,
  note: Note
): Promise<Note> => {
  console.debug("[API] saveNoteBySession (note)", note);
  //TODO: invesitgate why a new note is being created on each POST rather than updating note with existing id
  return await fetch(`https://challenge.leadjet.io/${session}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  }).then((response) => response.json());
};

//TODO: remove mock after api is fixed
export const saveNoteToSessionMock = (
  session: string,
  note: Note,
  noOfNotes: number
): Promise<Note> =>
  Promise.resolve({ id: note.id > -1 ? note.id : noOfNotes, body: note.body });

export const getUsers = async (): Promise<[]> => {
  return await fetch("https://challenge.leadjet.io/users")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
