export type Note = {
  id: number;
  body: string;
};

export const getNotesBySession = async (session: string): Promise<Note[]> => {
  return await fetch(`https://challenge.leadjet.io/${session}/notes`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const saveNoteBySession = async (
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

export const saveNoteBySessionMock = (
  session: string,
  note: Note,
  noOfNotes: number
): Promise<Note> =>
  Promise.resolve({ id: note.id > -1 ? note.id : noOfNotes, body: note.body });
