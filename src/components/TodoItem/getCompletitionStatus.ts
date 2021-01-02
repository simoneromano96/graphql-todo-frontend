import { CompletitionStatus } from "../../models/todo";

export const getCompletitionStatus = (status: "0" | "1" | "2"): CompletitionStatus => {
  let result: CompletitionStatus

  switch (status) {
    case "0":
      result = CompletitionStatus.NotCompleted
      break
    case "1":
      result = CompletitionStatus.InProgress
      break
    case "2":
      result = CompletitionStatus.Completed
      break
  }

  return result
}