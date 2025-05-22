import { Button } from "@/components/ui/button";

import React, { Dispatch, SetStateAction } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
export type UserStatus = "done" | "pending" | "inprogress" | "inreview";
export type PriorityIcon = "high" | "low" | "medium" | "urgent";
interface Task {
  id: number;
  taskId: number | null;
  description: string;
  status: UserStatus;
  priority: PriorityIcon;
}

interface TableActionType {
  taskId: number | undefined;
  activeTaskId: number | null;
  setActiveTaskId: React.Dispatch<React.SetStateAction<number>>;
  openDeleteModal: boolean;
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  openEditModal: boolean;
  setOpenEditModal: Dispatch<SetStateAction<boolean>>;
  openViewModal: boolean;
  setOpenViewModal: Dispatch<SetStateAction<boolean>>;
  tasks: Task[];
}
function TableAction({
  taskId,
  tasks,
  openDeleteModal,
  setActiveTaskId,
  setOpenDeleteModal,
  openViewModal,
  setOpenViewModal,

  openEditModal,
  setOpenEditModal,
}: TableActionType) {
  const handleOnDelete = () => {
    if (openDeleteModal) {
      console.log("tasks");
      setOpenDeleteModal(false);
      console.log(tasks);
    }
    // if (activeTaskId) {
    //   setActiveTaskId(null);
    // }
    if (taskId) {
      setActiveTaskId(taskId);
      setOpenDeleteModal(true);
    }
  };

  const viewHandle = () => {
    if (openViewModal) {
      setOpenViewModal(false);
    }
    // if (activeTaskId) {
    //   setActiveTaskId(null);
    // }
    if (taskId) {
      setActiveTaskId(taskId);
      setOpenViewModal(true);
    }
  };

  const editHandle = () => {
    if (openEditModal) {
      setOpenEditModal(false);
    }
    // if (activeTaskId) {
    //   setActiveTaskId(null);
    // }
    if (taskId) {
      setActiveTaskId(taskId);
      setOpenEditModal(true);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
          <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Task Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={viewHandle}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={editHandle}>Edit</DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={handleOnDelete}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default TableAction;
