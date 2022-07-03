import { useEffect, useRef, useState } from "react";
import { getSessionId, useMock } from "../utils";
import {
  getNotesBySession,
  Note as NoteType,
  saveNoteBySession,
  saveNoteBySessionMock,
} from "./api";
import { uniqueId } from "lodash";
import Note from "./Note";
import "./NotesApp.scss";

export function NotesApp() {
  const mock = useRef(useMock());
  const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    getNotesBySession(getSessionId()).then((notes) => {
      console.debug("[EFFECT] getNotesBySession (notes)", notes);
      setNotes(notes);
    });
  }, []);

  const saveNote = (body: string, id: number = -1) => {
    console.debug("saveNote (body, id)", body, id);
    const noteToSave = {
      id: id,
      body: body,
    };

    const updateState = (exists: boolean, savedNote: NoteType) => {
      setNotes(
        exists
          ? notes.map((note) => (note.id === savedNote.id ? savedNote : note))
          : [...notes, savedNote]
      );
    };

    //TODO: remove mock after api is fixed
    mock.current
      ? saveNoteBySessionMock(getSessionId(), noteToSave, notes.length).then(
          (savedNote) => {
            console.debug("[PROMISE] saveNote <mock> (savedNote)", savedNote);
            updateState(id !== -1, savedNote);
          }
        )
      : saveNoteBySession(getSessionId(), noteToSave).then((savedNote) => {
          console.debug("[PROMISE] saveNote (savedNote)", savedNote);
          //TODO: invesitgate why a new note is being created on each POST rather than updating note with existing id
          updateState(
            notes.find((note) => note.id === savedNote.id) !== undefined,
            savedNote
          );
        });
  };

  console.debug("[RENDER] (notes, mock)", notes, mock.current);
  return (
    <div className="notes-app">
      <header className="notes-app__header">
        <h1>Notes</h1>
      </header>

      <div className="notes-app__notes">
        {notes.map((note) => (
          <Note
            key={"note" + note.id}
            note={note}
            onChange={(body) => saveNote(body, note.id)}
          />
        ))}
        <Note key={uniqueId("new")} onChange={(body) => saveNote(body)} />
      </div>
    </div>
  );
}

export default NotesApp;
