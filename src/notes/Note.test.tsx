import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Note from "./Note";

describe("edit note", () => {
  test("modify note", () => {
    render(<Note onChange={() => {}} />);

    const noteEditable = screen.getByTestId("note-editable");
    expect(noteEditable).toBeEmptyDOMElement();

    const testText = "test";
    userEvent.type(noteEditable, testText);
    expect(noteEditable.innerHTML).toBe(testText);
  });
});
