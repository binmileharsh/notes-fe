
import { Dispatch, SetStateAction } from "react";
import { useEffect,useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog";


interface TaskViewType {
  activeTaskId: number ;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface View{
    description:string;
    status:string;
    priority:string
}
function Taskview({activeTaskId,open,setOpen}:TaskViewType){
const[data,setData]=useState<View>()

useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`http://localhost:3000/tasks/${activeTaskId}`);
        const taskData:View= await res.json();
        console.log("Fetched task:", data);
        
        setData(taskData)
        
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    };

    fetchTask();
  },[activeTaskId]);












    return(<>
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="sm:max-w-[425px] text-left">
    <DialogHeader>
      <DialogTitle>This is All About Your Task</DialogTitle>
      <DialogDescription>
        These are the tasks you added to do.
      </DialogDescription>
    </DialogHeader>

    <div className="space-y-4 mt-4">
      <div>
        <h1 className="text-lg font-semibold">
          Task Description: <span className="font-normal">{data?.description}</span>
        </h1>
      </div>

      <div>
        <h1 className="text-lg font-semibold">
          Task Status: <span className="font-normal">{data?.status}</span>
        </h1>
      </div>

      <div>
        <h1 className="text-lg font-semibold">
          Priority Level: <span className="font-normal">{data?.priority}</span>
        </h1>
      </div>
    </div>
  </DialogContent>
</Dialog>



    </>)
}
export default Taskview