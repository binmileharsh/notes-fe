import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";




import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const TaskDetails = () => {
  const [x, setx] = useState({});

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${id}`); // ID yahan fix hai, chahe to dynamic bana le
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setx(data);

        // console.log('Task data:', data);
        console.log(x);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [id]);
  useEffect(() => {
    console.log(x); // Ye updated x ko log karega
  }, [x]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(x),
      });

      const result = await response.json();
      toast.success(`TASK UPDATED SUCCESSFULLY for id:${id}!`);
      console.log("Task submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Welcome to Task Management System
      </h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Task ID
              </label>
              <input
                type="text"
                defaultValue={x.taskId}
                onChange={(e) => setx({ ...x, taskId: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <input
                type="text"
                defaultValue={x.status}
                onChange={(e) => setx({ ...x, status: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <input
                type="text"
                defaultValue={x.priority}
                onChange={(e) => setx({ ...x, priority: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                defaultValue={x.description}
                onChange={(e) => setx({ ...x, description: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <Link to="/task">  <Button onClick={handleUpdate} className="w-full mt-4">
              Update Task
            </Button></Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDetails;
