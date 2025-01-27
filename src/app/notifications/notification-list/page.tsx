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

// const NewBooking = () => {

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
//                     <div className="notification_accordion_mainbox">
//                         <div className="accordion accordion-flush" id="accordionFlushNotification">
//                             <div className="accordion-item">
//                                 <div className="accordion-header" id="notificationHeadingOne">
//                                     <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#notificationOne" aria-expanded="false" aria-controls="notificationOne">
//                                         <div className="notification_icons">
//                                             <img src="/images/service-center/driver.svg" alt="" className="img-fluid" />
//                                         </div>
//                                         <div className="notification_subject">
//                                             Accordion Item #1
//                                         </div>
//                                         <div className="notification_date">
//                                             <p>12/02/2025</p>
//                                         </div>
//                                     </button>
//                                 </div>
//                                 <div id="notificationOne" className="accordion-collapse collapse" aria-labelledby="notificationHeadingOne" data-bs-parent="#accordionFlushNotification">
//                                     <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the first item&apos;s accordion body.</div>
//                                 </div>
//                             </div>
//                             <div className="accordion-item">
//                                 <div className="accordion-header" id="notificationHeadingTwo">
//                                     <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#notificationTwo" aria-expanded="false" aria-controls="notificationTwo">
//                                         <div className="notification_icons">
//                                             <img src="/images/service-center/booking.svg" alt="" className="img-fluid" />
//                                         </div>
//                                         <div className="notification_subject">
//                                             Accordion Item #2
//                                         </div>
//                                         <div className="notification_date">
//                                             <p>10/02/2025</p>
//                                         </div>
//                                     </button>
//                                 </div>
//                                 <div id="notificationTwo" className="accordion-collapse collapse" aria-labelledby="notificationHeadingTwo" data-bs-parent="#accordionFlushNotification">
//                                     <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the second item&apos;s accordion body. Let&apos;s imagine this being filled with some actual content.</div>
//                                 </div>
//                             </div>
//                             <div className="accordion-item">
//                                 <h2 className="accordion-header" id="notificationHeadingThree">
//                                     <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#notificationThree" aria-expanded="false" aria-controls="notificationThree">
//                                         <div className="notification_icons">
//                                             <img src="/images/service-center/payment-notification.svg" alt="" className="img-fluid" />
//                                         </div>
//                                         <div className="notification_subject">
//                                             Accordion Item #3
//                                         </div>
//                                         <div className="notification_date">
//                                             <p>01/02/2025</p>
//                                         </div>
//                                     </button>
//                                 </h2>
//                                 <div id="notificationThree" className="accordion-collapse collapse" aria-labelledby="notificationHeadingThree" data-bs-parent="#accordionFlushNotification">
//                                     <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item&#39;s accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     )
// }


// export default NewBooking
// "use client";

// import React, { useState, useEffect } from "react"; // Import to get logged-in session
// import Image from "next/image";
// import { createClient } from "../../../../utils/supabase/client";
// import Header from "../../../../components/Header";
// import Sidemenu from "../../../../components/Sidemenu";
// import HeadingBredcrum from "../../../../components/HeadingBredcrum";

// const supabase = createClient();

// const NewBooking = () => {
//   interface Notification {
//     notification_id: string;
//     type: string;
//     title: string;
//     created_at: string;
//     message: string;
//   }

//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [isToggled, setIsToggled] = useState(false);

//   // Get logged-in session from Supabase
//   useEffect(() => {
//     const fetchSessionAndNotifications = async () => {
//       // Fetch the session details
//       const { data: session } = await supabase.auth.getUser();
//       if (session) {
//         // Extract the logged-in user's auth ID
//         const authId = session.user?.id;
//         console.log("Auth ID:", authId);

//         // Fetch the service center ID from the service_centers table using the auth_id
//         const { data: serviceCenterData, error } = await supabase
//           .from('service_centers')
//           .select('service_center_id')
//           .eq('auth_id', authId) // Fetch using the correct column 'auth_id'
//           .single(); 

//         if (error) {
//           console.error("Error fetching service center:", error.message);
//           return;
//         }

//         const serviceCenterId = serviceCenterData?.service_center_id;
//         console.log("Service Center ID:", serviceCenterId);

//         // Fetch notifications based on the service center ID
//         if (serviceCenterId) {
//           fetch(`/api/Notifications/recipients?recipient_id=${serviceCenterId}`)
//             .then((response) => response.json())
//             .then((data) => {
//               if (data.status === "success") {
//                 setNotifications(data.data);
//                 console.log("Notifications:", data.data);
//               } else {
//                 console.error("Error fetching notifications:", data.message);
//               }
//             })
//             .catch((error) => console.error("Error:", error));
//         }
//       }
//     };


//     fetchSessionAndNotifications();
//   }, []);

//   const toggleClass = () => {
//     setIsToggled(!isToggled);
//   };

//   return (
//     <main className="add_service_center_main">
//       <div className={`inner_mainbox ${isToggled ? "toggled-class" : ""}`}>
//         <div className="inner_left">
//           <Sidemenu onToggle={toggleClass} />
//         </div>
//         <div className="inner_right">
//           <Header />
//           <div className="notification_accordion_mainbox">
//             <div className="accordion accordion-flush" id="accordionFlushNotification">
//               {notifications.length > 0 ? (
//                 notifications.map((notification) => (
//                   <div className="accordion-item" key={notification.notification_id}>
//                     <div className="accordion-header" id={`notificationHeading${notification.notification_id}`}>
//                       <button
//                         className="accordion-button collapsed"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target={`#notification${notification.notification_id}`}
//                         aria-expanded="false"
//                         aria-controls={`notification${notification.notification_id}`}
//                       >
//                         <div className="notification_icons">
//                           <img
//                             src={`/images/service-center/${notification.type}.svg`}
//                             alt=""
//                             className="img-fluid"
//                           />
//                         </div>
//                         <div className="notification_subject">
                            
