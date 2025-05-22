import { useEffect} from "react";
import { useLocation } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// import { LogOut } from "lucide-react";
// import { Link } from "react-router-dom";  
// import Logout from "./logout";
export default function Dashboard() {
  
 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  useEffect(()=>{
    fetch(`http://localhost:3000/users/verify/?email=${email}`)
  .then((res) => {
    if (!res.ok) {
      throw new Error("User not found");
    }
    return res.json();
  })
  .then((data) => {
    console.log("User Verified:", data);
    
  })
  .catch((error) => {
    console.error("Verification failed:", error.message);
  });
  },[])


  // const boxStyle = {
  //   border: "2px solid #4A90E2",
  //   borderRadius: 10,
  //   padding: 20,
  //   backgroundColor: "#222",  // Dark bg for box to contrast black page bg
  //   fontSize: 20,
  //   fontWeight: 600,
  //   boxShadow: "0 4px 8px rgba(74, 144, 226, 0.5)",
  //   display: "flex",
  //   flexDirection: "column" as const,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   height: 160,
  //   width: "100%",
  //   textAlign: "center" as const,
  //   color: "white",   // white text inside boxes
  // };

  return (
    <div className="min-h-screen px-6 py-10">
  <div className="max-w-6xl mx-auto mb-10">
    <h1 className="text-3xl font-bold">Welcome to your dashboard</h1>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
    <Card>
      <CardHeader>
        <CardTitle>User Email</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{email}sugamsharma2002@gmail.com</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Pending Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <p>4</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Completed Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <p>10</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>High Priority Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <p>2</p>
      </CardContent>
    </Card>
  </div>
</div>


  );
}
