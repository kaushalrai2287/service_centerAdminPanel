

// import { createClient } from "../../../../utils/supabase/client";

// const supabase = createClient();

// export async function POST(req: any) {
//     try {
      
//         const { data, error } = await supabase
//             .from('bookings')
//             .select(`
//                 booking_id,
//                 customer_name,
//                 customer_phone,
//                 customer_email,
//                 Alternate_contact_no,
//                 pickup_date_time,
//                 pickup_address,
//                 dropoff_address,
//                 special_instructions,
//                 status,
//                 vehicles (
//                     license_plate_no,
//                     condition,
//                     brands (name),
//                     models (name)
//                 )
//             `);

//         if (error) {
//             throw error;
//         }

//         return new Response(JSON.stringify({ status: 'success', data }), {
//             status: 200,
//             headers: { 'Content-Type': 'application/json' },
//         });
//     } catch (error:any) {
//         return new Response(JSON.stringify({ status: 'error', message: error.message }), {
//             status: 500,
//             headers: { 'Content-Type': 'application/json' },
//         });
//     }
// }
// import { createClient } from "../../../../utils/supabase/client";

// const supabase = createClient();

// export async function POST(req: any) {
//     try {
//         // Parse request body
//         const { vehicle_no, status, driver_username, start_date, end_date } = req.body;
        

//         // Build the query with an optional filter
//         let query = supabase
//             .from('bookings')
//             .select(`
//                 booking_id,
//                 customer_name,
//                 customer_phone,
//                 customer_email,
//                 Alternate_contact_no,
//                 pickup_date_time,
//                 pickup_address,
//                 dropoff_address,
//                 special_instructions,
//                 status,
//                 vehicles:vehicles (
//                     license_plate_no,
//                     condition,
//                     brands (name),
//                     models (name)
//                 )
//             `);

        
//         if (vehicle_no) {
//             query = query.ilike('vehicles.license_plate_no', `%${vehicle_no}%`);
//         }
    
     
//         if (status) {
//             query = query.eq('status', status);
//         }
    
//         if (driver_username) {
//             query = query.ilike('driver_username', `%${driver_username}%`);
//         }
    
       
//         if (start_date && end_date) {
//             query = query.gte('pickup_date_time', start_date).lte('pickup_date_time', end_date);
//         }
        
//         const { data, error } = await query;

        
//         if (error) {
//             console.error('Database Error:', error.message);
//             return new Response(
//                 JSON.stringify({ status: 'error', message: 'Failed to fetch booking details.' }),
//                 { status: 500, headers: { 'Content-Type': 'application/json' } }
//             );
//         }

//         // Handle empty data
//         if (!data || data.length === 0) {
//             return new Response(
//                 JSON.stringify({ status: 'error', message: 'No bookings found.' }),
//                 { status: 404, headers: { 'Content-Type': 'application/json' } }
//             );
//         }

//         // Return successful response
//         return new Response(
//             JSON.stringify({ status: 'success', data }),
//             { status: 200, headers: { 'Content-Type': 'application/json' } }
//         );

//     } catch (error: any) {
//         console.error('Unexpected Error:', error.message);
//         return new Response(
//             JSON.stringify({ status: 'error', message: 'An unexpected error occurred.' }),
//             { status: 500, headers: { 'Content-Type': 'application/json' } }
//         );
//     }
// }
import { createClient } from "../../../../utils/supabase/client";

const supabase =await createClient();

export async function POST(req: any) {
    try {
     
        const body = await req.json().catch(() => null);
        const { vehicle_no, status, driver_username, start_date, end_date,page = 1, limit = 10 } = body || {};

       
        let query = supabase
            .from('bookings')
            .select(`
                booking_id,
                customer_name,
                customer_phone,
                customer_email,
                Alternate_contact_no,
                pickup_date_time,
                pickup_address,
                dropoff_address,
                special_instructions,
                status,
                vehicles:vehicles (
                    license_plate_no,
                    condition,
                    brands (name),
                    models (name)
                )
              
            `)
            .not('vehicles', 'is', null);;

      
        if (vehicle_no) {
            query = query
                .eq('vehicles.license_plate_no', vehicle_no);
        }

        
        if (status) {
            query = query.eq('status', status);
        }

        
        if (driver_username) {
            query = query.ilike('driver_username', `%${driver_username}%`);
        }


        if (start_date && end_date) {
            query = query.gte('pickup_date_time', start_date).lte('pickup_date_time', end_date);
        }

            const offset = (page - 1) * limit;
            query = query.range(offset, offset + limit - 1);

   
        const { data, error } = await query;

       
        if (error) {
            console.error('Database Error:', error.message);
            return new Response(
                JSON.stringify({ status: 'error', message: 'Failed to fetch booking details.' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

      
        if (!data || data.length === 0) {
            return new Response(
                JSON.stringify({ status: '0', message: 'No bookings found.' }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        }


        return new Response(
            JSON.stringify({ status: 'success', data }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error: any) {
        console.error('Unexpected Error:', error.message);
        return new Response(
            JSON.stringify({ status: 'error', message: 'An unexpected error occurred.' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
