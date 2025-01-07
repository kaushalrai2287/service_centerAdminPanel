// constants.ts

// Status colors mapping
export const STATUS_COLORS: Record<string, string> = {
    pending: "orange",
    completed: "green",
    accepted: "blue",
    canceled: "red",
    default: "gray",
  };
  
  // CSV headers for export
  export const CSV_HEADERS = [
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
  
  // Column definitions for the data table
  export const COLUMNS = {
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
  
  // Initial filter values
  export const INITIAL_FILTERS = {
    vehicle_no: "",
    driver_username: "",
    status: "",
    start_date: "",
    end_date: "",
  };
  