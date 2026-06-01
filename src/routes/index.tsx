import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Video, Users, Sparkles, Shield, Heart, PlayCircle, ArrowRight, Download } from "lucide-react";
import { useSiteSettings, SITE_SETTINGS_DEFAULTS } from "@/hooks/useSiteSettings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SHORTSAL — Create. Watch. Share Short Videos." },
      { name: "description", content: "SHORTSAL is the next-generation short video platform for creators to upload, watch, like, comment and share. Join millions creating viral content." },
      { property: "og:title", content: "SHORTSAL — Short Video Platform" },
      { property: "og:description", content: "Create, watch, and share short videos with the world." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const { data: settings = SITE_SETTINGS_DEFAULTS } = useSiteSettings();
  return (
    <PageLayout>
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-dark)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 70% 30%, oklch(0.58 0.22 25 / 0.35), transparent 50%)" }} />
        <div className="container relative mx-auto px-4 py-24 md:py-36 text-center animate-fade-in">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-semibold uppercase tracking-wider mb-6 border border-primary/30">
            Welcome to the future of short video
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Create. Watch. <span className="text-primary">Go Viral.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 leading-relaxed mb-10">
            SHORTSAL is the ultimate short video platform where creativity meets community. Upload, discover, and share moments that matter.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={settings.download_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold shadow-[var(--shadow-glow)] hover:scale-105 transition-transform"
            >
              <Download className="h-5 w-5" /> Download App
            </a>
            <Link to="/about" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors">
              Explore <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/community-guidelines" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors">
              Community Guidelines
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-14 animate-slide-up">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Why creators love SHORTSAL</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">A platform built from the ground up for the next generation of storytellers.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Video, title: "Studio-grade tools", desc: "Powerful editing, effects, and filters to bring your ideas to life." },
            { icon: Users, title: "Vibrant community", desc: "Connect with millions of creators and discover content you love." },
            { icon: Sparkles, title: "Smart discovery", desc: "Personalized feed that learns what inspires you." },
            { icon: Shield, title: "Safe & secure", desc: "Industry-leading safety tools and transparent policies." },
            { icon: Heart, title: "Creator-first", desc: "Built for creators, monetization opportunities included." },
            { icon: PlayCircle, title: "Endless content", desc: "Fresh, trending videos in every category 24/7." },
          ].map((f, i) => (
            <div key={i} className="group rounded-2xl border border-border bg-card p-7 hover:border-primary/40 hover:shadow-[var(--shadow-card)] transition-all">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-3xl p-10 md:p-16 text-center text-white" style={{ background: "var(--gradient-hero)" }}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to start creating?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">Download {settings.site_name} now and share your story with the world.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={settings.download_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-primary font-semibold hover:scale-105 transition-transform"
            >
              <Download className="h-5 w-5" /> Download App
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors">
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
