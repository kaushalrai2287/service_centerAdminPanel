// "use client";
// import React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// // import { logout } from "./action";
// import { logout } from "@/app/dashboard/action";

// const Sidemenu = ({ onToggle }: { onToggle: () => void }) => {
//   const pathname = usePathname(); // Get the current path

//   // Function to check if a section should be open
//   const isSectionOpen = (sectionPaths: string[]) => {
//     return sectionPaths.some((path) => pathname.startsWith(path));
//   };

//   const isActiveLink = (link: string) => {
//     return pathname === link || pathname.startsWith(link);
//   };

//   return (
//     <main className="sidemenu_main">
//       <div className="sidemenu_mainbox">
//         <div className="sidemenu_logobox">
//           <img src="/images/service-center/chofor-logo.png" alt="" className="img-fluid" />
//         </div>
//         <div className="accordion accordion-flush" id="accordionFlushExample">
//           {/* Dashboard */}
//           <Link href="/">
//             <div className="sidemenu_listing">
//               <div className="sidemenu_icon">
//                 <img
//                   src="/images/dashboard/dashboard.svg"
//                   alt=""
//                   className="img-fluid"
//                 />
//               </div>
//               <div className="sidemenu_heading">
//                 <h3>Dashboard</h3>
//                  <button onClick={() => logout()}>Logout</button>;
//               </div>
//             </div>
//           </Link>
//           {/*  Booking Management */}
//           <div className="accordion-item">
//             <div className="accordion-header" id="flush-headingOne">
//               <button
//                 className={`accordion-button ${isSectionOpen(["/booking-management"]) ? "" : "collapsed"
//                   }`}
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#flush-collapseOne"
//                 aria-expanded={isSectionOpen(["/booking-management"])}
//                 aria-controls="flush-collapseOne"
//               >
//                 <div className="sidemenu_listing">
//                   <div className="sidemenu_icon">
//                     <img
//                       src="/images/dashboard/service-center.svg"
//                       alt=""
//                       className="img-fluid"
//                     />
//                   </div>
//                   <div className="sidemenu_heading">
//                     <h3>Booking Management</h3>
//                   </div>
//                 </div>
//               </button>
//             </div>
//             <div
//               id="flush-collapseOne"
//               className={`accordion-collapse collapse ${isSectionOpen(["/booking-management"]) ? "show" : ""
//                 }`}
//               aria-labelledby="flush-headingOne"
//               data-bs-parent="#accordionFlushExample"
//             >
//               <div className="accordion-body">
//                 <div className="sidemunu_submenu_listing">
//                   <ul>
//                     <li className={isActiveLink("/booking-management/new-booking") ? "heighlight" : ""}>
//                       <Link href="/booking-management/new-booking">New Booking</Link>
//                     </li>
//                     <li className={isActiveLink("/booking-management/booking-list") ? "heighlight" : ""}>
//                       <Link href="/booking-management/booking-list">Booking List</Link>
//                     </li> 
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Drivers */}
//           <div className="accordion-item">
//             <div className="accordion-header" id="flush-headingTwo">
//               <button
//                 className={`accordion-button ${isSectionOpen(["/drivers"]) ? "" : "collapsed"
//                   }`}
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#flush-collapseTwo"
//                 aria-expanded={isSectionOpen(["/drivers"])}
//                 aria-controls="flush-collapseTwo"
//               >
//                 <div className="sidemenu_listing">
//                   <div className="sidemenu_icon">
//                     <img
//                       src="/images/dashboard/drivers.svg"
//                       alt=""
//                       className="img-fluid"
//                     />
//                   </div>
//                   <div className="sidemenu_heading">
//                     <h3>Drivers</h3>
//                   </div>
//                 </div>
//               </button>
//             </div>
//             <div
//               id="flush-collapseTwo"
//               className={`accordion-collapse collapse ${isSectionOpen(["/drivers"]) ? "show" : ""
//                 }`}
//               aria-labelledby="flush-headingTwo"
//               data-bs-parent="#accordionFlushExample"
//             >
//               <div className="accordion-body">
//                 <div className="sidemunu_submenu_listing">
//                   <ul>
//                     <li className={isActiveLink("/drivers/manage-drivers") ? "heighlight" : ""}>
//                       <Link href="/drivers/manage-drivers">Manage Drivers</Link>
//                     </li>
//                     <li className={isActiveLink("/drivers/driver-payments") ? "heighlight" : ""}>
//                       <Link href="/drivers/driver-payments">Driver Payments</Link>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Bookings */}
//           <div className="accordion-item">
//             <div className="accordion-header" id="flush-headingThree">
//               <button
//                 className={`accordion-button ${isSectionOpen(["/bookings"]) ? "" : "collapsed"
//                   }`}
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#flush-collapseThree"
//                 aria-expanded={isSectionOpen(["/bookings"])}
//                 aria-controls="flush-collapseThree"
//               >
//                 <div className="sidemenu_listing">
//                   <div className="sidemenu_icon">
//                     <img
//                       src="/images/dashboard/booking.svg"
//                       alt=""
//                       className="img-fluid"
//                     />
//                   </div>
//                   <div className="sidemenu_heading">
//                     <h3>Bookings</h3>
//                   </div>
//                 </div>
//               </button>
//             </div>
//             <div
//               id="flush-collapseThree"
//               className={`accordion-collapse collapse ${isSectionOpen(["/bookings"]) ? "show" : ""
//                 }`}
//               aria-labelledby="flush-headingThree"
//               data-bs-parent="#accordionFlushExample"
//             >
//               <div className="accordion-body">
//                 <div className="sidemunu_submenu_listing">
//                   <ul>
//                     <li className={isActiveLink("/bookings/manage-bookings/list") ? "heighlight" : ""}>
//                       <Link href="/bookings/manage-bookings/list">
//                         Manage Bookings
//                       </Link>
//                     </li>
//                     <li className={isActiveLink("/bookings/tracking") ? "heighlight" : ""}>
//                       <Link href="/bookings/tracking">Tracking</Link>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Roles & Permissions */}
//           <div className="accordion-item">
//             <div className="accordion-header" id="flush-headingFour">
//               <button
//                 className={`accordion-button ${isSectionOpen(["/rolls-permission"]) ? "" : "collapsed"
//                   }`}
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#flush-collapseFour"
//                 aria-expanded={isSectionOpen(["/rolls-permission"])}
//                 aria-controls="flush-collapseFour"
//               >
//                 <div className="sidemenu_listing">
//                   <div className="sidemenu_icon">
//                     <img
//                       src="/images/dashboard/roles-permissions.svg"
//                       alt=""
//                       className="img-fluid"
//                     />
//                   </div>
//                   <div className="sidemenu_heading">
//                     <h3>Roles & Permissions</h3>
//                   </div>
//                 </div>
//               </button>
//             </div>
//             <div
//               id="flush-collapseFour"
//               className={`accordion-collapse collapse ${isSectionOpen(["/rolls-permission"]) ? "show" : ""
//                 }`}
//               aria-labelledby="flush-headingFour"
//               data-bs-parent="#accordionFlushExample"
//             >
//               <div className="accordion-body">
//                 <div className="sidemunu_submenu_listing">
//                   <ul>
//                     <li className={isActiveLink("/rolls-permission/list") ? "heighlight" : ""}>
//                       <Link href="/rolls-permission/list">Manage Roles</Link>
//                     </li>
//                     <li className={isActiveLink("/rolls-permission/assign-permissions") ? "heighlight" : ""}>
//                       <Link href="/rolls-permission/assign-permissions">
//                         Assign Permissions
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Notifications */}
//           <div className="accordion-item">
//             <div className="accordion-header" id="flush-headingSix">
//               <button
//                 className={`accordion-button ${isSectionOpen(["/notifications"]) ? "" : "collapsed"
//                   }`}
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#flush-collapseSix"
//                 aria-expanded={isSectionOpen(["/notifications"])}
//                 aria-controls="flush-collapseSix"
//               >
//                 <div className="sidemenu_listing">
//                   <div className="sidemenu_icon">
//                     <img
//                       src="/images/dashboard/notification.svg"
//                       alt=""
//                       className="img-fluid"
//                     />
//                   </div>
//                   <div className="sidemenu_heading">
//                     <h3>Notifications</h3>
//                   </div>
//                 </div>
//               </button>
//             </div>
//             <div
//               id="flush-collapseSix"
//               className={`accordion-collapse collapse ${isSectionOpen(["/notifications"]) ? "show" : ""
//                 }`}
//               aria-labelledby="flush-headingSix"
//               data-bs-parent="#accordionFlushExample"
//             >
//               <div className="accordion-body">
//                 <div className="sidemunu_submenu_listing">
//                   <ul>
//                     <li className={isActiveLink("/notifications/service-center/list") ? "heighlight" : ""}>
//                       <Link href="/notifications/service-center/list">
//                         To Service Center
//                       </Link>
//                     </li>
//                     <li className={isActiveLink("/notifications/driver/list") ? "heighlight" : ""}>
//                       <Link href="/notifications/driver/list">To Driver</Link>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Feedback & Complaints */}
//           <div className="accordion-item">
//             <div className="accordion-header" id="flush-headingSeven">
//               <button
//                 className={`accordion-button ${isSectionOpen(["/feedback-complaints"]) ? "" : "collapsed"
//                   }`}
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#flush-collapseSeven"
//                 aria-expanded={isSectionOpen(["/feedback-complaints"])}
//                 aria-controls="flush-collapseSeven"
//               >
//                 <div className="sidemenu_listing">
//                   <div className="sidemenu_icon">
//                     <img
//                       src="/images/dashboard/feedback-rating.svg"
//                       alt=""
//                       className="img-fluid"
//                     />
//                   </div>
//                   <div className="sidemenu_heading">
//                     <h3>Feedback & Complaints</h3>
//                   </div>
//                 </div>
//               </button>
//             </div>
//             <div
//               id="flush-collapseSeven"
//               className={`accordion-collapse collapse ${isSectionOpen(["/feedback-complaints"]) ? "show" : ""
//                 }`}
//               aria-labelledby="flush-headingSeven"
//               data-bs-parent="#accordionFlushExample"
//             >
//               <div className="accordion-body">
//                 <div className="sidemunu_submenu_listing">
//                   <ul>
//                     <li className={isActiveLink("/feedback-complaints/ratings-review-feedback") ? "heighlight" : ""}>
//                       <Link href="/feedback-complaints/ratings-review-feedback">
//                         Ratings, Review Feedback
//                       </Link>
//                     </li>
//                     <li className={isActiveLink("/feedback-complaints/complaints") ? "heighlight" : ""}>
//                       <Link href="/feedback-complaints/complaints">List of Complaints</Link>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Invoices */}
//           <div className="accordion-item">
//             <div className="accordion-header" id="flush-headingEight">
//               <button
//                 className={`accordion-button ${isSectionOpen(["/invoices"]) ? "" : "collapsed"
//                   }`}
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#flush-collapseEight"
//                 aria-expanded={isSectionOpen(["/invoices"])}
//                 aria-controls="flush-collapseEight"
//               >
//                 <div className="sidemenu_listing">
//                   <div className="sidemenu_icon">
//                     <img
//                       src="/images/dashboard/Invoices.svg"
//                       alt=""
//                       className="img-fluid"
//                     />
//                   </div>
//                   <div className="sidemenu_heading">
//                     <h3>Invoices</h3>
//                   </div>
//                 </div>
//               </button>
//             </div>
//             <div
//               id="flush-collapseEight"
//               className={`accordion-collapse collapse ${isSectionOpen(["/invoices"]) ? "show" : ""
//                 }`}
//               aria-labelledby="flush-headingEight"
//               data-bs-parent="#accordionFlushExample"
//             >
//               <div className="accordion-body">
//                 <div className="sidemunu_submenu_listing">
//                   <ul>
//                     <li className={isActiveLink("/invoices/service-center") ? "heighlight" : ""}>
//                       <Link href="/invoices/service-center">Service Center Invoices</Link>
//                     </li>
//                     <li className={isActiveLink("/invoices/driver") ? "heighlight" : ""}>
//                       <Link href="/invoices/driver">Driver Invoices</Link>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Documents */}
//           <Link href="">
//             <div className="sidemenu_listing">
//               <div className="sidemenu_icon">
//                 <img src="/images/dashboard/documents.svg" alt="" className="img-fluid" />
//               </div>
//               <div className="sidemenu_heading">
//                 <h3>Documents</h3>
//               </div>
//             </div>
//           </Link>
//           {/* Settings */}
//           <div className="accordion-item">
//             <div className="accordion-header" id="flush-headingFive">
//               <button
//                 className={`accordion-button ${isSectionOpen(["/settings"]) ? "" : "collapsed"
//                   }`}
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#flush-collapseFive"
//                 aria-expanded={isSectionOpen(["/settings"])}
//                 aria-controls="flush-collapseFive"
//               >
//                 <div className="sidemenu_listing">
//                   <div className="sidemenu_icon">
//                     <img
//                       src="/images/dashboard/settings.svg"
//                       alt=""
//                       className="img-fluid"
//                     />
//                   </div>
//                   <div className="sidemenu_heading">
//                     <h3>Settings</h3>
//                   </div>
//                 </div>
//               </button>
//             </div>
//             <div
//               id="flush-collapseFive"
//               className={`accordion-collapse collapse ${isSectionOpen(["/settings"]) ? "show" : ""
//                 }`}
//               aria-labelledby="flush-headingFive"
//               data-bs-parent="#accordionFlushExample"
//             >
//               <div className="accordion-body">
//                 <div className="sidemunu_submenu_listing">
//                   <ul>
//                     <li className={isActiveLink("/settings/system-settings") ? "heighlight" : ""}>
//                       <Link href="/settings/system-settings">System Settings</Link>
//                     </li>
//                     <li className={isActiveLink("/settings/rate-settings") ? "heighlight" : ""}>
//                       <Link href="">Rate Settings</Link>
//                     </li>
//                     <li className={isActiveLink("/settings/tracking-settings") ? "heighlight" : ""}>
//                       <Link href="">Tracking Settings</Link>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Miscellaneous / Category Management */}
//           <div className="accordion-item">
//             <div className="accordion-header" id="flush-headingNine">
//               <button
//                 className={`accordion-button ${isSectionOpen(["/miscellaneous"]) ? "" : "collapsed"
//                   }`}
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#flush-collapseNine"
//                 aria-expanded={isSectionOpen(["/miscellaneous"])}
//                 aria-controls="flush-collapseNine"
//               >
//                 <div className="sidemenu_listing">
//                   <div className="sidemenu_icon">
//                     <img
//                       src="/images/dashboard/miscellaneous.svg"
//                       alt=""
//                       className="img-fluid"
//                     />
//                   </div>
//                   <div className="sidemenu_heading">
//                     <h3>Miscellaneous/ Category management</h3>
//                   </div>
//                 </div>
//               </button>
//             </div>
//             <div
//               id="flush-collapseNine"
//               className={`accordion-collapse collapse ${isSectionOpen(["/miscellaneous"]) ? "show" : ""
//                 }`}
//               aria-labelledby="flush-headingNine"
//               data-bs-parent="#accordionFlushExample"
//             >
//               <div className="accordion-body">
//                 <div className="sidemunu_submenu_listing">
//                   <ul>
//                     <li className={isActiveLink("/miscellaneous/brand/list") ? "heighlight" : ""}>
//                       <Link href="/miscellaneous/brand/list">Brand</Link>
//                     </li>
//                     <li className={isActiveLink("/miscellaneous/model/list") ? "heighlight" : ""}>
//                       <Link href="/miscellaneous/model/list">Model</Link>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Reports */}
//           <Link href="">
//             <div className="sidemenu_listing">
//               <div className="sidemenu_icon">
//                 <img src="/images/dashboard/reports.svg" alt="" className="img-fluid" />
//               </div>
//               <div className="sidemenu_heading">
//                 <h3>Reports</h3>
//               </div>
//             </div>
//           </Link>
//         </div>
//       </div>
//       <div className="toggle-button" onClick={onToggle}>
//         <img
//           src="/images/service-center/toggle-left-box.png"
//           alt="Toggle Sidebar"
//           className="img-fluid"
//         />
//       </div>
//     </main>
//   );
// };

