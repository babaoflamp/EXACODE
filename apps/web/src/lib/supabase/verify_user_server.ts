import { Session, User } from "@supabase/supabase-js";
import { createClient } from "./server";

export async function verifyUserAuthenticated(): Promise<
  { user: User; session: Session } | undefined
> {
  const supabase = createClient();
  
  // Use getUser() which authenticates against the Supabase Auth server
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return undefined;
  }

  // Only get session after confirming user is authenticated
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  
  if (sessionError || !session) {
    return undefined;
  }
  
  return { user, session };
}
