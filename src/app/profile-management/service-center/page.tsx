// "use client";

// import React, { useState } from "react";
// import { FieldError, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import Image from "next/image";
// import Header from '../../../../components/Header';
// import Sidemenu from "../../../../components/Sidemenu";
// import HeadingBredcrum from "../../../../components/HeadingBredcrum";

// const formSchema = z.object({
//     name: z
//         .string()
//         .min(1, "Service Center Name is required")
//         .regex(/^[a-zA-Z\s]+$/, "Name must only contain letters"),
//     rnumber: z.string().optional(),
//     servicearea: z.string().min(1, "Service Area is required"),
//     cperson: z
//         .string()
//         .min(1, "Primary Contact Person is required")
//         .regex(/^[a-zA-Z\s]+$/, "Contact person name must only contain letters"),
//     cnumber: z
//         .string()
//         .regex(/^\d+$/, "Contact Number must contain only digits")
//         .min(10, "Contact Number must be at least 10 digits")
//         .max(15, "Contact Number must be at most 15 digits"),
//     email: z.string().email("Invalid email address").optional(),
//     alternumber: z
//         .string()
//         .regex(/^\d*$/, "Alternate Contact Number must contain only digits")
//         .optional(),
//     adderess: z.string().min(1, "Address is required"),
//     city: z.string().min(1, "City is required")
//         .regex(/^[a-zA-Z\s]+$/, "City must only contain letters"),
//     state: z.string().min(1, "State is required"),
//     pincode: z
//         .string()
//         .min(6, "Pincode must be 6 digits")
//         .max(6, "Pincode must be 6 digits")
//         .regex(/^\d+$/, "Pincode must contain only digits"),
//     upload: z
//         .any()
//         .refine((fileList) => fileList && fileList.length > 0, "Please upload a file.")
//         .refine((fileList) => {
//             const file = fileList[0];
//             return (
//                 file &&
//                 ["application/pdf", "image/jpeg", "image/png"].includes(file.type)
//             );
//         }, "Only PDF, JPG, and PNG files are allowed."),
// });

// type FormValues = z.infer<typeof formSchema>;

// const ProfileServiceCenter = () => {

