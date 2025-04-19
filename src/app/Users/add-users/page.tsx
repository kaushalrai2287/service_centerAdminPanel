"use client";

import React, { useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { redirect, useRouter } from "next/navigation";
import Sidemenu from "../../../../components/Sidemenu";
import Header from "../../../../components/Header";
import { createClient } from "../../../../utils/supabase/client";
import HeadingBredcrum from "../../../../components/HeadingBredcrum";

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
    .union([z.string(), z.number()])
    .refine((value) => /^\d+$/.test(String(value)), "State must be provided"),
  pincode: z
    .string()
    .min(6, "Pincode must be 6 digits")
    .max(6, "Pincode must be 6 digits")
    .regex(/^\d+$/, "Pincode must contain only digits"),
});

type FormValues = z.infer<typeof formSchema>;
type State = {
  states_id: number;
  name: string;
};

const Page = () => {
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) {
        redirect("/login");
      }
    };
    fetchUser();
  }, []);
  const [states, setStates] = useState<State[]>([]);

  const [isToggled, setIsToggled] = useState(false);
  const [permissions, setPermissions] = useState<
    { id: number; name: string }[]
  >([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const toggleClass = () => {
    setIsToggled(!isToggled);
  };
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("service_center_permissions")
          .select("id, name");

        if (error) {
          console.error("Error fetching permissions:", error.message);
          return;
        }
        setPermissions(data || []);
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchPermissions();
  }, []);
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      const supabase = createClient();

      // Get the logged-in user details
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Error fetching logged-in user:", userError?.message);
        alert("User authentication failed.");
        return;
      }

      // Fetch service_center_id from service_centers table
      const { data: serviceCenter, error: serviceError } = await supabase
        .from("service_centers")
        .select("service_center_id")
        .eq("auth_id", user.id)
        .single();

      if (serviceError || !serviceCenter) {
        console.error("Error fetching service center:", serviceError?.message);
        alert("Could not fetch service center details.");
        return;
      }

      const serviceCenterId = serviceCenter.service_center_id;

      // **Step 1: Check if email already exists in service_centers table**
      const { data: existingServiceCenterEmail, error: emailCheckError } =
        await supabase
          .from("service_centers")
          .select("email")
          .eq("email", data.email)
          .single();

      if (emailCheckError && emailCheckError.code !== "PGRST116") {
        console.error(
          "Error checking email in service_centers:",
          emailCheckError.message
        );
        alert("Error checking email availability.");
        return;
      }

      if (existingServiceCenterEmail) {
        alert(
          "This email is already associated with a service center. Cannot add as a user."
        );
        return;
      }

      // Generate a random password
      const generatedPassword = generateRandomPassword();

      // Create authentication for the new user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: generatedPassword,
      });

      if (authError) {
        console.error("Error creating user:", authError.message);
        alert("Error creating user account. Please try again.");
        return;
      }

      const userId = authData.user?.id;
      if (!userId) {
        console.error("Failed to retrieve user ID after signup.");
        alert("Unexpected error occurred. Please try again.");
        return;
      }
      const { error: userInsertError } = await supabase.from("users").insert([
        {
          auth_id: userId,
          name: data.name,
          email: data.email,
          phone_number: data.contact_number,
          user_type: "1",
          user_type_name: "ServiceCenterUser",
        },
      ]);

      if (userInsertError) {
        console.error(
          "Error inserting user into public.users:",
          userInsertError.message
        );
        alert("Error adding user details. Please try again.");
        return;
      }

      alert("User signed up and added to the database successfully!");
      const { state, ...rest } = data;
      const payload = {
        ...rest,
        state_id: Number(state),
        auth_id: userId,
        service_center_id: serviceCenterId,
      };

      const { data: insertedData, error } = await supabase
        .from("service_center_users")
        .insert(payload);

      // if (selectedPermissions.length > 0) {
      //   const permissionPayload = selectedPermissions.map((permissionId) => ({
      //     auth_id: userId,
      //     permission_id: permissionId,
      //   }));

      //   const { error: permissionError } = await supabase
      //     .from("service_center_user_permission_map")
      //     .insert(permissionPayload);

      //   if (permissionError) {
      //     console.error(
      //       "Error inserting permissions:",
      //       permissionError.message
      //     );
      //     alert("Error assigning permissions.");
      //   }
      // }
      const allPermissions = [
        "Dashboard",
        "booking_mangement",
        "billing_payments",
        "profile_mangement",
        "notification",
        "add_users",
      ];

      if (selectedPermissions.length > 0) {
        // Build permission payload
        const permissionPayload = allPermissions.reduce(
          (acc: any, perm: any) => {
            acc[perm] = selectedPermissions.includes(perm) ? "YES" : "NO";
            return acc;
          },
          {}
        );

        // Upsert (insert or update) user permissions
        const { error } = await supabase
          .from("service_center_users_permissions")
          .upsert([{ auth_id: userId, ...permissionPayload }], {
            onConflict: "auth_id",
          });

        if (error) {
          console.error("Error inserting/updating permissions:", error.message);
          alert("Error assigning permissions.");
        }
      }

      if (error) {
        console.error("Error inserting data:", error.message);
        alert("Error submitting the form. Please try again.");
      } else {
        alert("Service Center User added successfully!");
        // router.push("/add-service-center/list");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Unexpected error occurred.");
    }
  };

  // Utility function to generate a random password
  const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8); // Generates an 8-character random string
  };

  const handleClose = (event: { preventDefault: () => void }) => {
    event.preventDefault(); // Prevent default form behavior
    // router.push("/add-service-center/list"); // Navigate to the desired page
  };

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from("states").select("*");
        if (error) {
          console.error("Error fetching states:", error.message);
          return;
        }
        setStates(data || []);
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchStates();
  }, []);

  const handlePermissionChange = (permName: any) => {
    setSelectedPermissions(
      (prev) =>
        prev.includes(permName)
          ? prev.filter((name) => name !== permName) // Remove if already selected
          : [...prev, permName] // Add if not selected
    );
  };

  return (
    <main className="add_service_center_main">
      <Header />
      <div className={`inner_mainbox ${isToggled ? "toggled-class" : ""}`}>
        <div className="inner_left">
          <Sidemenu onToggle={toggleClass} />
        </div>
        <div className="inner_right">
          <HeadingBredcrum
            heading="Add User"
            breadcrumbs={[
              { label: "Home", link: "/", active: false },
              { label: "Add User", active: true },
            ]}
          />
          <div className="add_service_formbox">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="service_form_heading">Basic Information</div>
              <div className="inner_form_group">
                <label htmlFor="name">
                  Name <span>*</span>
                </label>
                <input
                  className="form-control"
                  {...register("name")}
                  type="text"
                  id="name"
                />
                {errors.name && (
                  <p className="erro_message">{errors.name.message}</p>
                )}
              </div>

              <div className="inner_form_group">
                <label htmlFor="contact_number">
                  Contact Number <span>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  {...register("contact_number")}
                  id="contact_number"
                />
                {errors.contact_number && (
                  <p className="erro_message">
                    {errors.contact_number.message}
                  </p>
                )}
              </div>
              <div className="inner_form_group">
                <label htmlFor="email">
                  Email <span>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  {...register("email")}
                  id="email"
                />
                {errors.email && (
                  <p className="erro_message">{errors.email.message}</p>
                )}
              </div>

              <div className="service_form_heading service_form_heading_second">
                Address
              </div>
              <div className="inner_form_group">
                <label htmlFor="address">
                  Address <span>*</span>
                </label>
                <textarea
                  className="form-control"
                  {...register("address")}
                  id="address"
                  rows={1}
                ></textarea>
                {errors.address && (
                  <p className="erro_message">{errors.address.message}</p>
                )}
              </div>
              <div className="inner_form_group">
                <label htmlFor="city">
                  City <span>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  {...register("city")}
                  id="city"
                />
                {errors.city && (
                  <p className="erro_message">{errors.city.message}</p>
                )}
              </div>

              <div className="inner_form_group">
                <label htmlFor="state">
                  State <span>*</span>
                </label>
                <select
                  className="form-control"
                  {...register("state")}
                  id="state"
                >
                  <option value="">Select your state</option>
                  {states.map((state) => (
                    <option key={state.states_id} value={state.states_id}>
                      {state.name}
                    </option>
                  ))}
                </select>

                {errors.state && (
                  <p className="erro_message">{errors.state.message}</p>
                )}
              </div>
              <div className="inner_form_group">
                <label htmlFor="pincode">
                  Pincode <span>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  {...register("pincode")}
                  id="pincode"
                />
                {errors.pincode && (
                  <p className="erro_message">{errors.pincode.message}</p>
                )}
              </div>
              <div className="service_form_heading">Permissions</div>
              <div className="inner_form_group new_permission_item">
                {permissions.map((perm) => (
                  <div key={perm.name}>
                    <input
                      type="checkbox"
                      id={`perm-${perm.name}`}
                      checked={selectedPermissions.includes(perm.name)}
                      onChange={() => handlePermissionChange(perm.name)}
                    />
                    <label htmlFor={`perm-${perm.name}`}>{perm.name}</label>
                  </div>
                ))}
              </div>

              <div className="inner_form_group inner_form_group_submit">
                <input type="submit" className="submite_btn" value="Submit" />
                <input
                  type="button"
                  className="close_btn"
                  value="Close"
                  onClick={handleClose}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
