import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Link = Tables<"links">;
export type SocialLink = Tables<"social_links">;
export type Setting = Tables<"settings">;

// Fetch all active links
export const useLinks = () => {
  return useQuery({
    queryKey: ["links"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("links")
        .select("*")
        .order("position", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });
};

// Fetch all links for admin (including inactive)
export const useAllLinks = () => {
  return useQuery({
    queryKey: ["all_links"],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("links")
        .select("*")
        .order("position", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });
};

// Fetch all social links
export const useSocialLinks = () => {
  return useQuery({
    queryKey: ["social_links"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_links")
        .select("*")
        .order("position", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });
};

// Fetch settings
export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("*");
      
      if (error) throw error;
      
      // Convert array to object for easier access
      const settingsMap: Record<string, string | null> = {};
      data.forEach((setting) => {
        settingsMap[setting.key] = setting.value;
      });
      
      return settingsMap;
    },
  });
};

// Track link click
export const useTrackClick = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (linkId: string) => {
      const { error } = await supabase.rpc("increment_click_count", {
        link_id: linkId,
      });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
};

// Admin mutations
export const useCreateLink = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (link: { title: string; url: string; icon?: string; is_featured?: boolean }) => {
      // Get max position
      const { data: links } = await supabase
        .from("links")
        .select("position")
        .order("position", { ascending: false })
        .limit(1);
      
      const maxPosition = links?.[0]?.position ?? 0;
      
      const { data, error } = await supabase
        .from("links")
        .insert({ ...link, position: maxPosition + 1 })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
      queryClient.invalidateQueries({ queryKey: ["all_links"] });
    },
  });
};

export const useUpdateLink = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Link> & { id: string }) => {
      const { data, error } = await supabase
        .from("links")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
      queryClient.invalidateQueries({ queryKey: ["all_links"] });
    },
  });
};

export const useDeleteLink = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("links")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
      queryClient.invalidateQueries({ queryKey: ["all_links"] });
    },
  });
};

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { data, error } = await supabase
        .from("settings")
        .update({ value })
        .eq("key", key)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
};
