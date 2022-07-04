export type Note = {
  id: number;
  body: string;
};

export type MentionUsers = {
  id: string;
  value: string;
};

export type NoteChangeHandler = (body: string) => void;
