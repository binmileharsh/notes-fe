import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


interface logoutinterface {
  setLogout: React.Dispatch<React.SetStateAction<boolean>>;}

export default function LogoutDialog({ setLogout }: logoutinterface) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };
 
    const handleLogoutCancel = () => {          
    setLogout(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <p className="text-lg text-center font-semibold mb-4">
          Do you really want to logout?
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
        <Button variant="outline" onClick={handleLogoutCancel}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
