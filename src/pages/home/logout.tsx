import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function Logout() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><LogOut /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to logout?</DialogTitle>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-4">
          <Link to="/">
            <Button variant="destructive">Logout</Button>
          </Link>
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
