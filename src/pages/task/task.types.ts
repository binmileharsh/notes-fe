
export type UserStatus = "done" | "pending" | "inprogress" | "inreview";
 export type PriorityIcon = "high" | "low" | "medium" | "urgent";

 export interface Task {
    id: number;
    taskId: number;
    description: string;
    status: UserStatus;
    priority: PriorityIcon;
  }

export interface TableStructureType {
    tasks: Task[];
    handledelete: any;
  }
