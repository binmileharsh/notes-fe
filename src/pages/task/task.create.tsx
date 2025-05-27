import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Dispatch, SetStateAction, use, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const taskSchema = z.object({
 
  description: z.string().min(1, "Description is required"),
  status: z.enum(["done", "pending", "in-progress", "in-review"], {
    required_error: "Status is required",
  }),
  priority: z.enum(["low", "medium", "high", "urgent"], {
    required_error: "Priority is required",
  }),
  badge: z.string().optional(),
  userId: z.number().int(),
});

type TaskFormValues = z.infer<typeof taskSchema>;
import { Task } from "./task.types";
import { useAuth } from "@/context/authcontext";


interface TaskCreateFormType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  page: number;
  limit: number;
  setPage: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
}

function TaskCreateForm({
  setTasks,
  setOpen,
  page,
  // open,
  limit,
  // setLimit,
  // tasks
}: TaskCreateFormType) {
  const{user}=useAuth()
    const{setUserid}=useAuth()
    const{userid}=useAuth()

  useEffect(() => {
   
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/verify?email=${user}`);
        const data = await response.json();
        console.log("User data from verify endpoint:", data);
        const userid=data.id
        setUserid(userid)
        console.log(data.id)
        
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    if (user) {
      fetchUser();
    }
  }, [user]);
  
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      description: "",
      status: "pending",
     
      priority: "low", 
      badge:"",
      userId:0
    },
    
  });
  const token = localStorage.getItem("token");
  async function getAllItems() {
    try {
      const response = await fetch(
        `http://localhost:3000/tasks/all?page=${page}&limit=${limit}&userid=${userid}`,
      );
      const data = await response.json();
      console.log(data)
      console.log("All items:", data);
      setTasks(data.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const onSubmit = async (data: TaskFormValues) => {
    data.userId = parseInt(userid); 
    
    try {
      const response = await fetch("http://localhost:3000/tasks/add", {
        method: "POST",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`  
         },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Task created!");
        getAllItems()
      
        setOpen(false);
        form.reset();

       

        
      } else {
        toast.error("Failed to create task.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      

      <FormField
  control={form.control}
  name="description"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Description</FormLabel>
      <FormControl>
        <textarea placeholder="Enter Description" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[470px]">
                      <SelectValue placeholder="Select a STATUS" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>STATUS</SelectLabel>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">Inprogress</SelectItem>
                      <SelectItem value="in-review">in-review</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-[470px]">
                    <SelectValue placeholder="Select a PRIORITY" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>PRIORITY</SelectLabel>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="badge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Badge</FormLabel>
              <FormControl>
                <Input placeholder="Badge" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default TaskCreateForm;