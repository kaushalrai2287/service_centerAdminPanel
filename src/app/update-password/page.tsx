
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createClient } from "../../../utils/supabase/client";

const supabase = createClient();

// Schema for password validation
const resetSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  useEffect(() => {
    async function init() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        const code = searchParams.get("code");
        if (!code) {
          setError("Invalid or expired reset token.");
          return;
        }

        const { data: newSession, error: newSessionError } =
          await supabase.auth.exchangeCodeForSession(code);

        if (newSessionError) {
          setError("Failed to validate reset token.");
        }
      }
    }

    init();
  }, [searchParams]);

  async function onSubmit(data: z.infer<typeof resetSchema>) {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    setIsLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setMessage("Your password has been updated successfully.");
      setTimeout(() => router.push("/login"), 3000); // Redirect after success
    }
  }

  return (
    <main className="forgot_password_main">
      <div className="forgot_pass_mainbox">
        <div className="forgot_pass_listing">
          <div className="forgot_pass_heading">
            <h1>Reset <span>Password</span></h1>
          </div>
          <div className="forgot_pass_para">
            <p>Enter your new password below</p>
          </div>
          <div className="forgot_pass_form_box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form_group">
                <div className="form_icon">
                  <img src="/images/service-center/password.svg" alt="Password" className="img-fluid" />
                </div>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="New Password"
                />
                {errors.password && <p className="error">{errors.password.message}</p>}
              </div>
              <div className="form_group">
                <div className="form_icon">
                  <img src="/images/service-center/password.svg" alt="Confirm Password" className="img-fluid" />
                </div>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
              </div>
              <div className="form_group login_form_submit_btnbox">
                <input
                  type="submit"
                  value={isLoading ? "Updating..." : "Update Password"}
                  disabled={isLoading}
                />
              </div>
              {message && <p className="success">{message}</p>}
              {error && <p className="error">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
