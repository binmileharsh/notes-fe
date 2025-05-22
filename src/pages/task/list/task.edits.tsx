import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Task } from "../task.types";
import {
  Activity,
  ArrowBigUp,
  ArrowDown,
  ArrowRight,
  CircleCheck,
  CircleDotDashed,
  Eye,
  Loader,
} from "lucide-react";

const formSchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  priority: z.string().min(1, { message: "Priority is required" }),
});

type FormValues = z.infer<typeof formSchema>;
type editScheme = {
  activeTaskId: number;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function TaskEditForm({
  tasks,
  setTasks,
  activeTaskId,
  setOpen,
}: editScheme) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      priority: "",
      status: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch(
        `http://localhost:3000/tasks/${activeTaskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const updated = await response.json();
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === activeTaskId ? updated : task))
        );
        setOpen(false);
        form.reset();
      } else {
        console.log("Update failed");
      }
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`http://localhost:3000/tasks/${activeTaskId}`);
        const data = await res.json();

        form.setValue("description", data?.description);
        form.setValue("priority", data?.priority);
        form.setValue("status", data?.status);
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    };

    fetchTask();
  }, [activeTaskId, form]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea placeholder="Enter task description" {...field} />
                </FormControl>
                <FormDescription>Briefly describe the task.</FormDescription>
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
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className="w-full" aria-label="Select task status" tabIndex={0}>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="in-review">
                        <Eye className="w-4 h-4 text-gray-500" />
                        In Review
                      </SelectItem>
                      <SelectItem value="in-progress">
                        <Loader className="w-4 h-4 text-gray-500" />
                        In Progress
                      </SelectItem>
                      <SelectItem value="done">
                        <CircleCheck className="w-4 h-4 text-gray-500" />
                        Done
                      </SelectItem>
                      <SelectItem value="pending">
                        <CircleDotDashed className="w-4 h-4 text-gray-500" />
                        Pending
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>Current status of the task.</FormDescription>
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
                >
                  <SelectTrigger className="w-full" aria-label="Select task priority" tabIndex={0}>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Priority</SelectLabel>
                      <SelectItem value="low">
                        <ArrowDown className="w-4 h-4 text-gray-500 mr-2" />
                        Low
                      </SelectItem>
                      <SelectItem value="medium">
                        <ArrowRight className="w-4 h-4 text-gray-500 mr-2" />
                        Medium
                      </SelectItem>
                      <SelectItem value="high">
                        <ArrowBigUp className="w-4 h-4 text-gray-500 mr-2" />
                        High
                      </SelectItem>
                      <SelectItem value="urgent">
                        <Activity className="w-4 h-4 text-gray-500 mr-2" />
                        Urgent
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>Set the priority level.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
