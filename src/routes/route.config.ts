import TaskPage from "@/pages/task/task";
import HomePage from "@/pages/home/homepage";
import Registered from "@/pages/home/registered";
import SignIn from "@/pages/home/signin";
import Forget from "@/pages/home/forget";
import Resetpassword from "@/pages/home/reset";
import VerifyOtp from "@/pages/home/otp-verify";
import Dashboard from "@/pages/home/mainpage";

export const publicRoutes = [
   { path: "/", component: SignIn },
   { path: "/signin", component: SignIn },
   { path: "/forget", component: Forget },
   { path: "/resetPassword", component: Resetpassword },
   { path: "/registered", component: Registered },
   { path: "/verifyOtp", component: VerifyOtp },
];

export const privateRoutes = [
   { path: "/dashboard", component: Dashboard },
   { path: "/homepage", component: HomePage },
   { path: "/task", component: TaskPage },
];
