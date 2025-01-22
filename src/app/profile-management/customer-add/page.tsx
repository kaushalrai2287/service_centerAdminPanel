"use client";

import React, { useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Header from "../../../../components/Header";
import Sidemenu from "../../../../components/Sidemenu";
import HeadingBredcrum from "../../../../components/HeadingBredcrum";
import { createClient } from "../../../../utils/supabase/client";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Service Center Name is required")
    .regex(/^[a-zA-Z\s]+$/, "Name must only contain letters"),
  mobile_number: z.string().optional(),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  vehicle_number: z.string().min(1, "Vehicle Number is required"),

  address: z.string().min(1, "Address is required"),
  city: z
    .string()
    .min(1, "City is required")
    .regex(/^[a-zA-Z\s]+$/, "City must only contain letters"),
    pin_code: z
    .string()
    .min(6, "Pincode must be 6 digits")
    .max(6, "Pincode must be 6 digits")
    .regex(/^\d+$/, "Pincode must contain only digits"),
});

type FormValues = z.infer<typeof formSchema>;
const supabase = await createClient();

const ProfileCustomerAdd = () => {
  const [isToggled, setIsToggled] = useState(false); // State for toggle
  const [brands, setBrands] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const fetchBrands = async () => {
      const { data, error } = await supabase.from("brands").select("*");
      if (error) console.error("Error fetching brands:", error);
      else setBrands(data);
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      const fetchModels = async () => {
        const { data, error } = await supabase
          .from("models")
          .select("*")
          .eq("brand_id", selectedBrand);
        if (error) console.error("Error fetching models:", error);
        else setModels(data);
      };
      fetchModels();
    }
  }, [selectedBrand]);

  const toggleClass = () => {
    setIsToggled(!isToggled); // Toggle the state
  };

  const onSubmit = async (data: FormValues) => {
    // Log the form data for debugging
    // console.log("Form Data:", data);

    // Extract necessary form fields
    const { name, vehicle_number, brand, model, address, city, mobile_number, pin_code } = data;

    try {
      // Insert into the customers table
      const { error } = await supabase
        .from("customers")
        .insert([
          {
            name,
            vehicle_number,
            brand_id: brand,  // assuming brand is the brand ID
            model_id: model,  // assuming model is the model ID
            address,
            city,
            mobile_number,
            pin_code,
          },
        ]);

      if (error) {
        throw error; // Throw the error to be caught in the catch block
      }

      // Success feedback
    //   console.log("Customer added successfully!");
    alert("Booking successfully added!");
      // Optionally, reset form values here if needed

    } catch (error:any) {
      console.error("Error inserting customer:", error.message);
    }
  };

  return (
    <main className="add_service_center_main">
      <div className={`inner_mainbox ${isToggled ? "toggled-class" : ""}`}>
        <div className="inner_left">
          <Sidemenu onToggle={toggleClass} />
        </div>
        <div className="inner_right">
          <Header />
          <div className="new_booking_form_mainbox">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form_listing form_listing_red">
                <div className="form_heading_box">
                  <div className="form_heading">
                    <h2>
                      Add <span>Customer</span>
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
                <div className="form_box">
                  <div className="inner_form_group">
                    <label htmlFor="name">Name</label>
                    <input
                      className="form-control"
                    //   name="name"
                      type="text"
                      id="name"
                      {...register("name")}
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                  </div>
                  <div className="inner_form_group">
                    <label htmlFor="mobile_number">Mobile Number</label>
                    <input
                      className="form-control"
                    //   name="mobile_number"
                      type="text"
                      id="mobile_number"
                      {...register("mobile_number")}
                    />
                    {errors.mobile_number && <span>{errors.mobile_number.message}</span>}
                  </div>
                  <div className="inner_form_group">
                    <label htmlFor="vehicle_number">Vehicle Number</label>
                    <input
                      className="form-control"
                    //   name="vehicle_number"
                      type="text"
                      id="vehicle_number"
                      {...register("vehicle_number")}
                    />
                    {errors.vehicle_number && <span>{errors.vehicle_number.message}</span>}
                  </div>

                  <div className="inner_form_group">
                    <label htmlFor="brand">Brand</label>
                    <select
                      className="form-control"
                      id="brand"
                      {...register("brand", {
                        onChange: (e) => setSelectedBrand(Number(e.target.value)),
                      })}
                    >
                      <option value="">Select Brand</option>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                    {errors.brand && <span>{errors.brand.message}</span>}
                  </div>
                  <div className="inner_form_group">
                    <label htmlFor="model">Model</label>
                    <select
                      className="form-control"
                      id="model"
                      {...register("model")}
                    >
                      <option value="">Select Model</option>
                      {models.map((model) => (
                        <option key={model.id} value={model.id}>
                          {model.name}
                        </option>
                      ))}
                    </select>
                    {errors.model && <span>{errors.model.message}</span>}
                  </div>

                  <div className="inner_form_group">
                    <label htmlFor="address">Address</label>
                    <input
                      className="form-control"
                    //   name="address"
                      type="text"
                      id="address"
                      {...register("address")}
                    />
                    {errors.address && <span>{errors.address.message}</span>}
                  </div>
                  <div className="inner_form_group">
                    <label htmlFor="city">City</label>
                    <input
                      className="form-control"
                    //   name="city"
                      type="text"
                      id="city"
                      {...register("city")}
                    />
                    {errors.city && <span>{errors.city.message}</span>}
                  </div>
                  <div className="inner_form_group">
                    <label htmlFor="pincode">Pin Code</label>
                    <input
                      className="form-control"
                    //   name="pincode"
                      type="text"
                      id="pincode"
                      {...register("pin_code")}
                    />
                    {errors.pin_code && <span>{errors.pin_code.message}</span>}
                  </div>
                </div>
              </div>
              <div className="form_listing">
                <div className="inner_form_group inner_form_group_submit">
                  <div className="add_submit_btn">
                    <input
                      type="submit"
                      className="submite_btn"
                      value="Submit"
                    />
                  </div>
                  <div className="add_submit_btn">
                    <input type="button" className="close_btn" value="Close" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileCustomerAdd;
