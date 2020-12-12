
enum CompletitionStatus {
  NotCompleted = "NOT_COMPLETED",
  InProgress = "IN_PROGRESS",
  Completed = "COMPLETED",
}

interface Todo {
  description: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
  completitionStatus: CompletitionStatus
}

export { CompletitionStatus };

export type { Todo };
