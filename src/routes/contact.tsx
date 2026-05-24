import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { Mail, Phone, MessageCircle, Instagram, Twitter, Facebook, Youtube, LifeBuoy, HelpCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — SHORTSAL" },
      { name: "description", content: "Get in touch with the SHORTSAL team. Email, phone, support and FAQs." },
      { property: "og:title", content: "Contact SHORTSAL" },
      { property: "og:description", content: "Reach our support team and find answers." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const faqs = [
  { q: "How do I upload a video on SHORTSAL?", a: "Open the app, tap the + icon, record or upload your clip, add effects and a caption, then tap Post." },
  { q: "Is SHORTSAL free to use?", a: "Yes — SHORTSAL is completely free for both creators and viewers." },
  { q: "How can I report inappropriate content?", a: "Tap the share icon on any video and select Report. Our moderation team reviews reports 24/7." },
  { q: "Can I monetize my videos?", a: "Yes, eligible creators can join the SHORTSAL Creator Program once they meet our requirements." },
  { q: "How do I delete my account?", a: "Go to Settings → Account → Delete Account, or email us at SHORTSAL@gmail.com." },
];

function ContactPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <PageLayout>
      <PageHero eyebrow="We're here to help" title="Contact Us" description="Have a question, feedback, or partnership idea? We'd love to hear from you." />

      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid gap-6 md:grid-cols-3 mb-16 animate-slide-up">
          {[
            { icon: Mail, label: "Email us", value: "SHORTSAL@gmail.com", href: "mailto:SHORTSAL@gmail.com" },
            { icon: Phone, label: "Call us", value: "827997****", href: "tel:827997" },
            { icon: MessageCircle, label: "Live chat", value: "Available 24/7", href: "#" },
          ].map((c, i) => (
            <a key={i} href={c.href} className="group rounded-2xl border border-border bg-card p-7 hover:border-primary/40 hover:shadow-[var(--shadow-card)] transition-all text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform">
                <c.icon className="h-6 w-6" />
              </span>
              <div className="font-semibold mb-1">{c.label}</div>
              <div className="text-sm text-muted-foreground">{c.value}</div>
            </a>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <div className="rounded-2xl border border-border bg-card p-7">
            <div className="flex items-center gap-3 mb-3">
              <LifeBuoy className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Support Center</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Our support team is available around the clock to help with account issues, content questions, and technical concerns.
            </p>
            <a href="mailto:SHORTSAL@gmail.com" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              Email Support →
            </a>
          </div>
          <div className="rounded-2xl border border-border bg-card p-7">
            <h2 className="text-2xl font-bold mb-3">Follow us</h2>
            <p className="text-muted-foreground mb-4">Stay in the loop on new features, creator spotlights, and platform updates.</p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social" className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="h-7 w-7 text-primary" />
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left px-6 py-4 font-semibold flex justify-between items-center hover:bg-muted transition-colors">
                  <span>{f.q}</span>
                  <span className="text-primary text-xl">{open === i ? "−" : "+"}</span>
                </button>
                {open === i && (
                  <div className="px-6 pb-5 text-muted-foreground animate-fade-in">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}