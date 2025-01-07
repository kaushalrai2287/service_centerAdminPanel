// // final code
// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import Header from '../../../../components/Header';
// import Sidemenu from "../../../../components/Sidemenu";
// import { DataTable } from "../../../../components/ui/datatable";
// import Link from "next/link";
// import HeadingBredcrum from "../../../../components/HeadingBredcrum";

// const InvoiceList = () => {
//     const [isToggled, setIsToggled] = useState(false); // State for toggle

//     const toggleClass = () => {
//         setIsToggled(!isToggled);
//     };

//     const columns = {
//         Driver_Name: "Driver Name",
//         Service_Center_Name: "Service Center Name",
//         Trip_Id: "Trip Id",
//         Trip_Status: "Trip Status",
//         Date: "Date",
//         Cost: "Cost",
//         Status: "Status", // Add Status to columns
//     };

//     const data = [
//         {
//             Driver_Name: 'Rahul',
//             Service_Center_Name: 'abc services',
//             Trip_Id: '889',
//             Trip_Status: 'Completed',
//             Date: '12-04-2024',
//             Cost: '1200',
//             Status: 'Active',
//             editLink: '#', // Edit page link
//             deleteLink: '#', // Delete page link
//         },
//     ];

//     const hiddenColumns = [];

//     return (
//         <main className="Service_center_list_main">
//             <div className={`inner_mainbox ${isToggled ? "toggled-class" : ""}`}>
//                 <div className="inner_left">
//                     <Sidemenu onToggle={toggleClass} />
//                 </div>
//                 <div className="inner_right">
//                     <Header />
//                     <div className="new_booking_form_mainbox">
//                         <div className="form_listing form_listing_red form_listing_with_bg">
//                             <div className="form_heading_box">
//                                 <div className="form_heading">
//                                     <h2>Filter <span>By</span></h2>
//                                 </div>
//                                 <div className="form_line"></div>
//                                 <div className="form_carbox">
//                                     <img src="/images/service-center/car.svg" alt="" className="img-fluid" />
//                                 </div>
//                             </div>
//                             <div className="filter_form_box">
//                                 <div className="inner_form_group">
//                                     <label htmlFor="status">Status</label>
//                                     <select className="form-control" name="status" id="status">
//                                         <option value="">Select Status</option>
//                                         <option value="Paid">Paid</option>
//                                         <option value="In Process">In Process</option>
//                                         <option value="Pending">Pending</option>
//                                     </select>
//                                     <div className="down_arrow_btn">
//                                         <img src="/images/angle-small-down.svg" alt="" className="img-fluid" />
//                                     </div>
//                                 </div>
//                                 <div className="inner_form_group">
//                                     <label htmlFor="start_date">Start Date</label>
//                                     <input className="form-control" type="date" name="start_date" id="start_date" />
//                                 </div>
//                                 <div className="inner_form_group">
//                                     <label htmlFor="end_date">End Date</label>
//                                     <input className="form-control" type="date" name="end_date" id="end_date" />
//                                 </div>
//                                 <div className="inner_form_group inner_form_group_submit">
//                                     <div className="submite_button">
//                                         <input type="submit" className='submite_btn' value="Search" />
//                                     </div>
//                                     <div className="export_button">
//                                         <input type="submit" className='close_btn' value="Export All" />
//                                     </div>
//                                     <div className="clear_button">
//                                         <input type="submit" className='close_btn' value="Clear" />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="data_listing_box">
//                         <div className="form_heading_box">
//                             <div className="form_heading">
//                                 <h2><span>Invoice</span> List</h2>
//                             </div>
//                             <div className="form_line"></div>
//                             <div className="form_carbox">
//                                 <img src="/images/service-center/car.svg" alt="" className="img-fluid" />
//                             </div>
//                         </div>
//                         <div className="filter_data_table">
//                             <DataTable columns={columns} data={data}
//                                 showStatusButton={true} />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     )
// }

// export default InvoiceList
// "use client";

// import React, { useState, useEffect } from "react";
// import Header from '../../../../components/Header';
// import Sidemenu from "../../../../components/Sidemenu";
// import { DataTable } from "../../../../components/ui/datatable";

