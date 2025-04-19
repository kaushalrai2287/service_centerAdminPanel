"use client";

import React, { useEffect, useState } from "react";

import Header from "../../../../components/Header";
import Sidemenu from "../../../../components/Sidemenu";
import { DataTable } from "../../../../components/ui/datatable";

import { createClient } from "../../../../utils/supabase/client";
import { CSVLink } from "react-csv";
import { redirect } from "next/navigation";
const supabase = await createClient();

type Booking = {
  booking_id: string;
  customer_name: string;
  customer_email: string;
  secondary_number: string;
  customer_phone: string;
  pickup_date_time: string;
  pickup_address: string;
  dropoff_address: string;
  special_instructions: string;
  vehicle_no: string;
  condition: string;
  brand: string;
  model: string;
  status: string;
  editLink: string;
  deleteLink: string;
};

const BookingList = () => {

  const [authId, setAuthId] = useState<string | null>(null);
  const [serviceCenterId, setServiceCenterId] = useState<string | null>(null);
   useEffect(() => {
      const fetchUser = async () => {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
    
        if (error || !user) {
          redirect("/login");
        } else {
          // console.log("Logged-in auth_id:", user.id); 
          setAuthId(user.id);
        }
      };
    
      fetchUser();
    }, []);
      useEffect(() => {
        const fetchServiceCenter = async () => {
          if (!authId) return;
      
          const { data, error } = await supabase
            .from("service_centers")
            .select("service_center_id")
            .eq("auth_id", authId)
            .single();
      
          if (error) {
            console.error("Error fetching service center:", error.message);
          } else {
            // console.log("Service Center ID:", data?.service_center_id); 
            setServiceCenterId(data?.service_center_id);
          }
        };
      
        fetchServiceCenter();
      }, [authId]);
  const [isToggled, setIsToggled] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    vehicle_no: "",
    driver_username: "",
    status: "",
    start_date: "",
    end_date: "",
  });
  const [page, setPage] = useState(1);
 
  const [limit, setLimit] = useState(10);
  const toggleClass = () => {
    setIsToggled(!isToggled);
  };

  const getStatusColor = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case "pending":
        return "orange";
      case "completed":
        return "green";
      case "active":
        return "green";
      case "rejected":
        return "red";
      case "accepted":
        return "blue";
      case "canceled":
        return "red";
      default:
        return "gray";
    }
  };

  type StatusType = "pending" | "accepted" | "completed" | "canceled" | "active" | "rejected";

  const handleStatusUpdate = async (
    bookingId: string,
    currentStatus: string
  ) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to change the status for this booking?"
    );

    if (!isConfirmed) {
      return;
    }

    const statusCycle: Record<StatusType, StatusType> = {
      pending: "pending",
      accepted: "accepted",
      completed: "completed",
      canceled: "canceled",
      active: "active",
      rejected: "rejected",
    };

    const lowerCaseStatus = currentStatus.toLowerCase() as StatusType;
    const newStatus = statusCycle[lowerCaseStatus] || "pending";

    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus })
      .eq("booking_id", bookingId);

    if (error) {
      console.error("Error updating status:", error.message);
    } else {
      await fetchBookings();
    }
  };

  const handleDelete = async (bookingId: string) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("booking_id", bookingId);

      if (error) {
        console.error("Error deleting booking:", error.message);
      } else {
        await fetchBookings();
      }
    }
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const fetchBookings = async (filters = {}) => {
    try {
      if (!serviceCenterId) return;
      const response = await fetch("/api/ServiceCenterBookingListing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...filters,  service_center_id: serviceCenterId, page, limit }),
      });

      const result = await response.json();

      if (result.status === "success" && result.data.length > 0) {
        const formattedData = result.data.map(
          (booking: {
            customer_name: any;
            customer_email: any;
            status: any;
            booking_id: any;
            customer_phone: any;
            Alternate_contact_no: any;
            pickup_date_time: any;
            pickup_address: any;
            dropoff_address: any;
            special_instructions: any;
            vehicles: {
              license_plate_no: any;
              condition: any;
              brands: { name: any };
              models: { name: any };
            };
          }) => ({
            customer_name: booking.customer_name,
            customer_email: booking.customer_email,
            secondary_number: booking.Alternate_contact_no,
            customer_phone: booking.customer_phone,
            pickup_date_time: booking.pickup_date_time,
            pickup_address: booking.pickup_address,
            dropoff_address: booking.dropoff_address,
            special_instructions: booking.special_instructions,
            vehicle_no: booking.vehicles?.license_plate_no || "N/A",
            condition: booking.vehicles?.condition || "N/A",
            brand: booking.vehicles?.brands?.name || "N/A",
            model: booking.vehicles?.models?.name || "N/A",
            status: (
              <select
                value={booking.status}
                onChange={async (e) => {
                  const newStatus = e.target.value;
                  await handleStatusUpdate(booking.booking_id, newStatus);
                }}
                style={{
                  cursor: "pointer",
                  color: getStatusColor(booking.status),
                  fontWeight: "bold",
                }}
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="completed">Completed</option>
                <option value="canceled">Canceled</option>
                <option value="active">Active</option>
                <option value="rejected">Rejected</option>
              </select>
            ),
            editLink: "#", // Edit page link
            // onDelete: () => handleDelete(booking.booking_id),
          })
        );

        setBookings(formattedData);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (serviceCenterId) {
      fetchBookings();
    }
  }, [page, limit, filters, serviceCenterId]);
  
  const columns = {
    vehicle_no: "Vehicle Number",
    brand: "Vehicle Brand",
    model: "Model",
    condition: "Vehicle Condition",
    customer_name: "Customer Name",
    customer_email: "Email",
    customer_phone: "Phone Number",
    secondary_number: "Secondary Phone Number",
    pickup_date_time: "Pick up Date and Time",
    pickup_address: "Pickup Location",
    dropoff_address: "Drop Off Location",
    drop_off_time: "Drop Off Time",
    special_instructions: "Special Instructions",
    driver_username: "Driver Username",
    driver_pic: "Driver Pic",
    driver_experience: "Driver Experience",
    Pick_up_pics: "Pick up Pics",
    drop_off_pics: "Drop off Pics",
    status: "Status",
  };

  const hiddenColumns = [
    "brand",
    "model",
    "condition",
    "customer_email",
    "secondary_number",
    "pickup_date_time",
    "pickup_address",
    "drop_off_time",
    "dropoff_address",
    "special_instructions",
    "driver_experience",
    "driver_pic",
    "Pick_up_pics",
    "drop_off_pics",
  ];
  const csvHeaders = [
    { label: "Vehicle Number", key: "vehicle_no" },
    { label: "Vehicle Brand", key: "brand" },
    { label: "Model", key: "model" },
    { label: "Vehicle Condition", key: "condition" },
    { label: "Customer Name", key: "customer_name" },
    { label: "Email", key: "customer_email" },
    { label: "Phone Number", key: "customer_phone" },
    { label: "Secondary Phone Number", key: "secondary_number" },
    { label: "Pick up Date and Time", key: "pickup_date_time" },
    { label: "Pickup Location", key: "pickup_address" },
    { label: "Drop Off Location", key: "dropoff_address" },
    { label: "Special Instructions", key: "special_instructions" },
    { label: "Status", key: "status" },
  ];

  return (
    <main className="driver_booking_main">
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
              <div className="filter_form_box">
                <div className="inner_form_group">
                  <label htmlFor="vehicle_no">Vehicle Number</label>
                  <input
                    className="form-control"
                    name="vehicle_no"
                    type="text"
                    id="vehicle_no"
                    value={filters.vehicle_no}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="inner_form_group">
                  <label htmlFor="driver_username">Driver Username</label>
                  <input
                    className="form-control"
                    name="driver_username"
                    type="text"
                    id="driver_username"
                    value={filters.driver_username}
                    onChange={handleFilterChange}
                  />
                </div>
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
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                    <option value="active">Active</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <div className="down_arrow_btn">
                    <img
                      src="/images/angle-small-down.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
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
                <div className="inner_form_group">
                  <label htmlFor="limit">Items per page</label>
                  <select
                    className="form-control"
                    name="limit"
                    id="limit"
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                <div className="inner_form_group inner_form_group_submit">
                  <div className="submite_button">
                    <input
                      type="submit"
                      className="submite_btn"
                      value="Search"
                      onClick={() => fetchBookings(filters)}
                    />
                  </div>
                  <div className="export_button">
                    <CSVLink
                      data={bookings}
                      headers={csvHeaders}
                      filename={"bookings.csv"}
                      className="close_btn"
                    >
                      Export All
                    </CSVLink>
                  </div>
                  <div className="clear_button">
                    <input
                      type="submit"
                      className="close_btn"
                      value="Clear"
                      onClick={() => {
                        setFilters({
                          vehicle_no: "",
                          driver_username: "",
                          status: "",
                          start_date: "",
                          end_date: "",
                        });
                        setPage(1);
                        fetchBookings();
                      }}
                    />
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

            {/* : bookings.length === 0 ? (
              <p>No data found</p>
            ) */}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="filter_data_table">
                <DataTable
                  columns={columns}
                  data={bookings}
                  hiddenColumns={hiddenColumns}
                  driverCallButton={true}
                />
                {/* <div className="pagination">
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                  <span>Page {page}</span>
                  <button onClick={() => setPage((prev) => prev + 1)}>
                    Next
                  </button>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingList;

