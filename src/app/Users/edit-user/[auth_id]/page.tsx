// "use client";
// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { createClient } from "../../../../../utils/supabase/client";

// const supabase = createClient();

// export default function EditUser() {
//   const { auth_id } = useParams();
//   const router = useRouter();
//   const [user, setUser] = useState({
//     Dashboard: false,
//     booking_mangement: false,
//     billing_payments: false,
//     profile_mangement: false,
//     notification: false,
//     add_users: false,
//   });

//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data, error } = await supabase
//         .from("service_center_users_permissions")
//         .select(
//           "Dashboard, booking_mangement, billing_payments, profile_mangement, notification, add_users"
//         )
//         .eq("auth_id", auth_id)
//         .single();

//       if (error) {
//         console.error("Error fetching user:", error);
//       } else if (data) {
//         // Convert "YES"/"NO" to Boolean
//         setUser({
//           Dashboard: data.Dashboard === "YES",
//           booking_mangement: data.booking_mangement === "YES",
//           billing_payments: data.billing_payments === "YES",
//           profile_mangement: data.profile_mangement === "YES",
//           notification: data.notification === "YES",
//           add_users: data.add_users === "YES",
//         });
//       }
//     };

//     fetchUser();
//   }, [auth_id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, checked } = e.target;
//     setUser((prevUser) => ({ ...prevUser, [name]: checked }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const updatedUser = {
//       Dashboard: user.Dashboard ? "YES" : "NO",
//       booking_mangement: user.booking_mangement ? "YES" : "NO",
//       billing_payments: user.billing_payments ? "YES" : "NO",
//       profile_mangement: user.profile_mangement ? "YES" : "NO",
//       notification: user.notification ? "YES" : "NO",
//       add_users: user.add_users ? "YES" : "NO",
//     };

//     const { error } = await supabase
//       .from("service_center_users_permissions")
//       .update(updatedUser)
//       .eq("auth_id", auth_id);

//     if (error) {
//       console.error("Error updating user:", error);
//     } else {
//       alert("User updated successfully!");
//       router.push("/Users/list-users");
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-xl font-semibold mb-4">Edit User Permissions</h2>
//       <form onSubmit={handleSubmit}>
//         {Object.keys(user).map((key) => (
//           <div key={key} className="flex items-center mb-3">
//             <input
//               type="checkbox"
//               id={key}
//               name={key}
//               checked={user[key as keyof typeof user]}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <label htmlFor={key} className="text-gray-700">{key.replace("_", " ")}</label>
//           </div>
//         ))}
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }
// "use client";

// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useParams, useRouter } from "next/navigation";
// import Sidemenu from "../../../../../components/Sidemenu";
// import Header from "../../../../../components/Header";
// import { createClient } from "../../../../../utils/supabase/client";
// import HeadingBredcrum from "../../../../../components/HeadingBredcrum";

// const formSchema = z.object({
//   name: z
//     .string()
//     .min(1, "User Name is required")
//     .regex(/^[a-zA-Z\s]+$/, "Name must only contain letters"),
//   contact_number: z
//     .string()
//     .regex(/^\d+$/, "Contact Number must contain only digits")
//     .min(10, "Contact Number must be at least 10 digits")
//     .max(10, "Contact Number must be at most 10 digits"),
//   email: z
//     .string()
//     .nonempty("Email is required")
//     .email("Please enter a valid email address"),
//   address: z.string().min(1, "Address is required"),
//   city: z
//     .string()
//     .min(1, "City is required")
//     .regex(/^[a-zA-Z\s]+$/, "City must only contain letters"),
//   state: z
//     .union([z.string(), z.number()])
//     .refine((value) => /^\d+$/.test(String(value)), "State must be provided"),
//   pincode: z
//     .string()
//     .min(6, "Pincode must be 6 digits")
//     .max(6, "Pincode must be 6 digits")
//     .regex(/^\d+$/, "Pincode must contain only digits"),
// });

// type FormValues = z.infer<typeof formSchema>;

// const EditUser = () => {
//   const { auth_id } = useParams();
//   const router = useRouter();
//   const [states, setStates] = useState<{ states_id: number; name: string }[]>(
//     []
//   );

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//   });

//   useEffect(() => {
//     const fetchUser = async () => {
//       const supabase = createClient();
//       const { data, error } = await supabase
//         .from("service_center_users")
//         .select("*")
//         .eq("auth_id", auth_id)
//         .single();

//       if (error) {
//         console.error("Error fetching user:", error.message);
//         return;
//       }

//       if (data) {
//         reset(data); // Populate form with user data
//       }
//     };

//     const fetchStates = async () => {
//       const supabase = createClient();
//       const { data, error } = await supabase.from("states").select("*");
//       if (error) {
//         console.error("Error fetching states:", error.message);
//         return;
//       }
//       setStates(data || []);
//     };

//     fetchUser();
//     fetchStates();
//   }, [auth_id, reset]);

//   const onSubmit = async (data: FormValues) => {
//     const supabase = createClient();
//     const { error } = await supabase
//       .from("service_center_users")
//       .update(data)
//       .eq("auth_id", auth_id);

