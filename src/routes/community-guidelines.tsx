import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero, ContentSection, RichContent } from "@/components/PageLayout";
import { useSiteSettings, SITE_SETTINGS_DEFAULTS } from "@/hooks/useSiteSettings";

export const Route = createFileRoute("/community-guidelines")({
  head: () => ({
    meta: [
      { title: "Community Guidelines — SHORTSAL" },
      { name: "description", content: "The rules and values that keep SHORTSAL a safe, creative, and inclusive space for everyone." },
      { property: "og:title", content: "SHORTSAL Community Guidelines" },
      { property: "og:description", content: "How we keep SHORTSAL safe and welcoming." },
    ],
    links: [{ rel: "canonical", href: "/community-guidelines" }],
  }),
  component: GuidelinesPage,
});

function GuidelinesPage() {
  const { data: s = SITE_SETTINGS_DEFAULTS } = useSiteSettings();
  return (
    <PageLayout>
      <PageHero eyebrow="Our Promise" title={s.community_title} description={s.community_description} />
      <ContentSection>
        <RichContent text={s.community_content} />
      </ContentSection>
    </PageLayout>
  );
}