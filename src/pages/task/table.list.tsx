import { Link } from "react-router-dom";
import React, { Dispatch, SetStateAction } from "react";
import { Task } from "./task.types";

import {
  Loader,
  Eye,
  ArrowBigUp,
  Activity,
  BellMinus,
  NotebookPen,
  SquareActivity,
  ChartNoAxesCombined,
  IdCard,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  CircleCheck,
  CircleDotDashed,
  ArrowDown,
  ArrowRight,
} from "lucide-react";
const userIcons = {
  done: <CircleCheck className="w-4 h-4 text-gray-500" />,
  pending: <CircleDotDashed className="w-4 h-4 text-gray-500" />,
  "in-progress": <Loader className="w-4 h-4 text-gray-500" />,
  "in-review": <Eye className="w-4 h-4 text-gray-500" />,
};

const priorityIcon = {
  high: <ArrowBigUp className="w-4 h-4 text-gray-500" />,
  low: <ArrowDown className="w-4 h-4 text-gray-500" />,
  medium: <ArrowRight className="w-4 h-4 text-gray-500" />,
  urgent: <Activity className="w-4 h-4 text-gray-500" />,
};

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import TableAction from "./table.action";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TableStructureType {
  tasks: Task[];
  activeTaskId: number;
  setActiveTaskId: React.Dispatch<React.SetStateAction<number>>;
  openDeleteModal: boolean;
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  openEditModal: boolean;
  setOpenEditModal: Dispatch<SetStateAction<boolean>>;
  openViewModal: boolean;
  setOpenViewModal: Dispatch<SetStateAction<boolean>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function TableStructure({
  page,
  setPage,

  setLimit,
  tasks,
  openDeleteModal,
  setOpenDeleteModal,
  activeTaskId,
  setActiveTaskId,
  openEditModal,
  setOpenEditModal,
  openViewModal,
  setOpenViewModal,
}: TableStructureType) {
  const setRowsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLimit(parseInt(value));
  };
  const pageNumberDecrease = () => {
    if (page == 1) {
      return;
    }
    setPage((prevPage) => prevPage - 1);
  };
  const pageNumberIncrease = () => {
    if (page == 6) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
  };
  // const [page, setPage] = React.useState(1);
  //   const [currentPage, setCurrentPage] = React.useState(1);
  // const [rowsPerPage, setRowsPerPage] = React.useState(8);

  // const totalPages = Math.ceil(tasks.length / rowsPerPage);

  // const paginatedTasks = tasks.slice(
  //   (currentPage - 1) * rowsPerPage,
  //   currentPage * rowsPerPage
  // );
  // const changePage =()=>{
  //   if (currentPage === totalPages) {
  //     return;}
  //   setCurrentPage((changePage)=>changePage+1)

  // }

  // const pageBack = () => {
  //   if (currentPage === 1){ return};

  //     setCurrentPage((prevPage) => prevPage - 1)}
  return (
    <Table className="w-full h-full">
      <ScrollArea className="relative h-[60vh] w-full overflow-hidden">
        {/* <TableCaption> Your recent </TableCaption> */}
        <TableHeader className="sticky w-full bg-secondary top-0 z-50">
          <TableRow>
            <TableHead>
              <div className="flex items-center gap-2">
                <IdCard className="w-4 h-4" />
                Task Id
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <NotebookPen className="w-4 h-4" />
                Description
              </div>
            </TableHead>

            <TableHead>
              <div className="flex items-center gap-2">
                <ChartNoAxesCombined className="w-4 h-4" />
                Status
              </div>
            </TableHead>

            <TableHead>
              <div className="flex items-center gap-2">
                <BellMinus className="w-4 h-4" />
                Priority
              </div>
            </TableHead>

            <TableHead>
              <div className="flex items-center gap-2">
                <SquareActivity className="w-4 h-4" />
                Action
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="h-full w-full">
          {tasks.map((task) => (
            <TableRow id={task?.id?.toString()} key={task?.id}>
              <TableCell>
                <Link to={`/task/${task?.id}`}>{task?.taskId}</Link>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="mr-4">
                  {task?.badge}
                </Badge>
                {task?.description}
              </TableCell>
              <TableCell className="flex">
                <div className="status flex flex-row gap-2">
                  <span className="text-black">
                    {userIcons[task?.status as keyof typeof userIcons]}
                  </span>
                  {task?.status}
                </div>
              </TableCell>
              <TableCell className="gap-2 ml-20 text-right ">
                <div className="prior flex flex-row gap-2">
                  <span className="text-black">
                    {priorityIcon[task?.priority as keyof typeof priorityIcon]}
                  </span>
                  {task?.priority}
                </div>
              </TableCell>
              <TableCell>
                <TableAction
                  tasks={tasks}
                  key={task?.id}
                  taskId={task?.id}
                  activeTaskId={activeTaskId}
                  setActiveTaskId={setActiveTaskId}
                  openDeleteModal={openDeleteModal}
                  setOpenDeleteModal={setOpenDeleteModal}
                  openEditModal={openEditModal}
                  setOpenEditModal={setOpenEditModal}
                  openViewModal={openViewModal}
                  setOpenViewModal={setOpenViewModal}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="sticky bottom-0 w-full bg-card z-50">
          <TableRow className="w-full">
            <TableCell
              colSpan={2}
              className="  flex-row w-full justify-between items-center"
            >
              <span>0 of 100 rows selected</span>
            </TableCell>
            <TableCell colSpan={3}>
              <div className="flex items-center gap-4">
                <label htmlFor="rows" className="text-sm font-medium">
                  Rows per page:
                </label>
                <select
                  onChange={setRowsPerPage}
                  id="rows"
                  style={{ width: "120px" }}
                  className="border rounded px-2 py-1"
                >
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="24">24</option>
                  <option value="32">32</option>
                  <option value="40">40</option>
                  <option value="48">48</option>
                </select>

                <p className="text-sm text-muted-foreground">Page 1 of 6</p>

                <div className="flex gap-1 items-center">
                  <ChevronsLeft onClick={pageNumberDecrease} className="mr-1" />
                  <ChevronLeft className="mr-1" />
                  <ChevronRight className="mr-1" />
                  <ChevronsRight
                    onClick={pageNumberIncrease}
                    className="mr-1"
                  />
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </ScrollArea>
    </Table>
  );
}