//     if (error) {
//       console.error("Error updating user:", error.message);
//       return;
//     }

//     router.push("/add-service-center/list");
//   };

//   return (
//     <main className="add_service_center_main">
//       <Header />
//       <div className="inner_mainbox">
//         <div className="inner_left">
//           <Sidemenu onToggle={() => {}} />
//         </div>
//         <div className="inner_right">
//           <HeadingBredcrum
//             heading="Edit User"
//             breadcrumbs={[
//               { label: "Home", link: "/", active: false },
//               { label: "Edit User", active: true },
//             ]}
//           />
//           <div className="add_service_formbox">
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="service_form_heading">Basic Information</div>
//               <div className="inner_form_group">
//                 <label htmlFor="name">
//                   Name <span>*</span>
//                 </label>
//                 <input className="form-control" {...register("name")} />
//                 {errors.name && <p className="erro_message">{errors.name.message}</p>}
//               </div>

//               <div className="inner_form_group">
//                 <label htmlFor="contact_number">
//                   Contact Number <span>*</span>
//                 </label>
//                 <input className="form-control" {...register("contact_number")} />
//                 {errors.contact_number && <p className="erro_message">{errors.contact_number.message}</p>}
//               </div>

//               <div className="inner_form_group">
//                 <label htmlFor="email">
//                   Email <span>*</span>
//                 </label>
//                 <input className="form-control" {...register("email")} />
//                 {errors.email && <p className="erro_message">{errors.email.message}</p>}
//               </div>

//               <div className="service_form_heading">Address</div>
//               <div className="inner_form_group">
//                 <label htmlFor="address">
//                   Address <span>*</span>
//                 </label>
//                 <textarea className="form-control" {...register("address")} rows={1}></textarea>
//                 {errors.address && <p className="erro_message">{errors.address.message}</p>}
//               </div>

//               <div className="inner_form_group">
//                 <label htmlFor="city">
//                   City <span>*</span>
//                 </label>
//                 <input className="form-control" {...register("city")} />
//                 {errors.city && <p className="erro_message">{errors.city.message}</p>}
//               </div>

//               <div className="inner_form_group">
//                 <label htmlFor="state">
//                   State <span>*</span>
//                 </label>
//                 <select className="form-control" {...register("state")}>
//                   <option value="">Select your state</option>
//                   {states.map((state) => (
//                     <option key={state.states_id} value={state.states_id}>
//                       {state.name}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.state && <p className="erro_message">{errors.state.message}</p>}
//               </div>

//               <div className="inner_form_group">
//                 <label htmlFor="pincode">
//                   Pincode <span>*</span>
//                 </label>
//                 <input className="form-control" {...register("pincode")} />
//                 {errors.pincode && <p className="erro_message">{errors.pincode.message}</p>}
//               </div>

//               <div className="inner_form_group inner_form_group_submit">
//                 <input type="submit" className="submite_btn" value="Update" />
//                 <button type="button" className="close_btn" onClick={() => router.push("/add-service-center/list")}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default EditUser;
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import Sidemenu from "../../../../../components/Sidemenu";
import Header from "../../../../../components/Header";
import { createClient } from "../../../../../utils/supabase/client";
import HeadingBredcrum from "../../../../../components/HeadingBredcrum";

const supabase = createClient();

