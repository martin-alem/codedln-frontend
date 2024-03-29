import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ERROR_MESSAGES } from "./constant";
import { IServerError } from "./types";

export function handleServerError(error: FetchBaseQueryError | SerializedError | undefined) {
  if (error && "data" in error) {
    const serverError = error["data"] as IServerError;
    if (serverError.statusCode !== 500) return { statusCode: serverError.statusCode, message: serverError.message };
  }
  return { status: 500, message: ERROR_MESSAGES.GENERIC };
}

export function getInitials(firstname: string, lastname: string): string {
  return firstname.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase();
}

export async function writeClipboardText(text: string, callback: () => void) {
  try {
    await navigator.clipboard.writeText(text);
  } finally {
    callback();
  }
}

export function generateArrayInRange(start: number, end: number): number[] {
  const array = [];
  for (let i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
}
