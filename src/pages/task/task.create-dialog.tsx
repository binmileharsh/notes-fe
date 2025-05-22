import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskCreateForm from "./task.create";



import { Dispatch, SetStateAction } from "react";
import { Task } from "./task.types";


interface TaskCreateFormType {
  page:number;
  setPage:Dispatch<SetStateAction<number>>
  limit:number;
  setLimit:Dispatch<SetStateAction<number>>
  openForm: boolean;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
  tasks:Task[]
  setTasks:Dispatch<SetStateAction<Task[]>>
}

export function TaskCreateDialog({ openForm, page,setOpenForm ,setTasks,setLimit,tasks,limit,setPage}: TaskCreateFormType) {

  return (
    <Dialog open={openForm} onOpenChange={setOpenForm}>
      <DialogTrigger asChild>
        <Button>Create +</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <TaskCreateForm  setTasks={setTasks} open={openForm} setOpen={setOpenForm}  page={page} setLimit={setLimit} limit={limit} setPage={setPage}  tasks={tasks}/>
      </DialogContent>
    </Dialog>
  );
}
