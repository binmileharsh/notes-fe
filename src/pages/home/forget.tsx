import {  useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
type ForgetFormValues = {
  email: string;
};

function Forget() {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetFormValues>();

  const [serverMessage, setServerMessage] = useState("");

  const onSubmit = async (data: ForgetFormValues) => {
    try {
      const response = await fetch(
        "http://localhost:3000/users/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast("no user found in our record");
        console.log(errorData);
      }
      const result = await response.json();
      toast("otp has been send to you ");
      console.log(result.code);
      console.log(setServerMessage(result.message));
      console.log(result.email);
      navigate(`/verifyOtp?email=${result.email}`, {
      
      });
    

    } catch (error) {
        console.error("Error:", error);
        toast("An error occurred while sending the reset link.");
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardContent>
          <h2 className="text-2xl font-semibold text-center mb-4">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Send Reset Link"}
            </Button>

            {serverMessage && (
              <p className="text-sm text-center mt-2 text-gray-700">
                {serverMessage}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Forget;
