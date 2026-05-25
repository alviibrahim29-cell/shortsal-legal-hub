import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero, ContentSection, RichContent } from "@/components/PageLayout";
import { useSiteSettings, SITE_SETTINGS_DEFAULTS } from "@/hooks/useSiteSettings";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — SHORTSAL" },
      { name: "description", content: "The rules and policies that govern your use of SHORTSAL — responsibilities, content rules, and account terms." },
      { property: "og:title", content: "SHORTSAL Terms & Conditions" },
      { property: "og:description", content: "Read the terms governing the SHORTSAL platform." },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { data: s = SITE_SETTINGS_DEFAULTS } = useSiteSettings();
  return (
    <PageLayout>
      <PageHero eyebrow="Effective: 2026" title={s.terms_title} description={s.terms_description} />
      <ContentSection>
        <RichContent text={s.terms_content} />
      </ContentSection>
    </PageLayout>
  );
}