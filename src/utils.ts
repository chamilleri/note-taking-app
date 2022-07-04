import { MentionUsers } from "./notes/types";
import { v4 as uuidv4 } from "uuid";
import { findBestMatch } from "string-similarity";

const SID_ID = "SID";

const createSessionId = (): string => {
  const sid = uuidv4();
  sessionStorage.setItem(SID_ID, sid);
  return sid;
};

export const getSessionId = (): string => {
  const sid = sessionStorage.getItem(SID_ID);
  return sid || createSessionId();
};

export const useMock = (): boolean => {
  let params = new URLSearchParams(document.location.search);
  return params.get("mock") !== null;
};

export const getTopMatchingMentions = (
  searchTerm: string,
  mentionUsers: MentionUsers[],
  noOfMatches: number
): MentionUsers[] => {
  const ratings = findBestMatch(
    searchTerm,
    mentionUsers.map((option) => option.id)
  ).ratings;
  const sorted = ratings.sort((a, b) => b.rating - a.rating);
  const top = sorted.slice(0, Math.min(noOfMatches, sorted.length));
  return mentionUsers.filter((mention) =>
    top.find((match) => match.target === mention.id)
  );
};
