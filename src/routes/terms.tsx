import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero, ContentSection, PolicyBlock } from "@/components/PageLayout";
import { UserCheck, ShieldAlert, Copyright, Ban, Video, Globe } from "lucide-react";

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
  return (
    <PageLayout>
      <PageHero eyebrow="Effective: 2026" title="Terms & Conditions" description="By using SHORTSAL you agree to the following terms. Please read carefully." />
      <ContentSection>
        <PolicyBlock icon={UserCheck} title="1. User Responsibilities">
          <p>You must be at least 13 years old to use SHORTSAL. You are responsible for the security of your account, the accuracy of the information you provide, and all activity that occurs under your account.</p>
        </PolicyBlock>
        <PolicyBlock icon={ShieldAlert} title="2. No Harmful or Illegal Content">
          <p>You agree not to post content that is illegal, hateful, violent, sexually explicit, harassing, or that promotes self-harm, terrorism, or dangerous activities. Violations result in immediate removal and potential account suspension.</p>
        </PolicyBlock>
        <PolicyBlock icon={Copyright} title="3. Copyright Rules">
          <p>Only upload content you own or have permission to use. SHORTSAL responds to valid DMCA takedown notices. Repeat copyright infringers will have their accounts terminated.</p>
        </PolicyBlock>
        <PolicyBlock icon={Ban} title="4. Account Suspension Rules">
          <p>SHORTSAL reserves the right to suspend or terminate accounts that violate these terms, our Community Guidelines, or applicable law. We may remove content at our sole discretion.</p>
        </PolicyBlock>
        <PolicyBlock icon={Video} title="5. Video Upload Rules">
          <p>Videos must comply with our content standards: appropriate length, original or licensed media, no misleading thumbnails, and no spam. We may apply automated and human moderation to uploaded content.</p>
        </PolicyBlock>
        <PolicyBlock icon={Globe} title="6. Platform Usage Policy">
          <p>You may not attempt to reverse-engineer, scrape, or exploit SHORTSAL. Commercial use of our APIs or content requires written permission. We may update these terms; continued use means acceptance of the updated terms.</p>
        </PolicyBlock>
      </ContentSection>
    </PageLayout>
  );
}