import { createClient } from "../../../utils/supabase/client";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const supabase =  await createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    redirect("/booking-management/booking-list");
  }

  return <LoginForm />;
}
