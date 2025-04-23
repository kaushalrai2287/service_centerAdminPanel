"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { custom, z } from "zod";

import Header from "../../../../components/Header";
import Sidemenu from "../../../../components/Sidemenu";
import { createClient } from "../../../../utils/supabase/client";
import { redirect } from "next/navigation";
import { assignDriverToBooking } from "../../../../utils/functions/assignDriverToBooking";
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
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits"),
  Secondary_Contact_Number: z
    .string()
    .regex(/^\d+$/, "Phone must contain only digits")
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits").optional(),
  pickup_date_time: z.string().min(1, "Pickup Date and Time is required"),
  pickup_address: z.string().min(1, "Pickup Location is required"),

  dropoff_address: z.string().min(1, "Dropoff Location is required"),
 
  special_instructions: z.string().optional(),



  //new fields
  p_lat: z.string().min(1, "Pick Up Latitude is required"),
  p_lng: z.string().min(1, "Pick Up Longitude is required"),
  d_lat: z.string().min(1, "Drop Latitude is required"),
  d_lng: z.string().min(1, "Drop Longitude is required"),
});

type FormValues = z.infer<typeof formSchema>;


const NewBooking = () => {
  
; // Check if authId is set
  const [isToggled, setIsToggled] = useState(false); // State for toggle
  const [brands, setBrands] = useState<{ id: string; name: string }[]>([]);
  const [models, setModels] = useState<{ id: string; name: string }[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [isManualInput, setIsManualInput] = useState(false);
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
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const toggleClass = () => {
    setIsToggled(!isToggled);
  };
  

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
      const { data: existingVehicle, error: existingVehicleError } =
        await supabase
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

      const { data:bookingData, error: bookingError } = await supabase.from("bookings").insert([
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
          service_center_id: serviceCenterId, 
        },
      ])
      .select("booking_id")
      .single();

      if (bookingError) {
        console.error("Error inserting booking:", bookingError.message);
        return;
      }
      const booking_id = bookingData.booking_id;
  
      // Step 4: Insert booking location
      const { error: locationError } = await supabase
        .from("booking_locations")
        .insert([
          {
            booking_id,
            customer_latitude: data.p_lat,
            customer_longitude: data.p_lng,
            dropoff_lat: data.d_lat,
            dropoff_lng: data.d_lng,
          },
        ]);
  
      if (locationError) {
        console.error("Booking Location Insert Error:", locationError.message);
        return;
      }
      try {
        // Call the assignDriverToBooking function instead of the fetch request
        const assignResult = await assignDriverToBooking(
          booking_id,
          parseFloat(data.p_lat),
          parseFloat(data.p_lng)
        );
    
        if (assignResult.error) {
          console.warn("Driver status change failed:", assignResult.message || assignResult.error);
        } else {
          console.log("Driver status changed successfully:", assignResult);
        }
      } catch (assignError) {
        console.error("Error calling assignDriver function:", assignError);
      }


      alert("Booking successfully added!");
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
  };
  
  // ✅ Fetch vehicle and customer details based on vehicle_no
  const handleVehicleChange = async () => {
    const vehicle_no = getValues("vehicle_no");
    if (!vehicle_no) return;
  
    try {
      // Step 1: Get vehicle details
      const { data: vehicle, error: vehicleError } = await supabase
        .from("vehicles")
        .select("vehicle_id, brand_id, model_id, condition")
        .eq("license_plate_no", vehicle_no)
        .single();
  
      if (vehicleError || !vehicle) {
        console.warn("Vehicle not found. Please enter details manually.");
        
        // ✅ Clear existing fields if no vehicle found
        setValue("brand", "");
        setSelectedBrand("");
        setValue("model", "");
        setValue("condition", "");
        
       
        setIsManualInput(true);
        return;
      }
  
      console.log("Vehicle found:", vehicle);
  
      // ✅ Pre-fill vehicle details
      setValue("brand", vehicle.brand_id);
      setSelectedBrand(vehicle.brand_id); // To trigger model fetch
      setValue("model", vehicle.model_id);
      setValue("condition", vehicle.condition || "");
  
      // Step 2: Get customer details linked to this vehicle
      const { data: booking, error: bookingError } = await supabase
        .from("bookings")
        .select(
          "customer_name, customer_phone, customer_email, Alternate_contact_no, pickup_date_time, pickup_address, dropoff_address, special_instructions"
        )
        .eq("vehicle_id", vehicle.vehicle_id)
        .single();
  
      if (bookingError || !booking) {
        console.warn("Booking details not found for this vehicle.");
        
        // ✅ Allow manual entry if no booking found
        setValue("customer_name", "");
        setValue("customer_phone", "");
        setValue("Customer_Email", "");
        setValue("Secondary_Contact_Number", "");
        setValue("pickup_date_time", "");
        setValue("pickup_address", "");
        setValue("dropoff_address", "");
        setValue("special_instructions", "");
  
        setIsManualInput(true); // Enable manual input for customer details
        return;
      }
  
      console.log("Booking found:", booking);
  
      // ✅ Pre-fill booking/customer details
      setValue("customer_name", booking.customer_name);
      setValue("customer_phone", booking.customer_phone);
      setValue("Customer_Email", booking.customer_email);
      setValue("Secondary_Contact_Number", booking.Alternate_contact_no || "");
      setValue("pickup_date_time", booking.pickup_date_time);
      setValue("pickup_address", booking.pickup_address);
      setValue("dropoff_address", booking.dropoff_address);
      setValue("special_instructions", booking.special_instructions || "");
  
      setIsManualInput(false); // Disable manual input since data is pre-filled
    } catch (error) {
      console.error("Error in handleVehicleChange:", error);
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
                      onBlur={handleVehicleChange}
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
                    {errors.condition && (
                      <p className="erro_message">{errors.condition.message}</p>
                    )}
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
                    {errors.customer_name && (
                      <p className="erro_message">
                        {errors.customer_name.message}
                      </p>
                    )}
                  </div>
                  <div className="inner_form_group">
                    <label htmlFor="customer_phone">Phone Number</label>
                    <input
                      className="form-control"
                      id="customer_phone"
                      type="text"
                      {...register("customer_phone")}
                    />
                    {errors.customer_phone && (
                      <p className="erro_message">
                        {errors.customer_phone.message}
                      </p>
                    )}
                  </div>
                  <div className="inner_form_group">
                    <label htmlFor="Customer_Email">Customer Email</label>
                    <input
                      className="form-control"
                      id="Customer_Email"
                      type="text"
                      {...register("Customer_Email")}
                    />
                    {errors.Customer_Email && (
                      <p className="erro_message">
                        {errors.Customer_Email.message}
                      </p>
                    )}
                  </div>
                  <div className="inner_form_group">
                    <label htmlFor="Secondary_Contact_Number">
                      Secondary Contact Number
                    </label>
                    <input
                      className="form-control"
                      id="Secondary_Contact_Number"
                      type="text"
                      {...register("Secondary_Contact_Number")}
                    />
                    {errors.Secondary_Contact_Number && (
                      <p className="erro_message">
                        {errors.Secondary_Contact_Number.message}
                      </p>
                    )}
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
                    {errors.pickup_date_time && (
                      <p className="erro_message">
                        {errors.pickup_date_time.message}
                      </p>
                    )}
                  </div>
                  <div className="inner_form_group">
                    <label htmlFor="pickup_address">Pickup Location</label>
                    <input
                      className="form-control"
                      id="pickup_address"
                      type="text"
                      {...register("pickup_address")}
                    />
                    {errors.pickup_address && (
                      <p className="erro_message">
                        {errors.pickup_address.message}
                      </p>
                    )}
                  </div>
                  <div className="inner_form_group">
                <label htmlFor="p_lat">
                  Pick Up Latitude <span>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  {...register("p_lat")}
                  id="p_lat"
                />
                {errors.p_lat && (
                  <p className="erro_message">{errors.p_lat.message}</p>
                )}
              </div>

              <div className="inner_form_group">
                <label htmlFor="p_lng">
                  Pick Up Longitude <span>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  {...register("p_lng")}
                  id="p_lng"
                />
                {errors.p_lng && (
                  <p className="erro_message">{errors.p_lng.message}</p>
                )}
              </div>
                  
                  <div className="inner_form_group">
                    <label htmlFor="dropoff_address">Drop off Location</label>
                    <input
                      className="form-control"
                      id="dropoff_address"
                      type="text"
                      {...register("dropoff_address")}
                    />

                    {errors.dropoff_address && (
                      <p className="erro_message">
                        {errors.dropoff_address.message}
                      </p>
                    )}
                  </div>
                  <div className="inner_form_group">
                <label htmlFor="d_lat">
                  Drop Latitude <span>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  {...register("d_lat")}
                  id="d_lat"
                />
                {errors.d_lat && (
                  <p className="erro_message">{errors.d_lat.message}</p>
                )}
              </div>

              <div className="inner_form_group">
                <label htmlFor="d_lng">
                  Drop Longitude <span>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  {...register("d_lng")}
                  id="d_lng"
                />
                {errors.d_lng && (
                  <p className="erro_message">{errors.d_lng.message}</p>
                )}
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
