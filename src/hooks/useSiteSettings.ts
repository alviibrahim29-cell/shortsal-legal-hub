import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SiteSettings = {
  id: string;
  contact_email: string;
  contact_phone: string;
  instagram_url: string;
  twitter_url: string;
  facebook_url: string;
  youtube_url: string;
};

export const SITE_SETTINGS_DEFAULTS: SiteSettings = {
  id: "",
  contact_email: "SHORTSAL@gmail.com",
  contact_phone: "827997****",
  instagram_url: "#",
  twitter_url: "#",
  facebook_url: "#",
  youtube_url: "#",
};

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site_settings"],
    queryFn: async (): Promise<SiteSettings> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return (data as SiteSettings) ?? SITE_SETTINGS_DEFAULTS;
    },
  });
}