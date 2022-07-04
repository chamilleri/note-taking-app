import ReactQuill, { Quill } from "react-quill";
//@ts-ignore
import QuillMention from "quill-mention";
import { getTopMatchingMentions } from "../utils";
import { MentionUsers, Note, NoteChangeHandler } from "./types";
import { encode, decode } from "html-entities";
import debounce from "lodash/debounce";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.scss";

const CHANGE_DELAY_MS = 3000;
const NO_OF_MENTION_SUGGESTIONS = 5;

const debounceNoteChanges = debounce(
  (onChange: NoteChangeHandler, body: string) => {
    console.debug("[DEBOUNCE] (body)", body);
    onChange(encode(body));
  },
  CHANGE_DELAY_MS
);

Quill.register("modules/mentions", QuillMention);

type RichTextEditorProps = {
  note?: Note;
  onChange: NoteChangeHandler;
  mentionUsers?: MentionUsers[];
};

const RichTextEditor = ({
  note,
  onChange,
  mentionUsers = [],
}: RichTextEditorProps) => {
  const mentionModule = {
    allowedChars: /^[A-Za-z\s0-9]*$/,
    mentionDenotationChars: ["@"],
    source: function (
      searchTerm: string,
      renderItem: (matches: MentionUsers[], searchTerm: string) => void
    ) {
      if (searchTerm.trim().length === 0) {
        renderItem([], searchTerm);
        return;
      }
      if (mentionUsers) {
        const matches = getTopMatchingMentions(
          searchTerm,
          mentionUsers,
          NO_OF_MENTION_SUGGESTIONS
        );
        console.debug(
          "[MENTION] (searchTerm, matches,ratings)",
          searchTerm,
          matches
        );
        renderItem(matches, searchTerm);
      }
    },
  };

  return (
    <ReactQuill
      data-testid="richTextEditor"
      className="rich-text-editor"
      theme="snow"
      preserveWhitespace
      value={decode(note?.body ?? "")}
      modules={{ mention: mentionModule }}
      onChange={(content, delta, source, editor) => {
        console.debug(
          "[ONCHANGE RTE] (content, delta,source,editor)",
          content,
          delta,
          source,
          editor
        );
        debounceNoteChanges(onChange, content);
      }}
    />
  );
};

export default RichTextEditor;
