import { createClient } from "../../../../utils/supabase/client";

const supabase = createClient();

export async function POST(req: any) {
    try {
     
        const body = await req.json().catch(() => null);

      
        const { status, start_date, end_date, page = 1, limit = 10 } = body || {};

     
        let query = supabase
            .from('ServiceCenter_invoices')
            .select(`
                booking_id,
                invoice_id,
                service_center_id,
                driver_id,
                total_amount,
                is_paid,
                payment_date,
                drivers (driver_name),
                service_centers (name)
            `);

      
        if (status) {
            query = query.eq('is_paid', status);
        }

        // Apply start_date filter if provided
        if (start_date && end_date) {
            query = query.gte('payment_date', start_date).lte('payment_date', end_date);
        }

       

        // Apply pagination
        const offset = (page - 1) * limit;
        query = query.range(offset, offset + limit - 1);

        // Execute query
        const { data, error } = await query;

        // Handle errors
        if (error) {
            console.error('Database Error:', error.message);
            return new Response(
                JSON.stringify({ status: 'error', message: 'Failed to fetch booking details.' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Handle empty data
        if (!data || data.length === 0) {
            return new Response(
                JSON.stringify({ status: '0', message: 'No bookings found.' }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Return successful response
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
