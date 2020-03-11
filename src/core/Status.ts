export const enum StatusLevel {
  Success = "Success",
  Failure = "Failure"
}

export type StatusString = keyof typeof StatusLevel;
