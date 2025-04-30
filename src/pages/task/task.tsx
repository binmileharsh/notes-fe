import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react';
import { toast } from "sonner";
import Tablestructure from "./tablestructure";





import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
 DialogTrigger } from "@/components/ui/dialog"; // ensure correct path
import {
  Loader,
  ShieldCheck,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowBigUp,
  ArrowBigDown,
  ChevronsUpDown,
  Activity,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/api/api";


const usericon = {
  done: <Loader className="w-4 h-4 text-gray-500" />,
  pending: <ShieldCheck className="w-4 h-4 text-gray-500" />,
  inprogress: <Loader className="w-4 h-4 text-gray-500" />,
  inreview: <Eye className="w-4 h-4 text-gray-500" />,
};

type UserStatus = "done" | "pending" | "inprogress" | "inreview";

const priorityIcon = {
  high: <ArrowBigUp className="w-4 h-4 text-gray-500" />,
  low: <ArrowBigDown className="w-4 h-4 text-gray-500" />,
  medium: <ChevronsUpDown className="w-4 h-4 text-gray-500" />,
  urgent: <Activity className="w-4 h-4 text-gray-500" />,
};

type PriorityIcon = "high" | "low" | "medium" | "urgent";

interface Task {
  id: number;
  taskId: number;
  description: string;
  status: UserStatus;
  priority: PriorityIcon;
}

function TaskPage() {
  const [tasks, settasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false)

  // Using useEffect to fetch data when the component mounts
  const fetchData = async () => {
    // Fetching the tasks data
    const data = await api.user.get();
    // Check if data exists and is valid
    if (data && data.length > 0) {
      settasks(data);
    } else {
      console.error("No tasks available or error fetching data.");
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []); 
  
  const handledelete=async(id:number)=>{
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        // Instantly remove from UI
        settasks(prev => prev.filter(task => task.id !== id));
  
        // Optional: re-fetch to ensure latest backend state
        fetchData();
  
        toast.success("Task deleted successfully!");
      } else {
        toast.error("Failed to delete the task.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting.");
    }

  }


  return (
    <div className=" w-screen bg-secondary flex ">
      <Card className="w-full">
        <CardHeader>
          
          <CardDescription className="justify-between">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Welcome to Task Management System
      </h1>
            {/* <Link to="/task/create"> */}
              <Button onClick={() => setOpen(true)}>create+</Button>
            {/* </Link> */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tablestructure tasks={tasks} handledelete={handledelete} />
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <span>0 of 100 rows selected</span>

          <div className="flex items-center gap-4">
            <label htmlFor="rows" className="text-sm font-medium">
              Rows per page:
            </label>
            <select
              id="rows"
              style={{ width: "120px" }}
              className="border rounded px-2 py-1"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="60">60</option>
            </select>

            <p className="text-sm text-muted-foreground">Page 1 of 2</p>

            <div className="flex gap-1 items-center">
              <ChevronsLeft className="mr-1" />
              <ChevronLeft className="mr-1" />
              <ChevronRight className="mr-1" />
              <ChevronsRight className="mr-1" />
            </div>
          </div>
        </CardFooter>
      </Card>




      
    </div>
  );
}

export default TaskPage;
