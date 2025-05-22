import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Task } from "./task.types";
interface TaskCreateFormType {
  deleteId: number ;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  tasks:Task[];
  setTasks:Dispatch<SetStateAction<Task[]>>;
 

}

export function TaskDeletes({ setTasks,deleteId, open, setOpen }: TaskCreateFormType) {
  const handleDelete = async () => {
    if (deleteId) {
      try {
        const res = await fetch(`http://localhost:3000/tasks/${deleteId}`, {
          method: "DELETE",
        });



        if (!res.ok) {
          toast.error("Task not able to delete.");
        }
        console.log(res)
        setOpen(false);
        toast.success("Task deleted successfully!");
        setTasks(prevTasks => prevTasks.filter(task => task.id !== deleteId));
        
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while deleting.");
      }
    }
  };
  if (!deleteId) return null;
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              task.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
