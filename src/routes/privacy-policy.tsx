import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero, ContentSection, PolicyBlock } from "@/components/PageLayout";
import { Database, Cookie, Camera, Upload, Lock, BarChart3, Mail } from "lucide-react";

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
  return (
    <PageLayout>
      <PageHero eyebrow="Last updated: 2026" title="Privacy Policy" description="Your privacy is fundamental to SHORTSAL. This policy explains what data we collect and how we use it." />
      <ContentSection>
        <PolicyBlock icon={Database} title="1. User Data Collection">
          <p>We collect information you provide when creating an account (name, email, phone, date of birth) and information generated as you use SHORTSAL (videos you watch, likes, comments, shares, device type, IP address, and approximate location).</p>
          <p>This data helps personalize your feed, secure your account, and improve our services.</p>
        </PolicyBlock>
        <PolicyBlock icon={Cookie} title="2. Cookies Usage">
          <p>SHORTSAL uses cookies and similar technologies to remember your preferences, keep you signed in, analyze traffic, and deliver relevant content. You can disable cookies in your browser, but some features may not work as intended.</p>
        </PolicyBlock>
        <PolicyBlock icon={Camera} title="3. Camera and Microphone Permissions">
          <p>To record and upload videos, SHORTSAL requests access to your device's camera and microphone. These permissions are used only while you're actively creating content. You can revoke access at any time in your device settings.</p>
        </PolicyBlock>
        <PolicyBlock icon={Upload} title="4. Content Upload Policy">
          <p>You own the content you upload. By posting on SHORTSAL, you grant us a non-exclusive license to host, display, and distribute your videos on the platform. We do not sell your content to third parties.</p>
        </PolicyBlock>
        <PolicyBlock icon={Lock} title="5. Account Safety">
          <p>We protect your account with industry-standard encryption, secure password storage, and optional two-factor authentication. We will never ask for your password by email or message.</p>
        </PolicyBlock>
        <PolicyBlock icon={BarChart3} title="6. Ads and Analytics">
          <p>SHORTSAL may display advertisements served by trusted partners including Google AdSense. These partners may use cookies to show ads based on your interests. We use analytics tools to understand how users interact with our app and improve the experience.</p>
        </PolicyBlock>
        <PolicyBlock icon={Mail} title="7. Contact Information">
          <p>For privacy questions, data requests, or to delete your account, contact us at <span className="text-primary font-semibold">SHORTSAL@gmail.com</span> or call <span className="text-primary font-semibold">827997****</span>.</p>
        </PolicyBlock>
      </ContentSection>
    </PageLayout>
  );
}