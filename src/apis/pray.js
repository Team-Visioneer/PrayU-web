import { supabase } from "../supaClient";

export const fetchPrayData = async (prayCardId) => {
  const { data, error } = await supabase
    .from("pray")
    .select("*")
    .eq("pray_card_id", prayCardId)
    .is("deleted_at", null);

  if (error) {
    console.error("Error fetching pray:", error);
    return [];
  }

  return data;
};
