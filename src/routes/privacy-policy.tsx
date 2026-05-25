import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero, ContentSection, RichContent } from "@/components/PageLayout";
import { useSiteSettings, SITE_SETTINGS_DEFAULTS } from "@/hooks/useSiteSettings";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SHORTSAL" },
      { name: "description", content: "Read how SHORTSAL collects, uses, and protects your personal data, cookies, camera and microphone permissions." },
      { property: "og:title", content: "SHORTSAL Privacy Policy" },
      { property: "og:description", content: "Your privacy matters. Learn how we protect it." },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { data: s = SITE_SETTINGS_DEFAULTS } = useSiteSettings();
  return (
    <PageLayout>
      <PageHero eyebrow="Last updated: 2026" title={s.privacy_title} description={s.privacy_description} />
      <ContentSection>
        <RichContent text={s.privacy_content} />
      </ContentSection>
    </PageLayout>
  );
}