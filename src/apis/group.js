import { supabase } from "../supaClient";

export const fetchGroup = async (user_id) => {
  const { data, error } = await supabase
    .from("group")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error("Error fetching group:", error);
    return null;
  }

  return data;
};

export const createGroup = async (group) => {
  const { data, error } = await supabase.from("group").insert([group]);

  if (error) {
    console.error("Error creating group:", error);
    return null;
  }

  return data;
};