const formSchema = z.object({
  name: z
    .string()
    .min(1, "User Name is required")
    .regex(/^[a-zA-Z\s]+$/, "Name must only contain letters"),
  contact_number: z
    .string()
    .regex(/^\d+$/, "Contact Number must contain only digits")
    .min(10, "Contact Number must be at least 10 digits")
    .max(10, "Contact Number must be at most 10 digits"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please enter a valid email address"),
  address: z.string().min(1, "Address is required"),
  city: z
    .string()
    .min(1, "City is required")
    .regex(/^[a-zA-Z\s]+$/, "City must only contain letters"),
state: z
    .union([z.string(), z.number()]) // Accepts both string and number
    .refine(
      (value) =>
        value !== "" &&
        value !== null &&
        value !== undefined &&
        /^\d+$/.test(String(value)),
      "State must be provided"
    ),

  pincode: z
    .string()
    .min(6, "Pincode must be 6 digits")
    .max(6, "Pincode must be 6 digits")
    .regex(/^\d+$/, "Pincode must contain only digits"),
});

type FormValues = z.infer<typeof formSchema>;

const EditUser = () => {
  const { auth_id } = useParams();
  const router = useRouter();
  const [states, setStates] = useState<{ states_id: number; name: string }[]>(
    []
  );
  const [permissions, setPermissions] = useState({
    Dashboard: false,
    booking_mangement: false,
    billing_payments: false,
    profile_mangement: false,
    notification: false,
    add_users: false,
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("service_center_users")
        .select("*")
        .eq("auth_id", auth_id)
        .single();

      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }

      if (data) {
        reset(data);
      }
    };

    const fetchStates = async () => {
      const { data, error } = await supabase.from("states").select("*");
      if (error) {
        console.error("Error fetching states:", error.message);
        return;
      }
      setStates(data || []);
    };

    const fetchPermissions = async () => {
      const { data, error } = await supabase
        .from("service_center_users_permissions")
        .select(
          "Dashboard, booking_mangement, billing_payments, profile_mangement, notification, add_users"
        )
        .eq("auth_id", auth_id)
        .single();

      if (error) {
        console.error("Error fetching permissions:", error);
      } else if (data) {
        setPermissions({
          Dashboard: data.Dashboard === "YES",
          booking_mangement: data.booking_mangement === "YES",
          billing_payments: data.billing_payments === "YES",
          profile_mangement: data.profile_mangement === "YES",
          notification: data.notification === "YES",
          add_users: data.add_users === "YES",
        });
      }
    };

    fetchUser();
    fetchStates();
    fetchPermissions();
  }, [auth_id, reset]);

  const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPermissions((prev) => ({ ...prev, [name]: checked }));
  };

  const onSubmit = async (data: FormValues) => {
    const { error } = await supabase
    .from("service_center_users")
    .update({
      // ...data,
      name: data.name,
      contact_number: data.contact_number,
      address: data.address,
      email: data.email,
      city: data.city,
      state_id: data.state,
      pincode: data.pincode,
    
    })
    .eq("auth_id", auth_id);
    if (error) {
      console.error("Error updating user:", error.message);
      return;
    }

    const updatedPermissions = {
      Dashboard: permissions.Dashboard ? "YES" : "NO",
      booking_mangement: permissions.booking_mangement ? "YES" : "NO",
      billing_payments: permissions.billing_payments ? "YES" : "NO",
      profile_mangement: permissions.profile_mangement ? "YES" : "NO",
      notification: permissions.notification ? "YES" : "NO",
      add_users: permissions.add_users ? "YES" : "NO",
    };

    const { error: permError } = await supabase
      .from("service_center_users_permissions")
      .update(updatedPermissions)
      .eq("auth_id", auth_id);

    if (permError) {
      console.error("Error updating permissions:", permError.message);
      return;
    }

    router.push("/Users/list-users");
  };

  return (
    <main className="add_service_center_main">
      <Header />
      <div className="inner_mainbox">
        <div className="inner_left">
          <Sidemenu onToggle={() => {}} />
        </div>
        <div className="inner_right">
          <HeadingBredcrum
            heading="Edit User"
            breadcrumbs={[
              { label: "Home", link: "/", active: false },
              { label: "Edit User", active: true },
            ]}
          />
          <div className="add_service_formbox">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* User Fields */}
              <div className="inner_form_group">
                <label>Name</label>
                <input  className="form-control"{...register("name")} placeholder="Enter Name" />
                {errors.name && <span>{errors.name.message}</span>}
              </div>

              <div className="inner_form_group">
                <label>Email</label>
                <input  className="form-control" {...register("email")} placeholder="Enter Email" disabled />
                {errors.email && <span>{errors.email.message}</span>}
              </div>
              <div className="inner_form_group">
                <label htmlFor="contact_number">
                  Contact Number <span>*</span>
                </label>
                <input
                  className="form-control"
                  {...register("contact_number")}
                />
                {errors.contact_number && (
                  <p className="erro_message">
                    {errors.contact_number.message}
                  </p>
                )}
              </div>
              <div className="inner_form_group">
                 <label htmlFor="address">
                   Address <span>*</span>
                 </label>
                 <textarea className="form-control" {...register("address")} rows={1}></textarea>
               {errors.address && <p className="erro_message">{errors.address.message}</p>}
               </div>

               <div className="inner_form_group">
                 <label htmlFor="city">
                   City <span>*</span>
                 </label>
                 <input className="form-control" {...register("city")} />
                 {errors.city && <p className="erro_message">{errors.city.message}</p>}
           </div>
              <div className="inner_form_group">
                <label htmlFor="state">State</label>
                <select  className="form-control"{...register("state")}>
                  {states.map((state) => (
                    <option key={state.states_id} value={state.states_id}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {errors.state && <span>{errors.state.message}</span>}
              </div>

              <div className="inner_form_group">
                <label>Pincode</label>
                <input  className="form-control" {...register("pincode")} placeholder="Enter Pincode" />
                {errors.pincode && <span>{errors.pincode.message}</span>}
              </div>

              {/* Permissions */}
              <div className="service_form_heading">Permissions</div>
              <div className="permissions-checkboxes">
                {Object.keys(permissions).map((key) => (
                  <div key={key} className="inner_form_group">
                    <label>
                      {key.replace(/_/g, " ")}
                      <input
                        type="checkbox"
                        name={key}
                        checked={permissions[key as keyof typeof permissions]}
                        onChange={handlePermissionChange}
                      />
                    </label>
                  </div>
                ))}
              </div>

              <div className="inner_form_group inner_form_group_submit">
                <input type="submit" className="submite_btn" value="Update" />
                <button
                  type="button"
                  className="close_btn"
                  onClick={() => router.push("/add-service-center/list")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditUser;