// const InvoiceList = () => {
//     const [isToggled, setIsToggled] = useState(false); // State for toggle
//     const [data, setData] = useState([]); // State for API data
//     const [loading, setLoading] = useState(false); // State for loading
//     const [error, setError] = useState(null); // State for error
//     const [filters, setFilters] = useState({
//         status: "",
//         start_date: "",
//         end_date: ""
//     });

//     // Toggle Sidebar
//     const toggleClass = () => {
//         setIsToggled(!isToggled);
//     };

//     // Define table columns
//     const columns = {
//         Driver_Name: "Driver Name",
//         Service_Center_Name: "Service Center Name",
//         Trip_Id: "Trip Id",
//         Trip_Status: "Trip Status",
//         Date: "Date",
//         Cost: "Cost",
//         Status: "Status",
//     };

//     // Fetch data from API
//     const fetchData = async () => {
//         setLoading(true);
//         setError(null);

//         const query = new URLSearchParams();
//         if (filters.status) query.append("status", filters.status);
//         if (filters.start_date) query.append("start_date", filters.start_date);
//         if (filters.end_date) query.append("end_date", filters.end_date);

//         try {
//             const response = await fetch("/api/ServiceCenterInvoices", {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ ...filters }),
//               });
//             const result = await response.json();

//             if (result.success) {
//                 // Map API data to table structure
//                 const formattedData = result.data.map((item: { drivers: { driver_name: any; }; service_centers: { name: any; }; booking_id: any; is_paid: any; payment_date: any; total_amount: any; }) => ({
//                     Driver_Name: item.drivers?.driver_name || "N/A",
//                     Service_Center_Name: item.service_centers?.name || "N/A",
//                     Trip_Id: item.booking_id,
//                     Trip_Status: item.is_paid ? "Paid" : "Pending",
//                     Date: item.payment_date || "N/A",
//                     Cost: item.total_amount || "N/A",
//                     Status: item.is_paid ? "Paid" : "Pending",
//                     editLink: `#edit/${item.booking_id}`,
//                     deleteLink: `#delete/${item.booking_id}`,
//                 }));

//                 setData(formattedData);
//                 console.log(formattedData)
//             } else {
//                 throw new Error(result.error || "Failed to fetch data");
//             }
//         } catch (err: any) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Handle Filter Form Submit
//     const handleFilterSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         fetchData();
//     };

//     // Clear Filters
//     const handleClearFilters = () => {
//         setFilters({ status: "", start_date: "", end_date: "" });
//         fetchData();
//     };

//     // Fetch data on initial render
//     useEffect(() => {
//         fetchData();
//     }, []);

//     return (
//         <main className="Service_center_list_main">
//             <div className={`inner_mainbox ${isToggled ? "toggled-class" : ""}`}>
//                 <div className="inner_left">
//                     <Sidemenu onToggle={toggleClass} />
//                 </div>
//                 <div className="inner_right">
//                     <Header />
//                     <div className="new_booking_form_mainbox">
//                         <div className="form_listing form_listing_red form_listing_with_bg">
//                             <div className="form_heading_box">
//                                 <div className="form_heading">
//                                     <h2>Filter <span>By</span></h2>
//                                 </div>
//                                 <div className="form_line"></div>
//                                 <div className="form_carbox">
//                                     <img src="/images/service-center/car.svg" alt="" className="img-fluid" />
//                                 </div>
//                             </div>
//                             <form onSubmit={handleFilterSubmit} className="filter_form_box">
//                                 <div className="inner_form_group">
//                                     <label htmlFor="status">Status</label>
//                                     <select
//                                         className="form-control"
//                                         name="status"
//                                         id="status"
//                                         value={filters.status}
//                                         onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//                                     >
//                                         <option value="">Select Status</option>
//                                         <option value="Paid">Paid</option>
//                                         <option value="In Process">In Process</option>
//                                         <option value="Pending">Pending</option>
//                                     </select>
//                                 </div>
//                                 <div className="inner_form_group">
//                                     <label htmlFor="start_date">Start Date</label>
//                                     <input
//                                         className="form-control"
//                                         type="date"
//                                         name="start_date"
//                                         id="start_date"
//                                         value={filters.start_date}
//                                         onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
//                                     />
//                                 </div>
//                                 <div className="inner_form_group">
//                                     <label htmlFor="end_date">End Date</label>
//                                     <input
//                                         className="form-control"
//                                         type="date"
//                                         name="end_date"
//                                         id="end_date"
//                                         value={filters.end_date}
//                                         onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
//                                     />
//                                 </div>
//                                 <div className="inner_form_group inner_form_group_submit">
//                                     <div className="submite_button">
//                                         <input type="submit" className='submite_btn' value="Search" />
//                                     </div>
//                                     <div className="export_button">
//                                         <input type="button" className='close_btn' value="Clear" onClick={handleClearFilters} />
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                     <div className="data_listing_box">
//                         <div className="form_heading_box">
//                             <div className="form_heading">
//                                 <h2><span>Invoice</span> List</h2>
//                             </div>
//                             <div className="form_line"></div>
//                         </div>
//                         <div className="filter_data_table">
//                             {loading ? (
//                                 <p>Loading...</p>
//                             ) : error ? (
//                                 <p>Error: {error}</p>
//                             ) : (
//                                 <DataTable columns={columns} data={data} showStatusButton={true} />
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// };

