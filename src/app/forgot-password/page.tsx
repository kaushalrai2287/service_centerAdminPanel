"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createClient } from "../../../utils/supabase/client";
// import { supabase } from "../../supabaseClient"; // Ensure correct path for Supabase client
import React, { useState } from "react";
const supabase = await createClient();
const formSchema = z.object({
  email: z.string().email("Enter a valid email").nonempty("Email is required"),
});

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    // const redirectTo =
    //   process.env.NODE_ENV === "development"
    //     ? "http://localhost:3000/update-password"
    //     : `${window.location.origin}/update-password`;

    // const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    //   redirectTo,
    // });
 const { error } = await supabase.auth.resetPasswordForEmail(data.email)
    setIsLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setMessage(
        "A password reset link has been sent to your email. Please check your inbox."
      );
    }
  };

  return (
    <div className="main_section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="form_box">
              <h1>Forgot Password</h1>
              <p>Enter your email to receive a password reset link.</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form_group">
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Email"
                  />
                  {errors.email && <p className="error">{errors.email.message}</p>}
                </div>
                <button type="submit" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
              {message && <p className="success">{message}</p>}
              {error && <p className="error">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
