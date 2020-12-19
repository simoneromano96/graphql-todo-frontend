import { CompletitionStatus } from "../../models/todo";

export const getSliderValue = (completitionStatus: CompletitionStatus) : number => {
  let result;
  switch (completitionStatus) { 
    case CompletitionStatus.NotCompleted:
      result = 0
      break
    case CompletitionStatus.InProgress:
      result = 1
      break
    case CompletitionStatus.Completed:
      result = 2
      break
  }
  
  return result
}
