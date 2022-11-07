/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

// import { type User, type UserCredential } from "firebase/auth";
import { atom } from "recoil";
// import { useOpenLoginDialog } from "../dialogs/LoginDialog.js";

type User = string;

export const CurrentUser = atom<User>({
  key: "CurrentUser",
  default: "",
});

// export function useCurrentUser() {
//   const value = useRecoilValueLoadable(CurrentUser);
//   return value.state === "loading" ? undefined : value.valueOrThrow();
// }

// export function useSignOut() {
//   return React.useCallback(() => auth.signOut(), []);
// }
