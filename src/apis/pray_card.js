import { supabase } from "../supaClient";

export async function fetchPrayCards(user_ids) {
  const { data, error } = await supabase
    .from("pray_card")
    .select("*")
    .in("user_id", user_ids)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching pray cards:", error);
    return [];
  }

  return data;
}
