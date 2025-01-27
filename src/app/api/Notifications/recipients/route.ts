import { createClient } from "../../../../../utils/supabase/client";
import { NextResponse } from "next/server";
const supabase = createClient();
export async function GET(req: { url: string | URL; }) {
    const { searchParams } = new URL(req.url);
    const recipient_id = searchParams.get("recipient_id"); // Get recipient_id from URL query

    if (!recipient_id) {
        return NextResponse.json({ status: "error", message: "recipient_id is required" }, { status: 400 });
    }

    try {
        const { data, error } = await supabase
            .from("admin_notification_recipients_v2")
            .select(`
                id,
                recipient_type,
                is_read,
                admin_notifications_v2 (
                    notification_id,
                    type,
                    message,
                    title,
                    doc_url,
                    created_at
                )
            `)
            .eq("recipient_id", recipient_id)
            .order("created_at", { foreignTable: "admin_notifications_v2", ascending: false });

        if (error) throw error;

        return NextResponse.json({ status: "success", data });
    } catch (error:any) {
        return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
    }
}
