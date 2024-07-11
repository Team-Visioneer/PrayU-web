import { supabase } from "../supaClient";

export const fetchPrayData = async (prayCard) => {
  if (!prayCard) {
    return [];
  }
  const { data, error } = await supabase
    .from("pray")
    .select("*")
    .eq("pray_card_id", prayCard.id)
    .is("deleted_at", null);

  if (error) {
    console.error("Error fetching pray:", error);
    return [];
  }

  return data;
};
