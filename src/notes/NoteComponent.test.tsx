import { render, screen } from "@testing-library/react";
import NoteComponent from "./NoteComponent";

describe("edit note", () => {
  test("note information is displayed", () => {
    const body = "sample body text";
    render(<NoteComponent note={{ id: 1, body: body }} onChange={() => {}} />);

    const noteId = screen.getByTestId("noteId");
    expect(noteId.innerHTML).toBe("Note ID : 1");

    const richTextEditor = screen.getByText(body);
    expect(richTextEditor.innerHTML).toBe(body);
  });
});
