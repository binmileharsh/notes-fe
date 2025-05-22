import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

type ResetFormValues = {
  password: string;
  confirmPassword: string;
};

function ResetPasswordForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetFormValues>();

  const onSubmit = async (data: ResetFormValues) => {
    try {
      const response = await fetch(
        `http://localhost:3000/Users/reset-password/${email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password: data.password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSuccess("Password reset successfully.");
      setError("");

      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (err) {
      console.log(err);
      setError("Failed to reset password.");
      setSuccess("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-20">
      <Card className="w-full max-w-md p-6 ">
        <CardContent>
          <h2 className="text-2xl font-semibold text-center mb-4">
            Reset Password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Reset Password
            </Button>

            {success && (
              <p className="text-green-600 text-center mt-2">{success}</p>
            )}
            {error && <p className="text-red-600 text-center mt-2">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ResetPasswordForm;
