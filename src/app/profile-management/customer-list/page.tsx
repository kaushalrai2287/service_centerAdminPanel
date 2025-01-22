"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../../../../components/Header";
import Sidemenu from "../../../../components/Sidemenu";
import { DataTable } from "../../../../components/ui/datatable";
import Link from "next/link";
import HeadingBredcrum from "../../../../components/HeadingBredcrum";
import { createClient } from "../../../../utils/supabase/client";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { CSVLink } from "react-csv";

// import supabase from "../../../../lib/supabaseClient"; // Import supabase client
const supabase = createClient();

const ProfileCustomerList = () => {
  const [isToggled, setIsToggled] = useState(false); // State for toggle
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // State for loading

  const [filters, setFilters] = useState({
    name: "",
    mobile_number: "",
    vehicle_number: "",
    city: "",
    pin_code: "",
  });

  const toggleClass = () => {
    setIsToggled(!isToggled); // Toggle the state
  };

  const columns = {
    name: "Name",
    mobile_number: "Mobile Number",
    vehicle_number: "Vehicle Number",
    address: "Address",
    city: "City",
    pin_code: "Pin Code",
    brand: "Brand",
    model: "Model",
  };

  const hiddenColumns = ["city", "pin_code", "brand", "model"];

  const fetchServiceCenterId = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      console.log("Logged-in User ID:", user.id);
      return user.id;
    } else {
      console.error("No user logged in");
      return null;
    }
  };
  const fetchServiceCenterDetails = async () => {
    const authId = await fetchServiceCenterId();
    if (!authId) return;

    let { data, error } = await supabase
      .from("service_centers")
      .select("service_center_id")
      .eq("auth_id", authId)
      .single();

    if (error) {
      console.error("Error fetching service center:", error.message);
      return;
    }

    console.log("Service Center ID:", data?.service_center_id);
    return data?.service_center_id;
  };
  useEffect(() => {
    const fetchCustomers = async () => {
      const serviceCenterId = await fetchServiceCenterDetails();
      if (!serviceCenterId) return;

      let query = supabase
        .from("customers")
        .select(
          `id, 
          name, 
          mobile_number, 
          vehicle_number, 
          address, 
          city, 
          pin_code, 
          brand_id, 
          model_id, 
          service_center_id, 
          brand:brands(name),  
          model:models(name)`
        )
        .eq("service_center_id", serviceCenterId); // Filter by logged-in service center

      // Apply filters if values are present
      if (filters.name) query = query.ilike("name", `%${filters.name}%`);
      if (filters.mobile_number)
        query = query.ilike("mobile_number", `%${filters.mobile_number}%`);
      if (filters.vehicle_number)
        query = query.ilike("vehicle_number", `%${filters.vehicle_number}%`);
      if (filters.city) query = query.ilike("city", `%${filters.city}%`);
      if (filters.pin_code)
        query = query.ilike("pin_code", `%${filters.pin_code}%`);

      let { data, error } = await query;

      if (error) throw error;

      if (data) {
        const updatedCustomers = data.map((customer: any) => ({
          ...customer,
          brand: customer.brand?.name || "Unknown Brand",
          model: customer.model?.name || "Unknown Model",
        }));

        setCustomers(updatedCustomers);
      }
      setLoading(false);
    };

    fetchCustomers();
  }, [filters]); 

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       const serviceCenterId = await fetchServiceCenterDetails();
//       if (!serviceCenterId) return;

//       let { data, error } = await supabase
//         .from("customers")
//         .select(
//           `
//                     id, 
//                     name, 
//                     mobile_number, 
//                     vehicle_number, 
//                     address, 
//                     city, 
//                     pin_code, 
//                     brand_id, 
//                     model_id, 
//                     service_center_id, 
//                     brand:brands(name),  
//                     model:models(name)   
//                 `
//         )
//         .eq("service_center_id", serviceCenterId); // Filter by logged-in service center

//       if (error) throw error;

//       if (data) {
//         const updatedCustomers = data.map((customer: any) => ({
//           ...customer,
//           brand: customer.brand?.name || "Unknown Brand",
//           model: customer.model?.name || "Unknown Model",
//         }));

//         setCustomers(updatedCustomers);
//       }
//       setLoading(false);
//     };

