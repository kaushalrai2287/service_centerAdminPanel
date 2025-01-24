// import { PasswordUpdateForm } from "./update-password";

import PasswordUpdateForm from "./update-password";
import { createClient } from "../../../utils/supabase/client";

async function PasswordUpdatePage() {
  const supabase =  await createClient();
  const { data: { user } } = await supabase.auth.getUser();


  return (
    <main>
     
      {/* <h1>Update your password</h1> */}
      <PasswordUpdateForm />
    </main>
  );
}

export default PasswordUpdatePage;