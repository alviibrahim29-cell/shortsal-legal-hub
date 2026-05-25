import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero, ContentSection, RichContent } from "@/components/PageLayout";
import { useSiteSettings, SITE_SETTINGS_DEFAULTS } from "@/hooks/useSiteSettings";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — SHORTSAL" },
      { name: "description", content: "Learn about SHORTSAL, a creative short video platform inspired by TikTok and modern creator apps." },
      { property: "og:title", content: "About SHORTSAL" },
      { property: "og:description", content: "Our story, mission, and what we're building." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { data: s = SITE_SETTINGS_DEFAULTS } = useSiteSettings();
  return (
    <PageLayout>
      <PageHero
        eyebrow="Our Story"
        title={s.about_title}
        description={s.about_description}
      />
      <ContentSection>
        <RichContent text={s.about_content} />

        <div className="grid gap-6 md:grid-cols-3 pt-4">
          {[
            { stat: "10M+", label: "Active creators" },
            { stat: "500M+", label: "Videos watched" },
            { stat: "150+", label: "Countries reached" },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-7 text-center hover:border-primary/40 transition-all">
              <div className="text-4xl font-bold text-primary mb-1">{s.stat}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </ContentSection>
    </PageLayout>
  );
}