//     fetchCustomers();
//   }, []);

  // Fetch customers data from Supabase
  // useEffect(() => {
  //     const fetchCustomers = async () => {
  //         try {
  //             let { data, error } = await supabase
  //                 .from('customers') // Fetch from the customers table
  //                 .select(`
  //                     id,
  //                     name,
  //                     mobile_number,
  //                     vehicle_number,
  //                     address,
  //                     city,
  //                     pin_code,
  //                     brand_id,
  //                     model_id,
  //                     brand:brands(name),
  //                     model:models(name)
  //                 `);

  //             if (error) throw error;

  //             if (data) {

  //                 const updatedCustomers = data.map((customer:any) => ({
  //                     ...customer,
  //                     brand: customer.brand?.name || "Unknown Brand",
  //                     model: customer.model?.name || "Unknown Model"
  //                 }));

  //                 setCustomers(updatedCustomers);
  //             }
  //             setLoading(false);
  //         } catch (err: any) {
  //             console.error("Error fetching customers:", err.message);
  //             setLoading(false); // Set loading to false on error
  //         }
  //     };

  //     fetchCustomers();
  // }, []);

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    let parsedData = [];
    const reader = new FileReader();

    reader.onload = async (e: any) => {
      const fileContent = e.target.result;

      if (file.type === "text/csv") {
        // **Parse CSV File**
        Papa.parse(fileContent, {
          header: true,
          skipEmptyLines: true,
          complete: async (result) => {
            parsedData = result.data;
            await uploadToSupabase(parsedData);
          },
        });
      } else {
        // **Parse XLSX File**
        const workbook = XLSX.read(fileContent, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        parsedData = XLSX.utils.sheet_to_json(sheet);
        await uploadToSupabase(parsedData);
      }
    };

    if (file.type === "text/csv") {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
  };

  const uploadToSupabase = async (customers: any[]) => {
    const serviceCenterId = await fetchServiceCenterDetails();
    if (!serviceCenterId) {
      alert("Service Center ID not found.");
      return;
    }

    // Map data to match database columns
    const formattedCustomers = customers.map((customer) => ({
      name: customer.name,
      mobile_number: customer.mobile_number,
      vehicle_number: customer.vehicle_number,
      address: customer.address,
      city: customer.city,
      pin_code: customer.pin_code,
      brand_id: customer.brand_id,
      model_id: customer.model_id,
      service_center_id: serviceCenterId, // Attach service center
    }));

    const { error } = await supabase
      .from("customers")
      .insert(formattedCustomers);

    if (error) {
      console.error("Error inserting data:", error.message);
      alert("Bulk upload failed.");
    } else {
      alert("Bulk upload successful!");
      window.location.reload(); // Reload data
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    // Reset all filters to their initial values (empty strings)
    setFilters({
      name: "",
      mobile_number: "",
      vehicle_number: "",
      city: "",
      pin_code: "",
    });
  };

  const csvData = customers.map((customer) => ({
    name: customer.name,
    mobile_number: customer.mobile_number,
    vehicle_number: customer.vehicle_number,
    address: customer.address,
    city: customer.city,
    pin_code: customer.pin_code,
    brand: customer.brand,
    model: customer.model,
  }));
  

  return (
    <main className="profile_service_add">
      <div className={`inner_mainbox ${isToggled ? "toggled-class" : ""}`}>
        <div className="inner_left">
          <Sidemenu onToggle={toggleClass} />
        </div>
        <div className="inner_right">
          <Header />
          <div className="new_booking_form_mainbox">
            <div className="form_listing form_listing_red form_listing_with_bg">
              <div className="profile_add_bulk_box">
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
                <div className="form_heading_add_button_box">
                  <div className="filter_btn">
                    <Link href="/profile-management/customer-add">
                      <button className="submite_btn">Add</button>
                    </Link>
                  </div>
                  <div className="filter_btn">
                    <input
                      type="file"
                      accept=".csv, .xlsx"
                      onChange={handleFileUpload}
                      className="submite_btn bulk_upload_btn"
                    />
                    {/* <Link href="">
                                            <button className="submite_btn bulk_upload_btn">Bulk Upload</button>
                                        </Link> */}
                  </div>
                </div>
              </div>
              <div className="filter_form_box">
                <div className="inner_form_group">
                  <label htmlFor="name">Name</label>
                  <input
                    className="form-control"
                    name="name"
                    type="text"
                    id="name"
                    value={filters.name}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="inner_form_group">
                  <label htmlFor="mobile_number">Mobile Number</label>
                  <input
                    className="form-control"
                    name="mobile_number"
                    type="text"
                    id="mobile_number"
                    value={filters.mobile_number}
                      onChange={handleFilterChange}
                  />
                </div>
                <div className="inner_form_group">
                  <label htmlFor="vehicle_number">Vehicle Number</label>
                  <input
                    className="form-control"
                    type="text"
                    name="vehicle_number"
                    id="vehicle_number"
                    value={filters.vehicle_number}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="inner_form_group">
                  <label htmlFor="city">City</label>
                  <input
                    className="form-control"
                    type="text"
                    name="city"
                    id="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="inner_form_group">
                  <label htmlFor="pin_code">Pin Code</label>
                  <input
                    className="form-control"
                    type="text"
                    name="pin_code"
                    id="pin_code"
                    value={filters.pin_code}
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
                  {/* <div className="export_button"> */}
                  <CSVLink
                    data={csvData}  // Pass the data to CSVLink
                    filename={"customers.csv"}  // File name for the export
                    className="close_btn"
                    target="_blank"
                  >
                    Export All
                  </CSVLink>
                {/* </div> */}
                  <div className="clear_button">
                    <input type="submit" className="close_btn" value="Clear" onClick={handleClearFilters} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="data_listing_box">
            <div className="form_heading_box">
              <div className="form_heading">
                <h2>
                  <span>Booking</span> List
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
            <div className="filter_data_table">
              <DataTable
                columns={columns}
                data={customers}
                hiddenColumns={hiddenColumns}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileCustomerList;
