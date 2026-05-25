import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero, ContentSection, RichContent } from "@/components/PageLayout";
import { useSiteSettings, SITE_SETTINGS_DEFAULTS } from "@/hooks/useSiteSettings";
import { Users, Eye, DollarSign } from "lucide-react";

export const Route = createFileRoute("/earning-policy")({
  head: () => ({
    meta: [
      { title: "Earning Policy — SHORTSAL" },
      {
        name: "description",
        content:
          "How monetization works on SHORTSAL. Your channel is monetized after 800 followers and 100,000 views — then earnings begin.",
      },
      { property: "og:title", content: "SHORTSAL Earning Policy" },
      { property: "og:description", content: "Monetization eligibility, pending status, and payouts on SHORTSAL." },
    ],
    links: [{ rel: "canonical", href: "/earning-policy" }],
  }),
  component: EarningPage,
});

function EarningPage() {
  const { data: s = SITE_SETTINGS_DEFAULTS } = useSiteSettings();
  const milestones = [
    { icon: Users, label: "Followers required", value: "800" },
    { icon: Eye, label: "Total views required", value: "1,00,000" },
    { icon: DollarSign, label: "Then status becomes", value: "Monetized" },
  ];
  return (
    <PageLayout>
      <PageHero eyebrow="Creator Earnings" title={s.earning_title} description={s.earning_description} />
      <ContentSection>
        <div className="grid gap-5 md:grid-cols-3">
          {milestones.map((m, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-6 text-center hover:border-primary/40 transition-all"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                <m.icon className="h-6 w-6" />
              </span>
              <div className="text-3xl font-bold text-primary">{m.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{m.label}</div>
            </div>
          ))}
        </div>
        <RichContent text={s.earning_content} />
      </ContentSection>
    </PageLayout>
  );
}