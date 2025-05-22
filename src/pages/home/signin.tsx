import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link,  useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { ThemeToggleButton } from "@/themetoggle";

const userSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof userSchema>;

export default function SignIn() {
  const [emialfordashboard,setemailfordashboard]=useState("")
    const navigate = useNavigate();
  const form = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { control, handleSubmit, reset, formState } = form;
  const [message, setMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    setMessage("");
    setemailfordashboard(data.email)
    try {
      const res = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      setMessage("Signed in successfully!");
      toast("Signed in successfully!");
      console.log("Signed in successfully!");
      console.log(emialfordashboard)
      
      navigate(`/dashboard?email=${data.email}`, {
        
      });
      

      reset();
    } catch (err:string | any) {
      console.error(err);
      toast.error("Sign in failed: " + err.message);
      setMessage("Sign in failed: " + err.message);
    }
  };

  return (
    <>
    <div className="flex justify-end">
      <ThemeToggleButton />
    </div>
    <h1 className="text-center text-3xl font-bold mt-4">
  
</h1>
    <div className="max-w-md mx-auto mt-30">
      
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Sign In</CardTitle>
        </CardHeader>
      

        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
 <Link to="/forget"> <button className="ml-67">Forget Password?</button></Link> 
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {message && (
                <p className="text-sm text-muted-foreground">{message}</p>
              )}

              <CardFooter className="px-0">
                <Button type="submit" disabled={formState.isSubmitting}>
                  {formState.isSubmitting ? "Signing In..." : "Sign In"}
                </Button>
              </CardFooter>
            </form>
          </Form>
       
        </CardContent>
      </Card>
    </div>
    </>
  );
}
