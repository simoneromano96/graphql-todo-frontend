
enum CompletitionStatus {
  NotCompleted = "NOT_COMPLETED",
  InProgress = "IN_PROGRESS",
  Completed = "COMPLETED",
}

interface ITodo {
  id: string
  description: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
  completitionStatus: CompletitionStatus
}

class Todo implements ITodo {
  id!: string;
  description!: string;
  completed!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  completitionStatus!: CompletitionStatus;
}

export { CompletitionStatus, Todo };

export type { ITodo };
