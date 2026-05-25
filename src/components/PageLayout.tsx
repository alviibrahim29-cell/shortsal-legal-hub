import { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-dark)" }}>
      <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 30% 20%, oklch(0.58 0.22 25 / 0.4), transparent 50%)" }} />
      <div className="container relative mx-auto px-4 py-20 md:py-28 text-center animate-fade-in">
        {eyebrow && (
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-semibold uppercase tracking-wider mb-5 border border-primary/20">
            {eyebrow}
          </span>
        )}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-5">{title}</h1>
        {description && (
          <p className="max-w-2xl mx-auto text-lg text-white/70 leading-relaxed">{description}</p>
        )}
      </div>
    </section>
  );
}

export function ContentSection({ children }: { children: ReactNode }) {
  return (
    <section className="container mx-auto px-4 py-16 max-w-4xl animate-slide-up">
      <div className="prose-content space-y-10">{children}</div>
    </section>
  );
}

export function PolicyBlock({ icon: Icon, title, children }: { icon?: any; title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-[var(--shadow-card)] hover:border-primary/40 transition-all">
      <div className="flex items-center gap-3 mb-3">
        {Icon && (
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

/**
 * Renders admin-editable long text. Splits on blank lines into sections;
 * the first line of each section becomes the heading.
 */
export function RichContent({ text }: { text: string }) {
  const sections = text.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
  if (sections.length === 0) return null;
  return (
    <div className="space-y-6">
      {sections.map((section, i) => {
        const lines = section.split("\n");
        const heading = lines[0];
        const body = lines.slice(1).join("\n").trim();
        return (
          <div
            key={i}
            className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-[var(--shadow-card)] hover:border-primary/40 transition-all"
          >
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">{heading}</h2>
            {body && (
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{body}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}