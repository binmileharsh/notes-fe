import { useState, useEffect } from "react";
import TableStructure from "./table.list";
// import { AppSidebar } from "@/components/app-sidebar";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TaskCreateDialog } from "./task.create-dialog";
import { Task } from "./task.types";
import { TaskDeletes } from "./task.delete";
import { TaskEdit } from "./list/task.edit";
import Taskview from "./list/task.view";
// import { ThemeToggleButton } from "@/themetoggle";

function TaskPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<number>(0);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openViewModal, setOpenViewModal] = useState<boolean>(false); 
  // const[logout,setLogout]=useState<boolean>(false);
  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:3000/tasks/all?page=${page}&limit=${limit}`
    );
    const data = await response.json();
    console.log("data", data);

    setTasks(data.data);
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  return (
    <Card className="w-full h-full shadow-none">
      <CardHeader className="flex flex-row justify-between items-start">
        <div className="flex flex-col">
          <CardTitle>Welcome to User Management System</CardTitle>
          <CardDescription>
            Manage your tasks efficiently and effectively.
            <div className="scale-75"></div>
          </CardDescription>
        </div>
        <TaskCreateDialog
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          setTasks={setTasks}
          tasks={tasks}
          openForm={openCreateModal}
          setOpenForm={setOpenCreateModal}
        />
        <TaskDeletes
          deleteId={activeTaskId}
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          setTasks={setTasks}
          tasks={tasks}
        />

        <Taskview
          activeTaskId={activeTaskId}
          open={openViewModal}
          setOpen={setOpenViewModal}
        />
        <TaskEdit
          activeTaskId={activeTaskId}
          setTasks={setTasks}
          tasks={tasks}
          open={openEditModal}
          setOpen={setOpenEditModal}
        />
      </CardHeader>
      <CardContent>
        <TableStructure
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          tasks={tasks}
          activeTaskId={activeTaskId}
          setActiveTaskId={setActiveTaskId}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          openViewModal={openViewModal}
          setOpenViewModal={setOpenViewModal}
        />
      </CardContent>
    </Card>
  );
}

export default TaskPage;
