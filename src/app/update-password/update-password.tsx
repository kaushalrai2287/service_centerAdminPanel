// // "use client";
// // import { useRouter, useSearchParams } from "next/navigation";
// // import React, { useState, useEffect } from "react";
// // import { createClient } from "../../../utils/supabase/client";

// // const supabase = createClient();

// // export default function UpdatePassword() {
// //   const router = useRouter();
// //   const searchParams = useSearchParams(); // Get the query parameters from the URL

// //   const [password, setPassword] = useState("");
// //   const [confirmPassword, setConfirmPassword] = useState("");
// //   const [serverError, setServerError] = useState<string | null>(null);
// //   const [successMessage, setSuccessMessage] = useState<string | null>(null);

// //   const handlePasswordUpdate = async () => {
// //     setServerError(null);
// //     setSuccessMessage(null);

// //     if (password !== confirmPassword) {
// //       setServerError("Passwords do not match");
// //       return;
// //     }


// //     // Reset password using the code from the URL
// //     const { error } = await supabase.auth.updateUser({ password });

// //     if (error) {
// //       setServerError(error.message);
// //     } else {
// //       setSuccessMessage("Password updated successfully!");
// //       setTimeout(() => router.push("/login"), 3000); // Redirect to login after success
// //     }
// //   };

// //   return (
// //     <div className="main_section">
// //       <div className="container">
// //         <div className="row justify-content-center">
// //           <div className="col-lg-10">
// //             <div className="login_mainbox">
// //               <div className="login_imgbox">
// //                 <img src="/images/driver-image.png" alt="Update Password" className="img-fluid" />
// //               </div>
// //               <div className="login_formbox">
// //                 <div className="login_form_heading">
// //                   <h1>Update Password</h1>
// //                 </div>
// //                 <div className="login_form">
// //                   <div className="form_group">
// //                     <input
// //                       type="password"
// //                       placeholder="New Password"
// //                       value={password}
// //                       onChange={(e) => setPassword(e.target.value)}
// //                     />
// //                   </div>
// //                   <div className="form_group">
// //                     <input
// //                       type="password"
// //                       placeholder="Confirm New Password"
// //                       value={confirmPassword}
// //                       onChange={(e) => setConfirmPassword(e.target.value)}
// //                     />
// //                   </div>
// //                   <div className="form_group">
// //                     <input
// //                       type="button"
// //                       value="Update Password"
// //                       onClick={handlePasswordUpdate}
// //                     />
// //                   </div>
// //                   {serverError && (
// //                     <div className="error_message">
// //                       <p className="erro_message">{serverError}</p>
// //                     </div>
// //                   )}
// //                   {successMessage && (
// //                     <div className="success_message">
// //                       <p>{successMessage}</p>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, type FormEvent } from "react";

// import { createClient } from "../../../utils/supabase/client";

// function PasswordUpdateForm() {
//   const router = useRouter();

//   useEffect(() => {
//     async function init() {
//       const supabase = await createClient();

//       const { data } = await supabase.auth.getUser();

//       if (!data.user) {
//         const code = new URLSearchParams(window.location.search).get("code");
//         if (!code) {
//           console.error("Missing code");
//           return;
//         }

//         const { data: newSession, error: newSessionError } =
//           await supabase.auth.exchangeCodeForSession(code);

//         console.log("NEW SESSION DATA:", newSession.session);

//         if (newSessionError) {
//           console.log(newSessionError);
//         }
//       }
//     }

//     init();
//   }, []);

//   async function onSubmit(formEvent: FormEvent<HTMLFormElement>) {
//     formEvent.preventDefault();

//     const supabase = await createClient();

//     const formData = new FormData(formEvent.currentTarget);
//     const password = formData.get("new-password") as string;
//     console.log("NEW PASSWORD:", password);

//     if (!password) return;

//     const { error } = await supabase.auth.updateUser({
//       password,
//     });

//     if (error) {
//       console.error(error);
//     } else {
//       console.log("Password successfully changed");
//     }

//     router.push("/login");
//   }

//   return (
//     <form onSubmit={onSubmit}>
//       <label htmlFor="new-password">New password:</label>
//       <input type="password" id="new-password" name="new-password" />
//       <button type="submit">Change password</button>
//     </form>
//   );
// }

// export { PasswordUpdateForm };

"use client";

import { useRouter } from "next/navigation";
import { useEffect, type FormEvent } from "react";

import { createClient } from "../../../utils/supabase/client";

function PasswordUpdateForm() {
  const router = useRouter();

  useEffect(() => {
    async function init() {
      const supabase = createClient();

      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        const code = new URLSearchParams(window.location.search).get("code");
        if (!code) {
          console.error("Missing code");
          return;
        }

        const { data: newSession, error: newSessionError } =
          await supabase.auth.exchangeCodeForSession(code);

        console.log("NEW SESSION DATA:", newSession.session);

        if (newSessionError) {
          console.log(newSessionError);
        }
      }
    }

    init();
  }, []);

  async function onSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();

    const form = formEvent.currentTarget; 
    const formData = new FormData(form); 
    const password = formData.get("new-password") as string;
    console.log("NEW PASSWORD:", password);

    if (!password) return;

    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("Password successfully changed");
    }

    router.push("/login");
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="new-password">New password:</label>
      <input type="password" id="new-password" name="new-password" required />
      <button type="submit">Change password</button>
    </form>
  );
}

export { PasswordUpdateForm };
