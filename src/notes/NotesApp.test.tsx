import { render, screen } from "@testing-library/react";
import NotesApp from "./NotesApp";

describe("initial state", () => {
  test("renders heading", () => {
    render(<NotesApp />);
    const headingElement = screen.getByRole("heading", { level: 1 });
    expect(headingElement).toBeInTheDocument();
  });

  test("renders no note", () => {
    render(<NotesApp />);

    const note = screen.queryByTestId("note");
    expect(note).toBeNull();
  });

  test("renders add note button in notes section", () => {
    render(<NotesApp />);

    const notesApp = screen.getByTestId("notesApp");
    expect(notesApp.classList).toContain("notes-app--init");

    const addNoteInNotes = screen.getByTestId("addNoteInNotes");
    expect(addNoteInNotes).toBeVisible();
  });
});
