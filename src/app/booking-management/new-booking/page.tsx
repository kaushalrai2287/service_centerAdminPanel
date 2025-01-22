"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { custom, z } from "zod";

import Header from "../../../../components/Header";
import Sidemenu from "../../../../components/Sidemenu";
import { createClient } from "../../../../utils/supabase/client";
import { redirect } from "next/navigation";
const supabase = await createClient();

const formSchema = z.object({
  vehicle_no: z.string().min(1, "Vehicle Number is required"),
  brand: z.string().min(1, "Vehicle Brand is required"),
  model: z.string().min(1, "Vehicle Model is required"),
  condition: z.string().optional(),
  customer_name: z.string().min(1, "Customer Name is required"),
  Customer_Email: z.string().email("customer email address").optional(),
  customer_phone: z
    .string()
    .regex(/^\d+$/, "Phone must contain only digits")
    .min(10)
    .max(10),
  Secondary_Contact_Number: z
    .string()
    .regex(/^\d+$/, "Phone must contain only digits")
    .min(10)
    .max(10),
  pickup_date_time: z.string().min(1, "Pickup Date and Time is required"),
  pickup_address: z.string().min(1, "Pickup Location is required"),
  dropoff_address: z.string().min(1, "Dropoff Location is required"),
  special_instructions: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const NewBooking = () => {


   useEffect(() => {
      const fetchUser = async () => {
        const supabase = await createClient();
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error || !user) {
          redirect("/login");
        }
      };
      fetchUser();
    }, []);
  const [isToggled, setIsToggled] = useState(false); // State for toggle
  const [brands, setBrands] = useState<{ id: string; name: string }[]>([]);
  const [models, setModels] = useState<{ id: string; name: string }[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const toggleClass = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    const fetchBrands = async () => {
      const { data, error } = await supabase.from("brands").select("id, name");
      if (error) {
        console.error("Error fetching brands:", error);
      } else {
        setBrands(data || []);
      }
    };
    fetchBrands();
  }, []);

  
  useEffect(() => {
    const fetchModels = async () => {
      if (!selectedBrand) return;
      const { data, error } = await supabase
        .from("models")
        .select("id, name")
        .eq("brand_id", selectedBrand);

      if (error) {
        console.error("Error fetching models:", error);
      } else {
        setModels(data || []);
      }
    };
    fetchModels();
  }, [selectedBrand]);
  const onSubmit = async (data: FormValues) => {
    try {
     
      const { data: existingVehicle, error: existingVehicleError } = await supabase
        .from("vehicles")
        .select("vehicle_id")
        .eq("license_plate_no", data.vehicle_no)
        .single();
  
      let vehicleId = existingVehicle?.vehicle_id;
  
      if (!vehicleId) {
      
        const { data: newVehicle, error: newVehicleError } = await supabase
          .from("vehicles")
          .insert([
            {
              license_plate_no: data.vehicle_no,
              brand_id: data.brand,
              model_id: data.model,
              condition: data.condition,
            },
          ])
          .select("vehicle_id")
          .single();
  
        if (newVehicleError) {
          console.error("Error inserting vehicle:", newVehicleError.message);
          return;
        }
  
        vehicleId = newVehicle.vehicle_id;
      }
  
      
      const { error: bookingError } = await supabase.from("bookings").insert([
        {
          customer_name: data.customer_name,
          customer_phone: data.customer_phone,
          pickup_date_time: data.pickup_date_time,
          pickup_address: data.pickup_address,
          dropoff_address: data.dropoff_address,
          special_instructions: data.special_instructions,
          customer_email: data.Customer_Email,
          Alternate_contact_no: data.Secondary_Contact_Number,
          vehicle_id: vehicleId, 
        },
      ]);
  
      if (bookingError) {
        console.error("Error inserting booking:", bookingError.message);
        return;
      }
  
      alert("Booking successfully added!");
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
  };
  
  // const onSubmit = async (data: FormValues) => {
  //   try {
  //     const { data: vehicleData, error: vehicleError } = await supabase
  //       .from("vehicles")
  //       .insert([
  //         {
  //           license_plate_no: data.vehicle_no,
  //           brand_id: data.brand,
  //           model_id: data.model, 
  //           condition: data.condition,
  //         },
  //       ])
  //       .select("vehicle_id") 
  //       .single();

  //     if (vehicleError) {
  //       console.error("Error inserting vehicle:", vehicleError.message);
  //       return;
  //     }

  //     const vehicleId = vehicleData?.vehicle_id;

      
  //     const { data: bookingData, error: bookingError } = await supabase
  //       .from("bookings")
  //       .insert([
  //         {
  //           customer_name: data.customer_name,
  //           customer_phone: data.customer_phone,
  //           pickup_date_time: data.pickup_date_time,
  //           pickup_address: data.pickup_address,
  //           dropoff_address: data.dropoff_address,
  //           special_instructions: data.special_instructions,
  //           customer_email: data.Customer_Email,
  //           Alternate_contact_no: data.Secondary_Contact_Number,
  //           vehicle_id: vehicleId, // Link the vehicle_id
  //         },
  //       ]);

  //     if (bookingError) {
  //       console.error("Error inserting booking:", bookingError.message);
  //       return;
  //     }

  //     // console.log("Booking and Vehicle successfully added:", {
  //     //   vehicleData,
  //     //   bookingData,
  //     // });
  //     alert("Booking and Vehicle successfully added!");
  //   } catch (error) {
  //     console.error("Error in onSubmit:", error);
  //   }
  // };

  return (
    <main className="add_service_center_main">
      <div className={`inner_mainbox ${isToggled ? "toggled-class" : ""}`}>
        <div className="inner_left">
          <Sidemenu onToggle={toggleClass} />
        </div>
        <div className="inner_right">
          <Header />
          <div className="book_driver_box">
            <div className="book_driver_heading">
              <h2>Search and Book Drivers</h2>
            </div>
            <div className="book_driver_para">
              <p>
                Browse and book available drivers for vehicle pick-up and
                drop-off services.
              </p>
            </div>
          </div>
          <div className="new_booking_form_mainbox">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form_listing form_listing_red">
                <div className="form_heading_box">
                  <div className="form_heading">
                    <h2>
                      Vehicle <span>Information</span>
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
                    <label htmlFor="vehicle_no">Vehicle Number</label>
                    <input
                      className="form-control"
                      id="vehicle_no"
                      type="text"
                      {...register("vehicle_no")}
                    />
                    {errors.vehicle_no && (
                      <span>{errors.vehicle_no.message}</span>
                    )}
                  </div>
                  <div className="inner_form_group">
                    <label htmlFor="brand">Vehicle Brand</label>
                    <select
                      className="form-control"
                      id="brand"
                      {...register("brand")}
                      onChange={(e) => {
                        setSelectedBrand(e.target.value);
                        setValue("brand", e.target.value); // Update form value
                      }}
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
                    <label htmlFor="condition">Vehicle Condition</label>
                    <input
                      className="form-control"
                      id="condition"
                      type="text"
                      {...register("condition")}
                      placeholder="Special Handling Requirement"
                    />
                  </div>
                </div>
              </div>

              <div className="form_listing form_listing_with_bg">
                <div className="form_heading_box">
                  <div className="form_heading">
                    <h2>
                      <span>Pick</span> and <span>Drop</span>
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
                    <label htmlFor="customer_name">Customer Name</label>
                    <input
                      className="form-control"
                      id="customer_name"
                      type="text"
                      {...register("customer_name")}
                    />
                  </div>
                  <div className="inner_form_group">
                    <label htmlFor="customer_phone">Phone Number</label>
                    <input
                      className="form-control"
                      id="customer_phone"
                      type="text"
                      {...register("customer_phone")}
                    />
                  </div>
                  <div className="inner_form_group">
                    <label htmlFor="Customer_Email">Customer Email</label>
                    <input
                      className="form-control"
                      id="Customer_Email"
                      type="text"
                      {...register("Customer_Email")}
                    />
                  </div>
                  <div className="inner_form_group">
                    <label htmlFor="Secondary_Contact_Number">Secondary Contact Number</label>
                    <input
                      className="form-control"
                      id="Secondary_Contact_Number"
                      type="text"
                      {...register("Secondary_Contact_Number")}
                    />
                  </div>
                  <div className="inner_form_group">
                    <label htmlFor="pickup_date_time">
                      Pick up date and time
                    </label>
                    <input
                      className="form-control"
                      id="pickup_date_time"
                      type="datetime-local"
                      {...register("pickup_date_time")}
                    />
                  </div>
                  <div className="inner_form_group">
                    <label htmlFor="pickup_address">Pickup Location</label>
                    <input
                      className="form-control"
                      id="pickup_address"
                      type="text"
                      {...register("pickup_address")}
                    />
                  </div>
                  <div className="inner_form_group">
                    <label htmlFor="dropoff_address">Drop off Location</label>
                    <input
                      className="form-control"
                      id="dropoff_address"
                      type="text"
                      {...register("dropoff_address")}
                    />
                  </div>
                  <div className="inner_form_group">
                    <label htmlFor="special_instructions">
                      Special Instructions
                    </label>
                    <input
                      className="form-control"
                      id="special_instructions"
                      type="text"
                      placeholder="Entry Code, Parking details etc"
                      {...register("special_instructions")}
                    />
                  </div>
                </div>
              </div>
              <div className="form_listing">
                <div className="form_heading_box">
                  <div className="form_heading">
                    <h2>
                      Driver <span>Preference</span>
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
                    <label htmlFor="name">Driver Experience</label>
                    <input
                      className="form-control"
                      name=""
                      type="text"
                      id="name"
                    />
                  </div>
                  <div className="rate">
                    <input type="radio" id="star1" name="rate" value="1" />
                    <label htmlFor="star1">1 star</label>
                    <input type="radio" id="star2" name="rate" value="2" />
                    <label htmlFor="star2">2 stars</label>
                    <input type="radio" id="star3" name="rate" value="3" />
                    <label htmlFor="star3">3 stars</label>
                    <input type="radio" id="star4" name="rate" value="4" />
                    <label htmlFor="star4">4 stars</label>
                    <input type="radio" id="star5" name="rate" value="5" />
                    <label htmlFor="star5">5 stars</label>
                  </div>
                </div>
              </div>
              <div className="form_listing form_listing_with_bg">
                <div className="form_heading_box">
                  <div className="form_heading">
                    <h2>
                      Vehicle <span>Safety Check</span>
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
                  <div className="inner_form_group inner_form_group_checkbox">
                    <label htmlFor="">Empty Vehicle</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="inner_form_group inner_form_group_checkbox">
                    <label htmlFor="">
                      Photo before pick up and after dropoff
                    </label>
                    <input type="checkbox" name="" id="" />
                  </div>
                </div>
              </div>
              <div className="form_listing">
                <div className="inner_form_group inner_form_group_submit">
                  <input type="submit" className="submite_btn" value="Submit" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewBooking;
