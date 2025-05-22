import {  useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {  useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isVerified, setIsVerified] = useState(false);
  const email = searchParams.get("email");

  const { register, handleSubmit } = useForm<{ otp: string }>();

  const findOtp = async () => {
    try {
      if (!email) {
        console.error("Email is not provided.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/users/verify/?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Email verification failed");
      }

      const data = await response.json();
      console.log("Email Verified:", data);
      
      
      setIsVerified(true);
    } catch (error: any) {
      console.error("Something went wrong:", error.message);
    }
  };

  useEffect(() => {
    if (email) {
      findOtp();
    }
  }, [email]);

  const onSubmit = async (data: { otp: string }) => {
    console.log("OTP submitted:", data.otp);

    try {
      const response = await fetch(
        `http://localhost:3000/users/verify/?email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp: data.otp, email }),
        }
      );

      if (!response.ok) {
        
        toast.error("OTP verification failed");
        navigate("/verifyOtp");
        throw new Error("OTP verification failed")
      }

      const result = await response.json();
      console.log("OTP Verified:", result);
      console.log(isVerified)
      setIsVerified(true);

      toast.success("OTP verified successfully");
      navigate("/resetpassword", {
        state: { email },
      });
      
      setIsVerified(true);
    } catch (error: any) {
      console.error("Something went wrong:", error.message);
    }
  };

  return (
    <Card className="max-w-sm mx-auto mt-10">
      <CardHeader>
        <CardTitle>Enter OTP</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="otp">OTP</Label>
            <Input id="otp" type="text" maxLength={6} {...register("otp")} />
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerifyOtp;