//     const [isToggled, setIsToggled] = useState(false); // State for toggle

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<FormValues>({
//         resolver: zodResolver(formSchema),
//     });

//     const toggleClass = () => {
//         setIsToggled(!isToggled); // Toggle the state
//     };

//     const onSubmit = (data: FormValues) => {
//         console.log("Form Data:", data);
//     };
//     return (
//         <main className="add_service_center_main">
//             <div className={`inner_mainbox ${isToggled ? "toggled-class" : ""}`}>
//                 <div className="inner_left">
//                     <Sidemenu onToggle={toggleClass} />
//                 </div>
//                 <div className="inner_right">
//                     <Header />
//                     <div className="new_booking_form_mainbox">
//                         <form action="" onSubmit={handleSubmit(onSubmit)}>
//                             <div className="form_listing form_listing_red">
//                                 <div className="form_heading_box">
//                                     <div className="form_heading">
//                                         <h2>Service Center <span>Profile</span></h2>
//                                     </div>
//                                     <div className="form_line"></div>
//                                     <div className="form_carbox">
//                                         <img src="/images/service-center/car.svg" alt="" className="img-fluid" />
//                                     </div>
//                                 </div>
//                                 <div className="form_box">
//                                     <div className="inner_form_group">
//                                         <label htmlFor="name">Name</label>
//                                         <input className="form-control" name="name" type="text" id="name" />
//                                     </div>
//                                     <div className="inner_form_group">
//                                         <label htmlFor="b_number">Business Registration Number</label>
//                                         <input className="form-control" name="b_number" type="text" id="b_number" />
//                                     </div>
//                                     <div className="inner_form_group">
//                                         <label htmlFor="address">Address</label>
//                                         <input className="form-control" name="address" type="text" id="address" />
//                                     </div>
//                                     <div className="inner_form_group">
//                                         <label htmlFor="gst_no">GST Number</label>
//                                         <input className="form-control" name="gst_no" type="text" id="gst_no" />
//                                     </div>
//                                     <div className="inner_form_group">
//                                         <label htmlFor="insurance_details">Insurance Details</label>
//                                         <input className="form-control" name="insurance_details" type="text" id="insurance_details" />
//                                     </div>
//                                     <div className="inner_form_group">
//                                         <label htmlFor="p_number">Primary Contact Number</label>
//                                         <input className="form-control" name="p_number" type="text" id="p_number" />
//                                     </div>
//                                     <div className="inner_form_group">
//                                         <label htmlFor="a_number">Alternate Contact Number</label>
//                                         <input className="form-control" name="a_number" type="text" id="a_number" />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="form_listing">
//                                 <div className="inner_form_group inner_form_group_submit">
//                                     <input type="submit" className='submite_btn' value="Submit" />
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     )
// }

// export default ProfileServiceCenter

// "use client";

// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// // import { createClient } from "@supabase/supabase-js";
// import Sidemenu from "../../../../components/Sidemenu";
// import Header from "../../../../components/Header";
// import { createClient } from "../../../../utils/supabase/client";
// const supabase = await createClient();

// const formSchema = z.object({
//     name: z.string().min(1, "Service Center Name is required"),
//     business_registration_no: z.string().min(1, "Business Registration Number is required"),
//     address: z.string().min(1, "Address is required"),
//     gst_number: z.string().optional(),
//     insurance_details: z.string().optional(),
//     primary_contact_person: z.string().min(1, "Primary Contact Person is required"),
//     contact_number: z.string().min(10, "Contact Number must be at least 10 digits"),
//     alternate_contact: z.string().optional(),
// });

// type FormValues = z.infer<typeof formSchema>;

// const ProfileServiceCenter = () => {
//     const [isToggled, setIsToggled] = useState(false);
//     const [serviceCenterId, setServiceCenterId] = useState<number | null>(null);

//     const {
//         register,
//         handleSubmit,
//         setValue,
//         formState: { errors },
//     } = useForm<FormValues>({
//         resolver: zodResolver(formSchema),
//     });

//     // Fetch service center details
//     useEffect(() => {
//         const fetchServiceCenter = async () => {
//             const { data, error } = await supabase
//                 .from("service_centers")
//                 .select("*")
//                 .limit(1)
//                 .single();

//             if (data) {
//                 setServiceCenterId(data.service_center_id);
//                 Object.keys(data).forEach((key) => {
//                     setValue(key as keyof FormValues, data[key]);
//                 });
//             }

//             if (error) {
//                 console.error("Error fetching service center:", error);
//             }
//         };

//         fetchServiceCenter();
//     }, [setValue]);

//     // Handle form submission
//     const onSubmit = async (formData: FormValues) => {
//         const { error } = await supabase.from("service_centers").upsert([
//             {
//                 service_center_id: serviceCenterId, // If ID exists, update; else insert
//                 ...formData,
//             },
//         ]);

//         if (error) {
//             console.error("Error updating service center:", error);
//         } else {
//             alert("Profile updated successfully!");
//         }
//     };

//     return (
//         <main className="add_service_center_main">
//             <div className={`inner_mainbox ${isToggled ? "toggled-class" : ""}`}>
//                 <div className="inner_left">
//                     <Sidemenu onToggle={() => setIsToggled(!isToggled)} />
//                 </div>
//                 <div className="inner_right">
//                     <Header />
//                     <div className="new_booking_form_mainbox">
//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <div className="form_box">
//                                 <div className="inner_form_group">
//                                     <label htmlFor="name">Name</label>
//                                     <input className="form-control" {...register("name")} />
//                                     {errors.name && <span>{errors.name.message}</span>}
//                                 </div>

//                                 <div className="inner_form_group">
//                                     <label htmlFor="business_registration_no">Business Registration Number</label>
//                                     <input className="form-control" {...register("business_registration_no")} />
//                                     {errors.business_registration_no && <span>{errors.business_registration_no.message}</span>}
//                                 </div>

//                                 <div className="inner_form_group">
//                                     <label htmlFor="address">Address</label>
//                                     <input className="form-control" {...register("address")} />
//                                     {errors.address && <span>{errors.address.message}</span>}
//                                 </div>

//                                 <div className="inner_form_group">
//                                     <label htmlFor="gst_number">GST Number</label>
//                                     <input className="form-control" {...register("gst_number")} />
//                                 </div>

//                                 <div className="inner_form_group">
//                                     <label htmlFor="insurance_details">Insurance Details</label>
//                                     <input className="form-control" {...register("insurance_details")} />
//                                 </div>

//                                 <div className="inner_form_group">
//                                     <label htmlFor="primary_contact_person">Primary Contact Person</label>
//                                     <input className="form-control" {...register("primary_contact_person")} />
//                                     {errors.primary_contact_person && <span>{errors.primary_contact_person.message}</span>}
//                                 </div>

//                                 <div className="inner_form_group">
//                                     <label htmlFor="contact_number">Primary Contact Number</label>
//                                     <input className="form-control" {...register("contact_number")} />
//                                     {errors.contact_number && <span>{errors.contact_number.message}</span>}
//                                 </div>

//                                 <div className="inner_form_group">
//                                     <label htmlFor="alternate_contact">Alternate Contact Number</label>
//                                     <input className="form-control" {...register("alternate_contact")} />
//                                 </div>
//                             </div>

//                             <div className="form_listing">
//                                 <div className="inner_form_group inner_form_group_submit">
//                                    <input type="submit" className='submite_btn' value="Submit" />
//                                  </div>
// </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// };

// export default ProfileServiceCenter;
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Sidemenu from "../../../../components/Sidemenu";
import Header from "../../../../components/Header";
import { createClient } from "../../../../utils/supabase/client";

// const formSchema = z.object({
//     name: z.string().min(1, "Service Center Name is required"),
//     business_registration_no: z.string().min(1, "Business Registration Number is required"),
//     address: z.string().min(1, "Address is required"),
//     gst_number: z.string().optional(),
//     // insurance_details: z.string().optional(),
//     primary_contact_person: z.string().min(1, "Primary Contact Person is required"),
//     contact_number: z.string().min(10, "Contact Number must be at least 10 digits"),
//     alternate_contact: z.string().optional(),
// });
const formSchema = z.object({
  name: z.string().min(1, "Service Center Name is required"),
  business_registration_no: z
    .string()
    .min(1, "Business Registration Number is required"),
  address: z.string().min(1, "Address is required"),
  gst_number: z.string().optional(),
  primary_contact_person: z
    .string()
    .min(1, "Primary Contact Person is required"),
  contact_number: z
    .string()
    .min(10, "Contact Number must be at least 10 digits"),
  alternate_contact: z.string().optional(),
  email: z.string().email("Invalid email").min(1, "Email is required"),
});

type FormValues = z.infer<typeof formSchema>;

const ProfileServiceCenter = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [serviceCenterId, setServiceCenterId] = useState<number | null>(null);
  const [supabase, setSupabase] = useState<any>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  // Toggle Sidebar
  const toggleClass = () => {
    setIsToggled((prev) => !prev);
  };

  // Initialize Supabase
  useEffect(() => {
    const initSupabase = async () => {
      const client = await createClient();
      setSupabase(client);
    };
    initSupabase();
  }, []);

  // Fetch service center details
  // Fetch service center details based on auth_id
  useEffect(() => {
    if (!supabase) return;

    const fetchServiceCenter = async () => {
      // Get the authenticated user's ID
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("Authentication error:", authError);
        return;
      }

      const { data, error } = await supabase
        .from("service_centers")
        .select("*")
        .eq("auth_id", user.id) // Filtering by auth_id
        .limit(1)
        .single();

      if (data) {
        setServiceCenterId(data.service_center_id);
        Object.keys(data).forEach((key) => {
          if (data[key] !== undefined) {
            setValue(key as keyof FormValues, data[key]);
          }
        });
      }

      if (error) {
        console.error("Error fetching service center:", error);
      }
    };

    fetchServiceCenter();
  }, [supabase, setValue]);

  // Handle form submission
  const onSubmit = async (formData: FormValues) => {
    if (!supabase) return;

    const { error } = await supabase.from("service_centers").upsert([
      {
        service_center_id: serviceCenterId, // If ID exists, update; else insert
        ...formData,
      },
    ]);

    if (error) {
      console.error("Error updating service center:", error.message);
    } else {
      alert("Profile updated successfully!");
    }
  };

  return (
    <main className="add_service_center_main">
      <div className={`inner_mainbox ${isToggled ? "toggled-class" : ""}`}>
        <div className="inner_left">
          <Sidemenu onToggle={toggleClass} />
        </div>
        <div className="inner_right">
          <Header />
          <div className="new_booking_form_mainbox">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form_listing form_listing_red">
                <div className="form_heading_box">
                  <div className="form_heading">
                    <h2>
                      Service Center <span>Profile</span>
                    </h2>
                  </div>
                  <div className="form_line"></div>
                  <div className="form_carbox">
                    <img
                      src="/images/service-center/car.svg"
                      alt="Service Center"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="form_box">
                  <div className="inner_form_group">
                    <label htmlFor="name">Name</label>
                    <input
                      className="form-control disabled-input"
                      type="text"
                      id="name"
                      {...register("name")}
                      disabled
                    />
                    {errors.name && (
                      <p className="error">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="inner_form_group">
                    <label htmlFor="business_registration_no">
                      Business Registration Number
                    </label>
                    <input
                      className="form-control disabled-input"
                      type="text"
                      id="business_registration_no"
                      {...register("business_registration_no")}
                      disabled
                    />
                    {errors.business_registration_no && (
                      <p className="error">
                        {errors.business_registration_no.message}
                      </p>
                    )}
                  </div>
                  <div className="inner_form_group">
                    <label htmlFor="address">Address</label>
                    <input
                      className="form-control"
                      type="text"
                      id="address"
                      {...register("address")}
                    />
                    {errors.address && (
                      <p className="error">{errors.address.message}</p>
                    )}
                  </div>
                  <div className="inner_form_group">
                    <label htmlFor="gst_number">GST Number</label>
                    <input
                      className="form-control disabled-input"
                      type="text"
                      id="gst_number"
                      {...register("gst_number")}
                      disabled
                    />
                    {errors.gst_number && (
                      <p className="error">{errors.gst_number.message}</p>
                    )}
                  </div>
                  {/* <div className="inner_form_group">
                                        <label htmlFor="insurance_details">Insurance Details</label>
                                        <input className="form-control" type="text" id="insurance_details" {...register("insurance_details")} />
                                    </div> */}

                  <div className="inner_form_group">
                    <label htmlFor="email">Email</label>
                    <input
                      className="form-control disabled-input"
                      type="email"
                      id="email"
                      {...register("email")}
                      disabled
                    />
                    {errors.email && (
                      <p className="error">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="inner_form_group">
                    <label htmlFor="contact_number">
                      Primary Contact Number
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="contact_number"
                      {...register("contact_number")}
                    />
                    {errors.contact_number && (
                      <p className="error">{errors.contact_number.message}</p>
                    )}
                  </div>
                  <div className="inner_form_group">
                    <label htmlFor="alternate_contact">
                      Alternate Contact Number
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="alternate_contact"
                      {...register("alternate_contact")}
                    />
                  </div>
                </div>
              </div>
              <div className="form_listing">
                <div className="inner_form_group inner_form_group_submit">
                  <input type="submit" className="submite_btn" value="Submit" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileServiceCenter;
