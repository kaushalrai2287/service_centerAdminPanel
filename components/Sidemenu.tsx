
"use client";
// import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePermissions } from "../utils/services/PermissionsContext";
// import { logout } from "@/app/dashboard/action";
import React, { useEffect, useState, useCallback } from "react";
import { createClient } from "../utils/supabase/client";

const supabase = createClient();

const Sidemenu = ({ onToggle }: { onToggle: () => void }) => {
  
  // const { permissions } = usePermissions();
  const pathname = usePathname(); 
  const { permissions } = usePermissions();
  const [userType, setUserType] = useState<number | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
      } else {
        console.error("Error fetching user:", error);
      }
    };
  
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPermissions = async () => {
      if (!userId) return; // Ensure userId is available before making the request
      
      try {
        const response = await fetch("/api/UserType", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }), // Send userId in body
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setUserType(data.user_type);
          console.log("User Type:", data.user_type);
        } else {
          console.error("Error:", data.error);
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };
  
    fetchPermissions();
  }, [userId]); // Only run when userId is available
  

  // useEffect(() => {
  //   const fetchPermissions = async () => {
  //     if (!userId) return; // Ensure userId is available before making the request
      
  //     try {
  //       const response = await fetch(`/api/UserType/${userId}`);
  //       const data = await response.json();
        
  //       setUserType(data.user_type);
  //       console.log("User Type", data.user_type);
  //     } catch (error) {
  //       console.error("Error fetching permissions:", error);
  //     }
  //   };
  
  //   fetchPermissions();
  // }, [userId]); // Only run when userId is available


  const hasPermission = useCallback(
    (permission: string) => userType === 0 || permissions.includes(permission),
    [userType, permissions]
  );

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
          {hasPermission("Dashboard") && (
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
          )}
          {/*  Booking Management */}
          {hasPermission("booking_mangement") && (
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
          )}
          {/* Billing and Payments */}
          {hasPermission("billing_payments") && (
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
                      src="/images/dashboard/Invoices.svg"
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
                    <li className={isActiveLink("#") ? "heighlight" : ""}>
                      <Link href="#">Invoice Details</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          )}
          {/* Profile Management */}
          {hasPermission("profile_mangement") && (
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
                      src="/images/dashboard/roles-permissions.svg"
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
          )}
          {/* Notifications */}
          {hasPermission("notification") && (
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
 )}
          {hasPermission("add_users") && (
          <div className="accordion-item">
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
                    <h3>Manage Users</h3>
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
                    <li className={isActiveLink("/Users/add-users") ? "heighlight" : ""}>
                      <Link href="/Users/add-users">Add Users</Link>
                    </li>
                    <li className={isActiveLink("/Users/list-users") ? "heighlight" : ""}>
                      <Link href="/Users/list-users">Users</Link>
                    </li>
                
                  </ul>
                </div>
              </div>
            </div>
          </div>
            )} 
    
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
