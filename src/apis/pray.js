import { supabase } from "../supaClient";

export async function fetchPray(prayCardId) {
  if (!prayCardId) {
    console.error("Invalid prayCardId");
    return { data: null, error: "Invalid prayCardId" };
  }

  // Fetch prays for the given pray_card_id
  const { data, error } = await supabase
    .from("pray")
    .select("*")
    .eq("pray_card_id", prayCardId)
    .is("deleted_at", null);

  if (error) {
    console.error("Error fetching prays:", error.message);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}
