import { v4 as uuidv4 } from "uuid";

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
