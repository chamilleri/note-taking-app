import { useEffect, useRef, useState } from "react";
import { getSessionId, useMock } from "../utils";
import {
  getNotesBySession,
  getUsers,
  saveNoteToSession,
  saveNoteToSessionMock,
} from "./api";
import NoteComponent from "./NoteComponent";
import { MentionUsers, Note } from "./types";
import "./NotesApp.scss";

type AddNoteActionProps = {
  className?: string;
  onClick: () => void;
};

const AddNoteAction = ({
  className = "",
  onClick,
  ...rest
}: AddNoteActionProps) => (
  <button className={className} onClick={onClick} {...rest}>
    New Note
  </button>
);

export function NotesApp() {
  const mock = useRef(useMock());
  const [notes, setNotes] = useState<Note[]>([]);
  const [mentionUsers, setMentionUsers] = useState<MentionUsers[]>([]);

  useEffect(() => {
    getNotesBySession(getSessionId()).then((notes) => {
      console.debug("[EFFECT] getNotesBySession (notes)", notes);
      setNotes(notes);
    });
    getUsers().then((data) => {
      setMentionUsers(
        data.map((user) => ({ id: user["username"], value: user["username"] }))
      );
    });
  }, []);

  const addNote = () => {
    saveNote("");
  };

  const saveNote = (body: string, id: number = -1) => {
    console.debug("[SAVE] saveNote (body, id)", body, id);

    const updateState = (savedNote: Note) => {
      const existingNode = notes.find((note) => note.id === savedNote.id);
      if (existingNode) {
        existingNode.body = savedNote.body;
        return;
      }
      setNotes([...notes, savedNote]);
    };

    //TODO: remove mock after api is fixed
    mock.current
      ? saveNoteToSessionMock(
          getSessionId(),
          {
            id: id,
            body: body,
          },
          notes.length
        ).then((savedNote) => {
          console.debug("[PROMISE] saveNote <mock> (savedNote)", savedNote);
          updateState(savedNote);
        })
      : //TODO: invesitgate why a new note is being created on each POST rather than updating note with existing id
        saveNoteToSession(getSessionId(), {
          id: id,
          //workaround to have an empty note as "" is not accepted by the service
          body: body || " ",
        }).then((savedNote) => {
          console.debug("[PROMISE] saveNote (savedNote)", savedNote);
          updateState(savedNote);
        });
  };

  console.debug("[RENDER NOTESAPP] (notes, mock)", notes, mock.current);

  return (
    <div
      data-testid="notesApp"
      className={"notes-app" + (notes.length === 0 ? " notes-app--init" : "")}
    >
      <header className="notes-app__header">
        <h1>Notes</h1>
        <AddNoteAction
          className="notes-app__add-new-note"
          onClick={() => addNote()}
          data-testid="addNoteInHeader"
        />
      </header>

      <div className="notes-app__notes">
        {notes.map((note) => (
          <NoteComponent
            key={"note" + note.id}
            note={note}
            onChange={(body) => saveNote(body, note.id)}
            mentionUsers={mentionUsers}
          />
        ))}

        <AddNoteAction
          className="notes-app__add-new-note"
          onClick={() => addNote()}
          data-testid="addNoteInNotes"
        />
      </div>
    </div>
  );
}

export default NotesApp;
