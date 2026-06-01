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
  site_name: string;
  site_tagline: string;
  privacy_title: string;
  privacy_description: string;
  privacy_content: string;
  terms_title: string;
  terms_description: string;
  terms_content: string;
  about_title: string;
  about_description: string;
  about_content: string;
  community_title: string;
  community_description: string;
  community_content: string;
  earning_title: string;
  earning_description: string;
  earning_content: string;
  download_url: string;
  header_cta_label: string;
  hero_badge: string;
  hero_title: string;
  hero_subtitle: string;
  hero_primary_cta_label: string;
  hero_secondary_cta_label: string;
  hero_secondary_cta_url: string;
  cta_section_title: string;
  cta_section_subtitle: string;
  footer_copyright: string;
};

export const SITE_SETTINGS_DEFAULTS: SiteSettings = {
  id: "",
  contact_email: "SHORTSAL@gmail.com",
  contact_phone: "827997****",
  instagram_url: "#",
  twitter_url: "#",
  facebook_url: "#",
  youtube_url: "#",
  site_name: "SHORTSAL",
  site_tagline: "The next-generation short video platform for creators worldwide.",
  privacy_title: "Privacy Policy",
  privacy_description: "Your privacy is fundamental. This policy explains what data we collect and how we use it.",
  privacy_content: "",
  terms_title: "Terms & Conditions",
  terms_description: "By using our platform you agree to the following terms.",
  terms_content: "",
  about_title: "About Us",
  about_description: "A creative short video platform built for storytellers.",
  about_content: "",
  community_title: "Community Guidelines",
  community_description: "Guidelines that keep our community safe, respectful, and creative.",
  community_content: "",
  earning_title: "Earning Policy",
  earning_description: "Learn how monetization works and when your channel becomes eligible to earn.",
  earning_content: "",
  download_url: "https://apkfab.com/shortsal/co.median.android.bnelkde/apk?h=bbfd1cf29a769942ad8a9e7af7f2f939e8efd0fe54e2f089603af62188474aab",
  header_cta_label: "Download",
  hero_badge: "Welcome to the future of short video",
  hero_title: "Create. Watch. Go Viral.",
  hero_subtitle: "SHORTSAL is the ultimate short video platform where creativity meets community. Upload, discover, and share moments that matter.",
  hero_primary_cta_label: "Download App",
  hero_secondary_cta_label: "Explore",
  hero_secondary_cta_url: "/about",
  cta_section_title: "Ready to start creating?",
  cta_section_subtitle: "Download SHORTSAL now and share your story with the world.",
  footer_copyright: "",
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