import React, { useState } from 'react';
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function TaskCreatePage() {
  // State to store form data
  const [formData, setFormData] = useState({
    taskId: '',
    description: '',
    status: '',
    priority: ''
  });

  // Update the form data whenever the user types
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,                    // Keep existing form data
      [e.target.name]: e.target.value // Update the specific field
    });
  };

  // Handle the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // Prevents page refresh
    console.log("Form data submitted:", formData);
    if(formData.description=="" ||formData.priority==""||formData.status=="") {
      toast.error("description dede bhai")
      return
    }
    if(formData.taskId ==''){

      toast.error("id likh pehle")
      return
    }

    try {
      const response = await fetch('http://localhost:3000/tasks/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData) // Send the form data as JSON
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Task created successfully:", data);
        toast.success("Form submitted successfully!");

        // Reset form after successful submission
        setFormData({
          taskId: '',
          description: '',
          status: '',
          priority: ''
        });
      } else {
        console.error("Error creating task:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (

    <Card className="w-full h-full ">
  <CardHeader  className='  text-3xl'>
  <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Welcome to Task Management System
      </h1>
  </CardHeader>
  <CardContent>
  <div className="p-6 w-full h-full bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold t mb-6 text-black">Task Form</h2>
      <form  className=" text-black" onSubmit={handleSubmit}>
        {/* Task ID Input */}
        <div className="mb-4">
          <label htmlFor="taskId" className="block text-sm font-medium text-gray-700">Task ID</label>
          <input
            id="taskId"
            name="taskId"
            type="text"
            value={formData.taskId}
            onChange={handleChange}
            placeholder="Enter Task ID"
            className="mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Description"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Status Input (Text Field) */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <input
            id="status"
            name="status"
            type="text"
            value={formData.status}
            onChange={handleChange}
            placeholder="Enter Status (e.g. In Progress)"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Priority Input (Text Field) */}
        <div className="mb-6">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
          <input
            id="priority"
            name="priority"
            type="text"
            value={formData.priority}
            onChange={handleChange}
            placeholder="Enter Priority (e.g. High, Medium, Low)"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>





















   
  );
}

export default TaskCreatePage;
