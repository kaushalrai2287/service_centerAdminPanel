
// final code 
"use client";

import React, { useEffect, useState } from "react";

import Header from '../../../../components/Header';
import Sidemenu from "../../../../components/Sidemenu";
import { DataTable } from "../../../../components/ui/datatable";


const BookingList = () => {
    const [isToggled, setIsToggled] = useState(false); // State for toggle
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const toggleClass = () => {
        setIsToggled(!isToggled); // Toggle the state
    };

    const fetchBookings = async () => {
        try {
            const response = await fetch('/api/ServiceCenterBookingListing');
            const result = await response.json();

            if (result.status === 'success') {
                const formattedData = result.data.map((booking: { customer_name: any; customer_phone: any; pickup_date_time: any; pickup_address: any; dropoff_address: any; special_instructions: any; vehicles: { license_plate_no: any; condition: any; brands: { name: any; }; models: { name: any; }; }; }) => ({
                    customer_name: booking.customer_name,
                    customer_phone: booking.customer_phone,
                    pickup_date_time: booking.pickup_date_time,
                    pickup_address: booking.pickup_address,
                    dropoff_address: booking.dropoff_address,
                    special_instructions: booking.special_instructions,
                    vehicle_no: booking.vehicles?.license_plate_no || 'N/A',
                    condition: booking.vehicles?.condition || 'N/A',
                    brand: booking.vehicles?.brands?.name || 'N/A',
                    model: booking.vehicles?.models?.name || 'N/A',
                    editLink: '#', // Edit page link
                    deleteLink: '#', // Delete page link
                }));
                setBookings(formattedData);
            }
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const columns = {
        vehicle_no: "Vehicle Number",
        brand: "Vehicle Brand",
        model: "Model",
        condition: "Vehicle Condition",
        customer_name: "Customer Name",
        customer_phone: "Phone Number",
        pickup_date_time: "Pick up date and time",
        pickup_address: "Pickup Location",
        dropoff_address: "Drop off Location",
        special_instructions: "Special Instructions",
        driver_experience: "Driver Experience",
        Status: "Status", // Add Status to columns
    };

    const hiddenColumns = [
        'brand',
        'model',
        'condition',
        'pickup_address',
        'dropoff_address',
        'special_instructions',
        'driver_experience',
    ];


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
                                    <h2>Filter <span>By</span></h2>
                                </div>
                                <div className="form_line"></div>
                                <div className="form_carbox">
                                    <img src="/images/service-center/car.svg" alt="" className="img-fluid" />
                                </div>
                            </div>
                            <div className="filter_form_box">
                                <div className="inner_form_group">
                                    <label htmlFor="vnumber">Vehicle Number</label>
                                    <input className="form-control" name="vnumber" type="text" id="vnumber" />
                                </div>
                                <div className="inner_form_group">
                                    <label htmlFor="cname">Customer Name</label>
                                    <input className="form-control" name="cname" type="text" id="cname" />
                                </div>
                                <div className="inner_form_group">
                                    <label htmlFor="dateTime">Pick up date and time</label>
                                    <input className="form-control" name="dateTime" type="datetime-local" id="dateTime" />
                                </div>
                                <div className="inner_form_group">
                                    <label htmlFor="pnumber">Phone Number</label>
                                    <input className="form-control" name="pnumber" type="text" id="pnumber" />
                                </div>
                                <div className="inner_form_group">
                                    <label htmlFor="pickLocation">Pickup Location</label>
                                    <input className="form-control" name="pickLocation" type="text" id="pickLocation" />
                                </div>
                                <div className="inner_form_group inner_form_group_submit">
                                    <div className="submite_button">
                                        <input type="submit" className='submite_btn' value="Search" />
                                    </div>
                                    <div className="export_button">
                                        <input type="submit" className='close_btn' value="Export All" />
                                    </div>
                                    <div className="clear_button">
                                        <input type="submit" className='close_btn' value="Clear" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="data_listing_box">
                        <div className="form_heading_box">
                            <div className="form_heading">
                                <h2><span>Booking</span> List</h2>
                            </div>
                            <div className="form_line"></div>
                            <div className="form_carbox">
                                <img src="/images/service-center/car.svg" alt="" className="img-fluid" />
                            </div>
                        </div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="filter_data_table">
                                <DataTable
                                    columns={columns}
                                    data={bookings}
                                    hiddenColumns={hiddenColumns}
                                    showStatusButton={true}
                                />
                            </div>
                        )}
                        {/* <div className="filter_data_table">
                            <DataTable columns={columns} data={bookings} hiddenColumns={hiddenColumns}
                                showStatusButton={true} />
                        </div> */}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default BookingList