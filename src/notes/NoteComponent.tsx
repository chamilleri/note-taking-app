import RichTextEditor from "./RichTextEditor";
import { MentionUsers, Note, NoteChangeHandler } from "./types";
import "./NoteComponent.scss";

type NoteComponentProps = {
  note: Note;
  onChange: NoteChangeHandler;
  mentionUsers?: MentionUsers[];
};

const NoteComponent = ({
  note,
  onChange,
  mentionUsers = [],
}: NoteComponentProps) => {
  const newNote = note?.id === undefined;
  return (
    <div className="note" data-testid="note">
      <RichTextEditor
        note={note}
        onChange={onChange}
        mentionUsers={mentionUsers}
      />
      {!newNote && (
        <div className="note__id" data-testid="noteId">
          Note ID : {note.id}
        </div>
      )}
    </div>
  );
};

export default NoteComponent;
