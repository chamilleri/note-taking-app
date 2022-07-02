import { render, screen } from "@testing-library/react";
import NotesApp from "./NotesApp";

describe("initial state", () => {
  test("renders heading", () => {
    render(<NotesApp />);
    const headingElement = screen.getByRole("heading", { level: 1 });
    expect(headingElement).toBeInTheDocument();
  });

  test("renders one note", () => {
    const { container } = render(<NotesApp />);

    const notes = screen.getAllByTestId("note");
    expect(notes.length).toBe(1);
    expect(container).toContainElement(notes[0]);

    const noteEditable = screen.getByTestId("note-editable");
    expect(noteEditable).toBeEmptyDOMElement();
  });
});
