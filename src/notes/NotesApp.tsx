import Note from "./Note";
import "./NotesApp.scss";

export function NotesApp() {
  return (
    <div className="notes-app">
      <header className="notes-app__header">
        <h1>Notes</h1>
      </header>
      <div className="notes-app__notes">
        <Note />
      </div>
    </div>
  );
}

export default NotesApp;