// export default Sidemenu;
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { logout } from "@/app/dashboard/action";

const Sidemenu = ({ onToggle }: { onToggle: () => void }) => {
  const pathname = usePathname(); // Get the current path

  // Function to check if a section should be open
  const isSectionOpen = (sectionPaths: string[]) => {
    return sectionPaths.some((path) => pathname.startsWith(path));
  };

  const isActiveLink = (link: string) => {
    return pathname === link || pathname.startsWith(link);
  };

  return (
    <main className="sidemenu_main">
      <div className="sidemenu_mainbox">
        <div className="sidemenu_logobox">
          <img src="/images/service-center/chofor-logo.png" alt="" className="img-fluid" />
        </div>
        <div className="accordion accordion-flush" id="accordionFlushExample">
          {/* Dashboard */}
          <Link href="#">
            <div className="sidemenu_listing">
              <div className="sidemenu_icon">
                <img
                  src="/images/dashboard/dashboard.svg"
                  alt=""
                  className="img-fluid"
                />
              </div>
              <div className="sidemenu_heading">
                <h3>Dashboard</h3>
               
              </div>
            </div>
          </Link>
          {/*  Booking Management */}
          <div className="accordion-item">
            <div className="accordion-header" id="flush-headingOne">
              <button
                className={`accordion-button ${isSectionOpen(["/booking-management"]) ? "" : "collapsed"
                  }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded={isSectionOpen(["/booking-management"])}
                aria-controls="flush-collapseOne"
              >
                <div className="sidemenu_listing">
                  <div className="sidemenu_icon">
                    <img
                      src="/images/dashboard/service-center.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="sidemenu_heading">
                    <h3>Booking Management</h3>
                  </div>
                </div>
              </button>
            </div>
            <div
              id="flush-collapseOne"
              className={`accordion-collapse collapse ${isSectionOpen(["/booking-management"]) ? "show" : ""
                }`}
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="sidemunu_submenu_listing">
                  <ul>
                    <li className={isActiveLink("/booking-management/new-booking") ? "heighlight" : ""}>
                      <Link href="/booking-management/new-booking">New Booking</Link>
                    </li>
                    <li className={isActiveLink("/booking-management/booking-list") ? "heighlight" : ""}>
                      <Link href="/booking-management/booking-list">Booking List</Link>
                    </li> 
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Billing and Payments */}
          <div className="accordion-item">
            <div className="accordion-header" id="flush-headingTwo">
              <button
                className={`accordion-button ${isSectionOpen(["/billing-and-payments"]) ? "" : "collapsed"
                  }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded={isSectionOpen(["/billing-and-payments"])}
                aria-controls="flush-collapseTwo"
              >
                <div className="sidemenu_listing">
                  <div className="sidemenu_icon">
                    <img
                      src="/images/dashboard/drivers.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="sidemenu_heading">
                    <h3>Billing and Payments</h3>
                  </div>
                </div>
              </button>
            </div>
            <div
              id="flush-collapseTwo"
              className={`accordion-collapse collapse ${isSectionOpen(["/billing-and-payments"]) ? "show" : ""
                }`}
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="sidemunu_submenu_listing">
                  <ul>
                    <li className={isActiveLink("/billing-and-payments/invoice-list") ? "heighlight" : ""}>
                      <Link href="/billing-and-payments/invoice-list">Invoice List</Link>
                    </li>
                    <li className={isActiveLink("/billing-and-payments/invoice-details") ? "heighlight" : ""}>
                      <Link href="/billing-and-payments/invoice-details">Invoice Details</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Profile Management */}
          <div className="accordion-item">
            <div className="accordion-header" id="flush-headingThree">
              <button
                className={`accordion-button ${isSectionOpen(["/profile-management"]) ? "" : "collapsed"
                  }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded={isSectionOpen(["/profile-management"])}
                aria-controls="flush-collapseThree"
              >
                <div className="sidemenu_listing">
                  <div className="sidemenu_icon">
                    <img
                      src="/images/dashboard/booking.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="sidemenu_heading">
                    <h3>Profile Management</h3>
                  </div>
                </div>
              </button>
            </div>
            <div
              id="flush-collapseThree"
              className={`accordion-collapse collapse ${isSectionOpen(["/profile-management"]) ? "show" : ""
                }`}
              aria-labelledby="flush-headingThree"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="sidemunu_submenu_listing">
                  <ul>
                    <li className={isActiveLink("/profile-management/service-center") ? "heighlight" : ""}>
                      <Link href="/profile-management/service-center">
                      Service Center
                      </Link>
                    </li>
                    <li className={isActiveLink("/profile-management/customer-list") ? "heighlight" : ""}>
                      <Link href="/profile-management/customer-list">Customer List</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Roles & Permissions */}
          {/* <div className="accordion-item">
            <div className="accordion-header" id="flush-headingFour">
              <button
                className={`accordion-button ${isSectionOpen(["/rolls-permission"]) ? "" : "collapsed"
                  }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseFour"
                aria-expanded={isSectionOpen(["/rolls-permission"])}
                aria-controls="flush-collapseFour"
              >
                <div className="sidemenu_listing">
                  <div className="sidemenu_icon">
                    <img
                      src="/images/dashboard/roles-permissions.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="sidemenu_heading">
                    <h3>Roles & Permissions</h3>
                  </div>
                </div>
              </button>
            </div>
            <div
              id="flush-collapseFour"
              className={`accordion-collapse collapse ${isSectionOpen(["/rolls-permission"]) ? "show" : ""
                }`}
              aria-labelledby="flush-headingFour"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="sidemunu_submenu_listing">
                  <ul>
                    <li className={isActiveLink("/rolls-permission/list") ? "heighlight" : ""}>
                      <Link href="/rolls-permission/list">Manage Roles</Link>
                    </li>
                    <li className={isActiveLink("/rolls-permission/assign-permissions") ? "heighlight" : ""}>
                      <Link href="/rolls-permission/assign-permissions">
                        Assign Permissions
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
          {/* Notifications */}
          <div className="accordion-item">
            <div className="accordion-header" id="flush-headingSix">
              <button
                className={`accordion-button ${isSectionOpen(["/notifications"]) ? "" : "collapsed"
                  }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseSix"
                aria-expanded={isSectionOpen(["/notifications"])}
                aria-controls="flush-collapseSix"
              >
                <div className="sidemenu_listing">
                  <div className="sidemenu_icon">
                    <img
                      src="/images/dashboard/notification.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="sidemenu_heading">
                    <h3>Notifications</h3>
                  </div>
                </div>
              </button>
            </div>
            <div
              id="flush-collapseSix"
              className={`accordion-collapse collapse ${isSectionOpen(["/notifications"]) ? "show" : ""
                }`}
              aria-labelledby="flush-headingSix"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="sidemunu_submenu_listing">
                  <ul>
                    <li className={isActiveLink("/notifications/notification-list") ? "heighlight" : ""}>
                      <Link href="/notifications/notification-list">
                        Notification List
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>










          {/* Feedback & Complaints */}
          {/* <div className="accordion-item">
            <div className="accordion-header" id="flush-headingSeven">
              <button
                className={`accordion-button ${isSectionOpen(["/feedback-complaints"]) ? "" : "collapsed"
                  }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseSeven"
                aria-expanded={isSectionOpen(["/feedback-complaints"])}
                aria-controls="flush-collapseSeven"
              >
                <div className="sidemenu_listing">
                  <div className="sidemenu_icon">
                    <img
                      src="/images/dashboard/feedback-rating.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="sidemenu_heading">
                    <h3>Feedback & Complaints</h3>
                  </div>
                </div>
              </button>
            </div>
            <div
              id="flush-collapseSeven"
              className={`accordion-collapse collapse ${isSectionOpen(["/feedback-complaints"]) ? "show" : ""
                }`}
              aria-labelledby="flush-headingSeven"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="sidemunu_submenu_listing">
                  <ul>
                    <li className={isActiveLink("/feedback-complaints/ratings-review-feedback") ? "heighlight" : ""}>
                      <Link href="/feedback-complaints/ratings-review-feedback">
                        Ratings, Review Feedback
                      </Link>
                    </li>
                    <li className={isActiveLink("/feedback-complaints/complaints") ? "heighlight" : ""}>
                      <Link href="/feedback-complaints/complaints">List of Complaints</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
          {/* Invoices */}
          {/* <div className="accordion-item">
            <div className="accordion-header" id="flush-headingEight">
              <button
                className={`accordion-button ${isSectionOpen(["/invoices"]) ? "" : "collapsed"
                  }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseEight"
                aria-expanded={isSectionOpen(["/invoices"])}
                aria-controls="flush-collapseEight"
              >
                <div className="sidemenu_listing">
                  <div className="sidemenu_icon">
                    <img
                      src="/images/dashboard/Invoices.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="sidemenu_heading">
                    <h3>Invoices</h3>
                  </div>
                </div>
              </button>
            </div>
            <div
              id="flush-collapseEight"
              className={`accordion-collapse collapse ${isSectionOpen(["/invoices"]) ? "show" : ""
                }`}
              aria-labelledby="flush-headingEight"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="sidemunu_submenu_listing">
                  <ul>
                    <li className={isActiveLink("/invoices/service-center") ? "heighlight" : ""}>
                      <Link href="/invoices/service-center">Service Center Invoices</Link>
                    </li>
                    <li className={isActiveLink("/invoices/driver") ? "heighlight" : ""}>
                      <Link href="/invoices/driver">Driver Invoices</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
          {/* Documents */}
          {/* <Link href="">
            <div className="sidemenu_listing">
              <div className="sidemenu_icon">
                <img src="/images/dashboard/documents.svg" alt="" className="img-fluid" />
              </div>
              <div className="sidemenu_heading">
                <h3>Documents</h3>
              </div>
            </div>
          </Link> */}
          {/* Settings */}
          {/* <div className="accordion-item">
            <div className="accordion-header" id="flush-headingFive">
              <button
                className={`accordion-button ${isSectionOpen(["/settings"]) ? "" : "collapsed"
                  }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseFive"
                aria-expanded={isSectionOpen(["/settings"])}
                aria-controls="flush-collapseFive"
              >
                <div className="sidemenu_listing">
                  <div className="sidemenu_icon">
                    <img
                      src="/images/dashboard/settings.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="sidemenu_heading">
                    <h3>Settings</h3>
                  </div>
                </div>
              </button>
            </div>
            <div
              id="flush-collapseFive"
              className={`accordion-collapse collapse ${isSectionOpen(["/settings"]) ? "show" : ""
                }`}
              aria-labelledby="flush-headingFive"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="sidemunu_submenu_listing">
                  <ul>
                    <li className={isActiveLink("/settings/system-settings") ? "heighlight" : ""}>
                      <Link href="/settings/system-settings">System Settings</Link>
                    </li>
                    <li className={isActiveLink("/settings/rate-settings") ? "heighlight" : ""}>
                      <Link href="">Rate Settings</Link>
                    </li>
                    <li className={isActiveLink("/settings/tracking-settings") ? "heighlight" : ""}>
                      <Link href="">Tracking Settings</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
          {/* Miscellaneous / Category Management */}
          {/* <div className="accordion-item">
            <div className="accordion-header" id="flush-headingNine">
              <button
                className={`accordion-button ${isSectionOpen(["/miscellaneous"]) ? "" : "collapsed"
                  }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseNine"
                aria-expanded={isSectionOpen(["/miscellaneous"])}
                aria-controls="flush-collapseNine"
              >
                <div className="sidemenu_listing">
                  <div className="sidemenu_icon">
                    <img
                      src="/images/dashboard/miscellaneous.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="sidemenu_heading">
                    <h3>Miscellaneous/ Category management</h3>
                  </div>
                </div>
              </button>
            </div>
            <div
              id="flush-collapseNine"
              className={`accordion-collapse collapse ${isSectionOpen(["/miscellaneous"]) ? "show" : ""
                }`}
              aria-labelledby="flush-headingNine"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="sidemunu_submenu_listing">
                  <ul>
                    <li className={isActiveLink("/miscellaneous/brand/list") ? "heighlight" : ""}>
                      <Link href="/miscellaneous/brand/list">Brand</Link>
                    </li>
                    <li className={isActiveLink("/miscellaneous/model/list") ? "heighlight" : ""}>
                      <Link href="/miscellaneous/model/list">Model</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
          {/* Reports */}
          {/* <Link href="">
            <div className="sidemenu_listing">
              <div className="sidemenu_icon">
                <img src="/images/dashboard/reports.svg" alt="" className="img-fluid" />
              </div>
              <div className="sidemenu_heading">
                <h3>Reports</h3>
              </div>
            </div>
          </Link> */}
        </div>
      </div>
      <div className="toggle-button" onClick={onToggle}>
        <img
          src="/images/service-center/toggle-left-box.png"
          alt="Toggle Sidebar"
          className="img-fluid"
        />
      </div>
    </main>
  );
};

export default Sidemenu;