//                           {notification.title || "No title"}
//                         </div>
//                         <div className="notification_date">
//                           <p>{new Date(notification.created_at).toLocaleDateString()}</p>
//                         </div>
//                       </button>
//                     </div>
//                     <div
//                       id={`notification${notification.notification_id}`}
//                       className="accordion-collapse collapse"
//                       aria-labelledby={`notificationHeading${notification.notification_id}`}
//                       data-bs-parent="#accordionFlushNotification"
//                     >
//                       <div className="accordion-body">{notification.message || "No message available"}</div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div>No notifications available.</div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default NewBooking;
"use client";

import React, { useState, useEffect } from "react";
import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Header from '../../../../components/Header';
import Sidemenu from "../../../../components/Sidemenu";
import HeadingBredcrum from "../../../../components/HeadingBredcrum";
import { createClient } from "../../../../utils/supabase/client";
const supabase = createClient();

const formSchema = z.object({
    name: z
        .string()
        .min(1, "Service Center Name is required")
        .regex(/^[a-zA-Z\s]+$/, "Name must only contain letters"),
    rnumber: z.string().optional(),
    servicearea: z.string().min(1, "Service Area is required"),
    cperson: z
        .string()
        .min(1, "Primary Contact Person is required")
        .regex(/^[a-zA-Z\s]+$/, "Contact person name must only contain letters"),
    cnumber: z
        .string()
        .regex(/^\d+$/, "Contact Number must contain only digits")
        .min(10, "Contact Number must be at least 10 digits")
        .max(15, "Contact Number must be at most 15 digits"),
    email: z.string().email("Invalid email address").optional(),
    alternumber: z
        .string()
        .regex(/^\d*$/, "Alternate Contact Number must contain only digits")
        .optional(),
    adderess: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required")
        .regex(/^[a-zA-Z\s]+$/, "City must only contain letters"),
    state: z.string().min(1, "State is required"),
    pincode: z
        .string()
        .min(6, "Pincode must be 6 digits")
        .max(6, "Pincode must be 6 digits")
        .regex(/^\d+$/, "Pincode must contain only digits"),
    upload: z
        .any()
        .refine((fileList) => fileList && fileList.length > 0, "Please upload a file.")
        .refine((fileList) => {
            const file = fileList[0];
            return (
                file &&
                ["application/pdf", "image/jpeg", "image/png"].includes(file.type)
            );
        }, "Only PDF, JPG, and PNG files are allowed."),
});

type FormValues = z.infer<typeof formSchema>;

const NewBooking = () => {
    const [notifications, setNotifications] = useState<any[]>([]); // State to hold notifications

    useEffect(() => {
        const fetchSessionAndNotifications = async () => {
            const { data: session } = await supabase.auth.getUser();
            if (session) {
                const authId = session.user?.id;
                const { data: serviceCenterData, error } = await supabase
                    .from('service_centers')
                    .select('service_center_id')
                    .eq('auth_id', authId)
                    .single(); 

                if (error) {
                    console.error("Error fetching service center:", error.message);
                    return;
                }

                const serviceCenterId = serviceCenterData?.service_center_id;

                if (serviceCenterId) {
                    fetch(`/api/Notifications/recipients?recipient_id=${serviceCenterId}`)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.status === "success") {
                                setNotifications(data.data); 
                                console.log("Notifications:", data.data);
                            } else {
                                console.error("Error fetching notifications:", data.message);
                            }
                        })
                        .catch((error) => console.error("Error:", error));
                }
            }
        };
        fetchSessionAndNotifications();
    }, []);

    const [isToggled, setIsToggled] = useState(false);

    const {
  
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const toggleClass = () => {
        setIsToggled(!isToggled);
    };

    // const onSubmit = (data: FormValues) => {
    //     console.log("Form Data:", data);
    // };

    return (
        <main className="add_service_center_main">
            <div className={`inner_mainbox ${isToggled ? "toggled-class" : ""}`}>
                <div className="inner_left">
                    <Sidemenu onToggle={toggleClass} />
                </div>
                <div className="inner_right">
                    <Header />
                    <div className="notification_accordion_mainbox">
                        <div className="accordion accordion-flush" id="accordionFlushNotification">
                            {notifications.map((notification, index) => (
                                <div className="accordion-item" key={index}>
                                    <div className="accordion-header" id={`notificationHeading${index}`}>
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#notification${index}`}
                                            aria-expanded="false"
                                            aria-controls={`notification${index}`}
                                        >
                                            <div className="notification_icons">
                                                <img
                                                    src={notification.icon_url || "/images/service-center/booking.svg"} 
                                                    alt="notification icon"
                                                    className="img-fluid"
                                                />
                                            </div>
                                            <div className="notification_subject">
                                                {notification.admin_notifications_v2.title || "No title"}
                                            </div>
                                            <div className="notification_date">
                                                <p>{new Date(notification.admin_notifications_v2.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </button>
                                    </div>
                                    <div
                                        id={`notification${index}`}
                                        className="accordion-collapse collapse"
                                        aria-labelledby={`notificationHeading${index}`}
                                        data-bs-parent="#accordionFlushNotification"
                                    >
                                        <div className="accordion-body">
                                            {notification.admin_notifications_v2.message || "No message available"}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default NewBooking;