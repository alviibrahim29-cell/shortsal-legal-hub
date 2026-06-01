import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Flame, ShieldCheck, Download } from "lucide-react";
import { useSiteSettings, SITE_SETTINGS_DEFAULTS } from "@/hooks/useSiteSettings";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/community-guidelines", label: "Community" },
  { to: "/earning-policy", label: "Earning" },
  { to: "/privacy-policy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { data: settings = SITE_SETTINGS_DEFAULTS } = useSiteSettings();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
            <Flame className="h-5 w-5" />
          </span>
          <span className="tracking-tight">{settings.site_name}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={settings.download_url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold shadow-[var(--shadow-glow)] hover:scale-105 transition-transform"
          >
            <Download className="h-4 w-4" /> {settings.header_cta_label}
          </a>
          <button
          className="md:hidden p-2 rounded-md hover:bg-muted"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-primary py-1"
                activeProps={{ className: "text-primary" }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={settings.download_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold"
            >
              <Download className="h-4 w-4" /> {settings.header_cta_label}
            </a>
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary/10 text-primary px-3 py-2 text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ShieldCheck className="h-4 w-4" /> Admin Portal
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}