import { Link } from "react-router-dom";
import { Trash2 } from 'lucide-react';

import {
  Loader,
  ShieldCheck,
  Eye,
  ArrowBigUp,
  ArrowBigDown,
  ChevronsUpDown,
  Activity,
} from "lucide-react";
const usericon = {
  done: <Loader className="w-4 h-4 text-gray-500" />,
  pending: <ShieldCheck className="w-4 h-4 text-gray-500" />,
  inprogress: <Loader className="w-4 h-4 text-gray-500" />,
  inreview: <Eye className="w-4 h-4 text-gray-500" />,
};


const priorityIcon = {
  high: <ArrowBigUp className="w-4 h-4 text-gray-500" />,
  low: <ArrowBigDown className="w-4 h-4 text-gray-500" />,
  medium: <ChevronsUpDown className="w-4 h-4 text-gray-500" />,
  urgent: <Activity className="w-4 h-4 text-gray-500" />,
};


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {TableStructureType}  from "./task.types";



function Tablestructure({handledelete,tasks}:TableStructureType) {
  return (
    <>
      <Table className="w-full">
        <TableCaption>A Blist of your recent tasks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>TaskId</TableHead>
            <TableHead>description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <Link to={`/task/${task.id}`}>{task.taskId}</Link>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="mr-4">{task.taskId}</Badge>
                {task.description}
              </TableCell>
              <TableCell className="flex">
                <div className="status flex flex-row gap-2">
                  <span className="text-black">{usericon[task.status]}</span>
                  {task.status}
                </div>
              </TableCell>
              <TableCell className="gap-2 ml-20 text-right ">
                <div className="prior flex flex-row gap-2">
                  <span className="text-black">
                    {priorityIcon[task.priority]}
                  </span>
                  {task.priority}
                </div>
              </TableCell>
              <TableCell>
                {" "}
                <Trash2 onClick={() => handledelete(task.id)} />{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
export default Tablestructure;
