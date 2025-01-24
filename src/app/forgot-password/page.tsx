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
 const { error } = await supabase.auth.resetPasswordForEmail(data.email)
    setIsLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setMessage(
        "A password reset link has been sent to your email."
      );
    }
  };

return (
  <main className="forgot_password_main">
      <div className="forgot_pass_mainbox">
          <div className="forgot_pass_listing">
              <div className="forgot_pass_heading">
                  <h1>Forgot <span>Password</span></h1>
              </div>
              <div className="forgot_pass_para">
                  <p>Enter your email to receive a password reset link</p>
              </div>
              <div className="forgot_pass_form_box">
                  <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form_group">
                          <div className="form_icon">
                              <img src="/images/service-center/mail.svg" alt="Password" className="img-fluid" />
                          </div>
                          <input
                              type="email"
                              {...register("email")}
                              placeholder="Email"
                          />
                          {errors.email && <p className="error">{errors.email.message}</p>}
                      </div>
                      <div className="form_group login_form_submit_btnbox">
                          <input
                              type="submit"
                              value={isLoading ? "Please wait..." : "Send Link"}
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
