"use client";

import React, { useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Header from '../../../../components/Header';
import Sidemenu from "../../../../components/Sidemenu";
import HeadingBredcrum from "../../../../components/HeadingBredcrum";

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

const page = () => {

    const [isToggled, setIsToggled] = useState(false); // State for toggle

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const toggleClass = () => {
        setIsToggled(!isToggled); // Toggle the state
    };

    const onSubmit = (data: FormValues) => {
        console.log("Form Data:", data);
    };
    return (
        <main className="add_service_center_main">
            <Header />
            <div className={`inner_mainbox ${isToggled ? "toggled-class" : ""}`}>
                <div className="inner_left">
                    <Sidemenu onToggle={toggleClass} />
                </div>
                <div className="inner_right">
                <HeadingBredcrum
                        heading="Add Service Center"
                        breadcrumbs={[
                            { label: 'Home', link: '/', active: false },
                            { label: ' Add Service Center', active: true },
                        ]}
                    />
                    <div className="add_service_formbox">
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <div className="service_form_heading">
                                Basic Information
                            </div>
                            <div className="inner_form_group">
                                <label htmlFor="name">Service Center Name <span>*</span></label>
                                <input className="form-control" {...register("name")} type="text" id="name" />
                                {errors.name && (
                                    <p className="erro_message">{errors.name.message}</p>
                                )}
                            </div>
                            <div className="inner_form_group">
                                <label htmlFor="rnumber">Registration Number</label>
                                <input className="form-control" type="text" {...register("rnumber")} id="rnumber" />
                                {errors.rnumber && (
                                    <p className="erro_message">{errors.rnumber.message}</p>
                                )}
                            </div>
                            <div className="inner_form_group">
                                <label htmlFor="servicesoffered">Services Offered</label>
                                <select className="form-control" id="servicesoffered" name="servicesoffered">
                                    <option value="">Services Offered</option>
                                    <option value="Andhra Pradesh">Dummy one</option>
                                    <option value="Arunachal Pradesh">Dummy two</option>
                                </select>
                                <div className="down_arrow_btn">
                                    <img src="/images/angle-small-down.svg" alt="" className="img-fluid" />
                                </div>
                            </div>
                            <div className="inner_form_group">
                                <label htmlFor="servicearea">Service Area <span>*</span></label>
                                <input className="form-control" type="text" {...register("servicearea")} id="servicearea" />
                                {errors.servicearea && (
                                    <p className="erro_message">{errors.servicearea.message}</p>
                                )}
                            </div>
                            <div className="inner_form_group">
                                <label htmlFor="upload">Upload Document <span>*</span></label>
                                <input className="form-control" type="file" {...register("upload")} id="upload" />
                                {errors.upload && (
                                    <p className="erro_message">{(errors.upload as FieldError).message}</p>
                                )}
                            </div>
                            <div className="inner_form_group">
                                <label htmlFor="cperson">Contact Person <span>*</span></label>
                                <input className="form-control" type="text" {...register("cperson")} id="cperson" />
                                {errors.cperson && (
                                    <p className="erro_message">{errors.cperson.message}</p>
                                )}
                            </div>
                            <div className="inner_form_group">
                                <label htmlFor="cnumber">Contact Number <span>*</span></label>
                                <input className="form-control" type="text" {...register("cnumber")} id="cnumber" />
                                {errors.cnumber && (
                                    <p className="erro_message">{errors.cnumber.message}</p>
                                )}
                            </div>
                            <div className="inner_form_group">
                                <label htmlFor="email">Email <span>*</span></label>
                                <input className="form-control" type="email" {...register("email")} id="email" />
                                {errors.email && (
                                    <p className="erro_message">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="inner_form_group">
                                <label htmlFor="alternumber">Alternate Contact Number</label>
                                <input className="form-control" type="text" name="alternumber" id="alternumber" />
                            </div>
                            <div className="service_form_heading service_form_heading_second">
                                Address
                            </div>
                            <div className="inner_form_group">
                                <label htmlFor="adderess">Address <span>*</span></label>
                                <textarea className="form-control" {...register("adderess")} id="adderess" rows={1}></textarea>
                                {errors.adderess && (
                                    <p className="erro_message">{errors.adderess.message}</p>
                                )}
                            </div>
                            <div className="inner_form_group">
                                <label htmlFor="city">City <span>*</span></label>
                                <input className="form-control" type="text" {...register("city")} id="city" />
                                {errors.city && (
                                    <p className="erro_message">{errors.city.message}</p>
                                )}
                            </div>
                            <div className="inner_form_group">
                                <label htmlFor="state">State <span>*</span></label>
                                <select className="form-control" id="state" name="state">
                                    <option value="">Select your state</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                    <option value="Goa">Goa</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Haryana">Haryana</option>
                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                    <option value="Jharkhand">Jharkhand</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Manipur">Manipur</option>
                                    <option value="Meghalaya">Meghalaya</option>
                                    <option value="Mizoram">Mizoram</option>
                                    <option value="Nagaland">Nagaland</option>
                                    <option value="Odisha">Odisha</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Sikkim">Sikkim</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Telangana">Telangana</option>
                                    <option value="Tripura">Tripura</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="Uttarakhand">Uttarakhand</option>
                                    <option value="West Bengal">West Bengal</option>
                                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                    <option value="Chandigarh">Chandigarh</option>
                                    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                    <option value="Ladakh">Ladakh</option>
                                    <option value="Lakshadweep">Lakshadweep</option>
                                    <option value="Puducherry">Puducherry</option>
                                </select>
                                <div className="down_arrow_btn">
                                    <img src="/images/angle-small-down.svg" alt="" className="img-fluid" />
                                </div>
                            </div>
                            <div className="inner_form_group">
                                <label htmlFor="pincode">Pincode <span>*</span></label>
                                <input className="form-control" type="text" {...register("pincode")} id="pincode" />
                                {errors.pincode && (
                                    <p className="erro_message">{errors.pincode.message}</p>
                                )}
                            </div>
                            <div className="inner_form_group inner_form_group_submit">
                                <input type="submit" className='submite_btn' value="Submit" />
                                <input type="submit" className='close_btn' value="Close" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}


export default page