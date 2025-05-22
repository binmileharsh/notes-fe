
import { Dispatch, SetStateAction } from "react";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import TaskEditForm from "./task.edits";

import { Task } from "../task.types";

interface TaskCreateFormType {
  activeTaskId: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  tasks:Task[];
  setTasks:Dispatch<SetStateAction<Task[]>>;
}

export function TaskEdit({ tasks,setTasks,activeTaskId, open, setOpen }: TaskCreateFormType) {
  console.log(tasks)
  
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>want to edit your tasks</DialogDescription>
          </DialogHeader>
          {/* <GetTaskById id={activeTaskId}/> */}
          <TaskEditForm  tasks={tasks} setTasks={setTasks} activeTaskId={activeTaskId} setOpen={setOpen}/>
          <DialogFooter>
            
            
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
