import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero, ContentSection, PolicyBlock } from "@/components/PageLayout";
import { Heart, Shield, Users, AlertTriangle, Sparkles, Flag } from "lucide-react";

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
  return (
    <PageLayout>
      <PageHero eyebrow="Our Promise" title="Community Guidelines" description="SHORTSAL is for everyone. These guidelines keep our community safe, respectful, and creative." />
      <ContentSection>
        <PolicyBlock icon={Heart} title="Be kind and respectful">
          <p>Treat every member of the community with kindness. Harassment, hate speech, or targeted attacks on others — based on race, religion, gender, sexuality, or any identity — are not allowed.</p>
        </PolicyBlock>
        <PolicyBlock icon={Shield} title="Keep it safe">
          <p>No content that promotes self-harm, violence, dangerous challenges, or illegal activity. We work hard to protect minors and remove content that endangers them.</p>
        </PolicyBlock>
        <PolicyBlock icon={Sparkles} title="Be authentic">
          <p>Don't impersonate others, spread misinformation, or use bots to inflate engagement. Original content is what makes SHORTSAL great.</p>
        </PolicyBlock>
        <PolicyBlock icon={Users} title="Respect privacy">
          <p>Don't share another person's private information or content without consent. Protect your own privacy too — be thoughtful about what you post.</p>
        </PolicyBlock>
        <PolicyBlock icon={AlertTriangle} title="No spam or scams">
          <p>Don't post repetitive content, misleading links, phishing attempts, or scams. Promotional content must be disclosed and follow platform rules.</p>
        </PolicyBlock>
        <PolicyBlock icon={Flag} title="Report what you see">
          <p>If you encounter content that violates these guidelines, report it using the in-app tools or email <span className="text-primary font-semibold">SHORTSAL@gmail.com</span>. Our moderation team reviews every report.</p>
        </PolicyBlock>
      </ContentSection>
    </PageLayout>
  );
}