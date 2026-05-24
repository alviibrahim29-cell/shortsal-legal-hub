import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero, ContentSection, PolicyBlock } from "@/components/PageLayout";
import { Rocket, Users, Sparkles, Globe } from "lucide-react";

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
  return (
    <PageLayout>
      <PageHero
        eyebrow="Our Story"
        title="About SHORTSAL"
        description="A creative short video platform built for the next generation of storytellers, inspired by the best of modern creator apps."
      />
      <ContentSection>
        <PolicyBlock icon={Rocket} title="Our Mission">
          <p>
            SHORTSAL exists to empower everyone to express themselves through short-form video. Whether you're a casual viewer or a full-time creator, we believe video should be accessible, engaging, and rewarding.
          </p>
        </PolicyBlock>
        <PolicyBlock icon={Sparkles} title="What we do">
          <p>
            SHORTSAL is a short video social media platform where users can upload, watch, like, comment, and share short videos. Our smart recommendation system surfaces content you'll love, while our creator tools make production effortless.
          </p>
        </PolicyBlock>
        <PolicyBlock icon={Users} title="Our community">
          <p>
            Inspired by TikTok and other leading creator platforms, SHORTSAL is home to artists, comedians, educators, athletes, and millions of everyday people sharing what makes them unique.
          </p>
        </PolicyBlock>
        <PolicyBlock icon={Globe} title="Our vision">
          <p>
            We're building the most creator-friendly short video platform in the world — one that celebrates originality, rewards effort, and connects people through shared moments.
          </p>
        </PolicyBlock>

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