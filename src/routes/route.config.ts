import TaskPage from "@/pages/task/task";
import TaskCreatePage from "@/pages/task/task.create";
import Home from "@/pages/home/home";
import Taskbyid from "@/pages/task/task.view";

export const routeConfig = [
  { path: "/", component: TaskPage },
  { path: "/task", component: TaskPage },
  { path: "/task/create", component: TaskCreatePage },
  { path: "/task/:id", component: Taskbyid}
  

];