// export default InvoiceList;

"use client";

import React, { useState, useEffect } from "react";
import Header from "../../../../components/Header";
import Sidemenu from "../../../../components/Sidemenu";
import { DataTable } from "../../../../components/ui/datatable";
import { CSVLink } from "react-csv";

const InvoiceList = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    start_date: "",
    end_date: "",
  });
  const [csvData, setCsvData] = useState([]);

  // Toggle Sidebar
  const toggleClass = () => {
    setIsToggled(!isToggled);
  };

  // Define table columns
  const columns = {
    Driver_Name: "Driver Name",
    Service_Center_Name: "Service Center Name",
    Trip_Id: "Trip Id",
    Trip_Status: "Trip Status",
    Date: "Date",
    Cost: "Cost",
    Status: "Status",
  };

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ServiceCenterInvoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...filters }), // Send filters as JSON
      });

      const result = await response.json();

      if (result.status === "success") {
        const formattedData = result.data.map(
          (item: {
            drivers: { driver_name: any };
            service_centers: { name: any };
            booking_id: any;
            is_paid: any;
            payment_date: any;
            total_amount: any;
          }) => ({
            Driver_Name: item.drivers?.driver_name || "N/A",
            Service_Center_Name: item.service_centers?.name || "N/A",
            Trip_Id: item.booking_id,
            Trip_Status: item.is_paid ? "Paid" : "Pending",
            Date: item.payment_date || "N/A",
            Cost: item.total_amount || "N/A",
            Status: item.is_paid ? "Paid" : "Pending",
            editLink: `#edit/${item.booking_id}`,
            deleteLink: `#delete/${item.booking_id}`,
          })
        );

        setData(formattedData);
        setCsvData(formattedData); // For CSV Export
      } else {
        throw new Error(result.message || "Failed to fetch data");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Filter Form Submit
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  // Handle Filter Input Changes
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Clear Filters
  const handleClearFilters = () => {
    setFilters({
      status: "",
      start_date: "",
      end_date: "",
    });
    fetchData();
  };

  // Fetch data on initial render
  useEffect(() => {
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
              <form onSubmit={handleFilterSubmit} className="filter_form_box">
                <div className="inner_form_group">
                  <label htmlFor="status">Status</label>
                  <select
                    className="form-control"
                    name="status"
                    id="status"
                    value={filters.status}
                    onChange={handleFilterChange}
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
                    value={filters.start_date}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="inner_form_group">
                  <label htmlFor="end_date">End Date</label>
                  <input
                    className="form-control"
                    type="date"
                    name="end_date"
                    id="end_date"
                    value={filters.end_date}
                    onChange={handleFilterChange}
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
                    <CSVLink
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
                    </CSVLink>
                  </div>

                  <div className="clear_button">
                    <input
                      type="button"
                      className="close_btn"
                      value="Clear"
                      onClick={handleClearFilters}
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
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p style={{ color: "red" }}>Error: {error}</p>
              ) : (
                <DataTable
                  columns={columns}
                  data={data}
                  showStatusButton={true}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default InvoiceList;
