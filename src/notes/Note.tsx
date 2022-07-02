import "./Note.scss";

const Note = () => (
  <div className="note" data-testid="note">
    <div
      className="note__editable-content"
      contentEditable
      placeholder="Start typing to create your note"
      data-testid="note-editable"
    />
  </div>
);

export default Note;
