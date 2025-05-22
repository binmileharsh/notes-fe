export type UserStatus = "done" | "pending" | "inprogress" | "inreview";
export type PriorityIcon = "high" | "low" | "medium" | "urgent";

export interface Task {
  id: number;
  taskId: string;
  description: string;
  status: "done" | "pending" | "in-progress" | "in-review";
  priority: "low" | "medium" | "high" | "urgent";
  badge: string;
}


