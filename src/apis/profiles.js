import { supabase } from "../supaClient";
export async function fetchProfiles(user_ids) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url")
    .in("id", user_ids);

  if (error) {
    console.error("Error fetching profiles:", error);
    return [];
  }

  return data;
}
