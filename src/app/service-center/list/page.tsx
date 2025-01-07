// final code 
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from '../../../../components/Header';
import Sidemenu from "../../../../components/Sidemenu";
import { DataTable } from "../../../../components/ui/datatable";
import Link from "next/link";
import HeadingBredcrum from "../../../../components/HeadingBredcrum";

const page = () => {
    const [isToggled, setIsToggled] = useState(false); // State for toggle


    const toggleClass = () => {
        setIsToggled(!isToggled); // Toggle the state
    };

    const columns = {
        Service_Center_Name: "Service Center Name",
        Registration_Number: "Registration Number",
        Services_Offered: "Services Offered",
        Service_Area: "Area",
        Upload_Document: "Document",
        Contact_Person: "Contact Person",
        Contact_Number: "Contact No.",
        Email: "Email",
        Alternate_Contact_Number: "Alt Contact",
        Address: "Address",
        City: "City",
        State: "State",
        Pincode: "Pincode",
        Status: "Status", // Add Status to columns
    };

    const data = [
        {
            Service_Center_Name: 'abc services',
            Registration_Number: '878877',
            Services_Offered: 'servicing',
            Service_Area: 'wakad',
            Upload_Document: 'image',
            Contact_Person: 'Rahul',
            Contact_Number: '9898767654',
            Email: 'rahul@gmail.com',
            Alternate_Contact_Number: '8888888888',
            Address: 'Aakruti Aveneue',
            City: 'Pune',
            State: 'Maharastra',
            Pincode: '431203',
            Status: 'Active',
            editLink: '#', // Edit page link
            deleteLink: '#', // Delete page link
        },
        {
            Service_Center_Name: 'abc services',
            Registration_Number: '878877',
            Services_Offered: 'servicing',
            Service_Area: 'wakad',
            Upload_Document: 'image',
            Contact_Person: 'Rahul',
            Contact_Number: '9898767654',
            Email: 'rahul@gmail.com',
            Alternate_Contact_Number: '8888888888',
            Address: 'Aakruti Aveneue',
            City: 'Pune',
            State: 'Maharastra',
            Pincode: '431203',
            Status: 'Active',
            editLink: '#', // Edit page link
            deleteLink: '#', // Delete page link
        },
        {
            Service_Center_Name: 'abc services',
            Registration_Number: '878877',
            Services_Offered: 'servicing',
            Service_Area: 'wakad',
            Upload_Document: 'image',
            Contact_Person: 'Rahul',
            Contact_Number: '9898767654',
            Email: 'rahul@gmail.com',
            Alternate_Contact_Number: '8888888888',
            Address: 'Aakruti Aveneue',
            City: 'Pune',
            State: 'Maharastra',
            Pincode: '431203',
            Status: 'Active',
            editLink: '#', // Edit page link
            deleteLink: '#', // Delete page link
        },
        {
            Service_Center_Name: 'abc services',
            Registration_Number: '878877',
            Services_Offered: 'servicing',
            Service_Area: 'wakad',
            Upload_Document: 'image',
            Contact_Person: 'Rahul',
            Contact_Number: '9898767654',
            Email: 'rahul@gmail.com',
            Alternate_Contact_Number: '8888888888',
            Address: 'Aakruti Aveneue',
            City: 'Pune',
            State: 'Maharastra',
            Pincode: '431203',
            Status: 'Active',
            editLink: '#', // Edit page link
            deleteLink: '#', // Delete page link
        },
        {
            Service_Center_Name: 'abc services',
            Registration_Number: '878877',
            Services_Offered: 'servicing',
            Service_Area: 'wakad',
            Upload_Document: 'image',
            Contact_Person: 'Rahul',
            Contact_Number: '9898767654',
            Email: 'rahul@gmail.com',
            Alternate_Contact_Number: '8888888888',
            Address: 'Aakruti Aveneue',
            City: 'Pune',
            State: 'Maharastra',
            Pincode: '431203',
            Status: 'Active',
            editLink: '#', // Edit page link
            deleteLink: '#', // Delete page link
        },
        {
            Service_Center_Name: 'abc services',
            Registration_Number: '878877',
            Services_Offered: 'servicing',
            Service_Area: 'wakad',
            Upload_Document: 'image',
            Contact_Person: 'Rahul',
            Contact_Number: '9898767654',
            Email: 'rahul@gmail.com',
            Alternate_Contact_Number: '8888888888',
            Address: 'Aakruti Aveneue',
            City: 'Pune',
            State: 'Maharastra',
            Pincode: '431203',
            Status: 'Active',
            editLink: '#', // Edit page link
            deleteLink: '#', // Delete page link
        },
    ];

    const hiddenColumns = [
        'Registration_Number',
        'Services_Offered',
        'Upload_Document',
        'Contact_Person',
        'Alternate_Contact_Number',
        'Address',
        'State',
        'Pincode',
    ];


    return (
        <main className="Service_center_list_main">
            <Header />
            <div className={`inner_mainbox ${isToggled ? "toggled-class" : ""}`}>
                <div className="inner_left">
                    <Sidemenu onToggle={toggleClass} />
                </div>
                <div className="inner_right">
                    <HeadingBredcrum
                        heading="Service Center List"
                        breadcrumbs={[
                            { label: 'Home', link: '/', active: false },
                            { label: 'Service Center List', active: true },
                        ]}
                    />
                    <div className="filter_box">
                        <div className="filter_heading_btnbox">
                            <div className="service_form_heading">
                                <span>
                                    <img src="/images/settings-sliders.svg" alt="" className="img-fluid" />
                                </span>
                                Filter By
                            </div>
                            <div className="filter_btn">
                                <Link href="/service-center/add">
                                    <button className="submite_btn">Add</button>
                                </Link>
                            </div>
                        </div>
                        <div className="filter_formbox">
                            <form action="">
                                <div className="inner_form_group">
                                    <label htmlFor="search_service_name">Service Center Name</label>
                                    <input className="form-control" type="text" name="search_service_name" id="search_service_name" />
                                </div>
                                <div className="inner_form_group">
                                    <label htmlFor="search_service_area">Service Area</label>
                                    <input className="form-control" type="text" name="search_service_area" id="search_service_area" />
                                </div>
                                <div className="inner_form_group">
                                    <label htmlFor="search_service_city">City</label>
                                    <input className="form-control" type="text" name="search_service_city" id="search_service_city" />
                                </div>
                                <div className="inner_form_group">
                                    <label htmlFor="search_service_number">Contact Number</label>
                                    <input className="form-control" type="text" name="search_service_number" id="search_service_number" />
                                </div>
                                <div className="inner_form_group inner_form_group_submit">
                                    <input type="submit" className='submite_btn' value="Search" />
                                    <input type="submit" className='close_btn' value="Export All" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="data_listing_box mt-3">
                        <div className="filter_heading_btnbox">
                            <div className="service_form_heading">
                                <span>
                                    <img src="/images/bars-sort.svg" alt="" className="img-fluid" />
                                </span>
                                Service Center List
                            </div>
                        </div>
                        <div className="filter_data_table">
                            <DataTable columns={columns} data={data} hiddenColumns={hiddenColumns}
                                showStatusButton={true} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default page