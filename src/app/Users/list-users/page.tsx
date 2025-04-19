// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { createClient } from "../../../../utils/supabase/client";

// const supabase = createClient();

// export default function UserList() {
//     interface User {
//         auth_id: string;
//         name?: string; // Added name field
//         Dashboard: boolean;
//         booking_mangement: boolean;
//         billing_payments: boolean;
//         profile_mangement: boolean;
//         notification: boolean;
//         add_users: boolean;
//       }
    
//       const [users, setUsers] = useState<User[]>([]);
//       const router = useRouter();
    
//       useEffect(() => {
//         const fetchUsersWithNames = async () => {
//           try {
//             // Fetch auth_id and permissions from service_center_users_permissions
//             const { data: permissions, error: permissionsError } = await supabase
//               .from("service_center_users_permissions")
//               .select(
//                 "auth_id, Dashboard, booking_mangement, billing_payments, profile_mangement, notification, add_users"
//               );
    
//             if (permissionsError) throw permissionsError;
//             if (!permissions || permissions.length === 0) {
//               console.log("No users found");
//               return;
//             }
    
//             // Extract unique auth_id values
//             const authIds = permissions.map((user) => user.auth_id);
    
//             // Fetch corresponding user names from the users table
//             const { data: usersData, error: usersError } = await supabase
//               .from("service_center_users")
//               .select("auth_id, name")
//               .in("auth_id", authIds);
    
//             if (usersError) throw usersError;
    
//             // Merge user names with permissions data
//             const mergedUsers = permissions.map((user) => ({
//               ...user,
//               name: usersData.find((u) => u.auth_id === user.auth_id)?.name || "Unknown",
//             }));
    
//             setUsers(mergedUsers);
//           } catch (error) {
//             console.error("Error fetching users:", error);
//           }
//         };
    
//         fetchUsersWithNames();
//       }, []);

//   const handleEditClick = (auth_id: string) => {
//     router.push(`/Users/edit-user/${auth_id}`);
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-xl font-semibold mb-4">User Permissions List</h2>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-2">Auth ID</th>
//             <th className="border p-2">Name</th> {/* Added Name Column */}
//             <th className="border p-2">Dashboard</th>
//             <th className="border p-2">Booking</th>
//             <th className="border p-2">Billing</th>
//             <th className="border p-2">Profile</th>
//             <th className="border p-2">Notification</th>
//             <th className="border p-2">Add Users</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.auth_id} className="text-center">
//               <td className="border p-2">{user.auth_id}</td>
//               <td className="border p-2">{user.name}</td> {/* Display user name */}
//               <td className="border p-2">{user.Dashboard }</td>
//               <td className="border p-2">{user.booking_mangement }</td>
//               <td className="border p-2">{user.billing_payments }</td>
//               <td className="border p-2">{user.profile_mangement }</td>
//               <td className="border p-2">{user.notification }</td>
//               <td className="border p-2">{user.add_users}</td>
//               <td className="border p-2">
//                 <button
//                   className="bg-blue-500 text-white px-2 py-1 rounded"
//                   onClick={() => handleEditClick(user.auth_id)}
//                 >
//                   Edit
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "../../../../utils/supabase/client";
import Header from "../../../../components/Header";
import Sidemenu from "../../../../components/Sidemenu";
import { DataTable } from "../../../../components/ui/datatable";
import { useRouter } from "next/navigation";

const supabase = createClient();

const UserList = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [data, setData] = useState<{ auth_id: string; name: string }[]>([]);
  const router = useRouter();

  // Toggle Sidebar
  const toggleClass = () => {
    setIsToggled(!isToggled);
  };

  // Handle Edit
  const handleEdit = (auth_id: string) => {
    router.push(`/Users/edit-user/${auth_id}`);
  };

  // Define table columns
  const columns = {
    name: "Name",
   
  };

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Get auth_ids from service_center_users_permissions
        const { data: authData, error: authError } = await supabase
          .from("service_center_users_permissions")
          .select("auth_id");

        if (authError) {
          console.error("Error fetching auth_ids:", authError);
          return;
        }

        // Step 2: Get names from service_center_users using the fetched auth_ids
        const authIds = authData.map((item) => item.auth_id);

        if (authIds.length === 0) {
          setData([]); // No auth_ids found
          return;
        }

        const { data: userData, error: userError } = await supabase
          .from("service_center_users")
          .select("auth_id, name")
          .in("auth_id", authIds); // Fetch names where auth_id matches

        if (userError) {
          console.error("Error fetching names:", userError);
          return;
        }

        // Step 3: Merge both datasets
        const mergedData = authData.map((authItem) => ({
          auth_id: authItem.auth_id,
          name: userData.find((user) => user.auth_id === authItem.auth_id)?.name || "N/A",
         
          onEdit: () => handleEdit(authItem.auth_id),
         
        }));
    

        setData(mergedData);
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <main className="Service_center_list_main">
      <div className={`inner_mainbox ${isToggled ? "toggled-class" : ""}`}>
        <div className="inner_left">
          <Sidemenu onToggle={toggleClass} />
        </div>
        <div className="inner_right">
          <Header />
          <div className="new_booking_form_mainbox">
            <div className="form_listing form_listing_red form_listing_with_bg">
              <div className="form_heading_box">
                <div className="form_heading">
                  <h2>
                    Filter <span>By</span>
                  </h2>
                </div>
                <div className="form_line"></div>
                <div className="form_carbox">
                  <img
                    src="/images/service-center/car.svg"
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
              <form className="filter_form_box">
                <div className="inner_form_group">
                  <label htmlFor="status">Status</label>
                  <select
                    className="form-control"
                    name="status"
                    id="status"
                    // value={filters.status}
                    // onChange={handleFilterChange}
                  >
                    <option value="">Select Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div className="inner_form_group">
                  <label htmlFor="start_date">Start Date</label>
                  <input
                    className="form-control"
                    type="date"
                    name="start_date"
                    id="start_date"
                    // value={filters.start_date}
                    // onChange={handleFilterChange}
                  />
                </div>
                <div className="inner_form_group">
                  <label htmlFor="end_date">End Date</label>
                  <input
                    className="form-control"
                    type="date"
                    name="end_date"
                    id="end_date"
                    // value={filters.end_date}
                    // onChange={handleFilterChange}
                  />
                </div>
                <div className="inner_form_group inner_form_group_submit">
                  <div className="submite_button">
                    <input
                      type="submit"
                      className="submite_btn"
                      value="Search"
                    />
                  </div>
                  <div className="export_button">
                    {/* <CSVLink
                      data={csvData}
                      headers={[
                        { label: "Driver Name", key: "Driver_Name" },
                        {
                          label: "Service Center Name",
                          key: "Service_Center_Name",
                        },
                        { label: "Trip Id", key: "Trip_Id" },
                        { label: "Trip Status", key: "Trip_Status" },
                        { label: "Date", key: "Date" },
                        { label: "Cost", key: "Cost" },
                        { label: "Status", key: "Status" },
                      ]}
                      filename="invoice_list.csv"
                      className="close_btn"
                    >
                      Export All
                    </CSVLink> */}
                  </div>

                  <div className="clear_button">
                    <input
                      type="button"
                      className="close_btn"
                      value="Clear"
                     
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="data_listing_box">
            <div className="form_heading_box">
              <div className="form_heading">
                <h2>
                  <span>Invoice</span> List
                </h2>
              </div>
              <div className="form_line"></div>
            </div>
            <div className="filter_data_table">
            
                <DataTable
                  columns={columns}
                  data={data}
                  showStatusButton={true}
                />
        
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserList;
