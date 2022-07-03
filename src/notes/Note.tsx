import { Note as NoteType } from "./api";
import "./Note.scss";
import debounce from "lodash/debounce";
import parse from "html-react-parser";

const CHANGE_DELAY_MS = 1000;

type ChangeHandler = (body: string) => void;
type NoteProps = {
  note?: NoteType;
  onChange: ChangeHandler;
};

const saveDebounce = debounce((onChange: ChangeHandler, body: string) => {
  console.debug("[DEBOUNCE] (body)", body);
  onChange(body);
}, CHANGE_DELAY_MS);

const Note = ({ note, onChange }: NoteProps) => {
  const newNote = note?.id === undefined;
  return (
    <div className={"note" + (newNote ? " note--new" : "")} data-testid="note">
      <div
        className="note__editable-content"
        contentEditable
        suppressContentEditableWarning
        placeholder="Start typing to create your note"
        data-testid="note-editable"
        onKeyUp={(e) => {
          saveDebounce(onChange, e.currentTarget.innerHTML);
        }}
      >
        {parse(note?.body || "")}
      </div>
      {!newNote && <div className="note__id">Note ID : {note.id}</div>}
    </div>
  );
};

export default Note;
