import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Flame,
  LogOut,
  Save,
  Loader2,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  ShieldCheck,
  Globe,
  Download,
  Sparkles,
  LayoutTemplate,
} from "lucide-react";
import { toast } from "sonner";
import { useSiteSettings, SITE_SETTINGS_DEFAULTS, type SiteSettings } from "@/hooks/useSiteSettings";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Panel — SHORTSAL" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPanel,
});

type PageKey = "privacy" | "terms" | "about" | "community" | "earning";

const PAGES: { key: PageKey; label: string }[] = [
  { key: "privacy", label: "Privacy Policy" },
  { key: "terms", label: "Terms" },
  { key: "about", label: "About" },
  { key: "community", label: "Community" },
  { key: "earning", label: "Earning" },
];

function AdminPanel() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const { data: settings } = useSiteSettings();
  const [form, setForm] = useState<SiteSettings>(SITE_SETTINGS_DEFAULTS);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate({ to: "/admin/login" });
        return;
      }
      setUserEmail(sess.session.user.email ?? "");
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sess.session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!roles) {
        toast.error("This account is not an admin.");
        await supabase.auth.signOut();
        navigate({ to: "/admin/login" });
        return;
      }
      setIsAdmin(true);
      setChecking(false);
    })();
  }, [navigate]);

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  const update = (k: keyof SiteSettings, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { id, ...rest } = form;
      const { error } = await supabase.from("site_settings").update(rest).eq("id", id);
      if (error) throw error;
      toast.success("Settings updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["site_settings"] });
    } catch (err: any) {
      toast.error(err.message ?? "Could not save");
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  if (checking || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Flame className="h-4 w-4" />
            </span>
            {form.site_name || "SHORTSAL"}
            <span className="ml-2 text-xs text-muted-foreground font-normal">Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-muted-foreground">{userEmail}</span>
            <Button onClick={logout} variant="outline" size="sm">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="flex items-center gap-2 text-primary mb-2">
          <ShieldCheck className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Admin Panel — Full Site Control</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Site Management</h1>
        <p className="text-muted-foreground mb-8">
          Edit anything on the website — site name, contact info, social links, and every legal/info page.
        </p>

        <form onSubmit={save} className="space-y-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-3 sm:grid-cols-9 h-auto">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="footer">Footer</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              {PAGES.map((p) => (
                <TabsTrigger key={p.key} value={p.key}>
                  {p.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* General */}
            <TabsContent value="general" className="mt-6">
              <Card>
                <Field icon={Globe} label="Site Name">
                  <Input value={form.site_name} onChange={(e) => update("site_name", e.target.value)} />
                </Field>
                <Field icon={Globe} label="Site Tagline (shown in footer)">
                  <Textarea
                    rows={2}
                    value={form.site_tagline}
                    onChange={(e) => update("site_tagline", e.target.value)}
                  />
                </Field>
                <Field icon={Download} label="App Download URL (used by the Download button & store badges)">
                  <Input
                    type="url"
                    placeholder="https://..."
                    value={form.download_url}
                    onChange={(e) => update("download_url", e.target.value)}
                  />
                </Field>
                <Field icon={Download} label="Header CTA Button Label">
                  <Input
                    value={form.header_cta_label}
                    onChange={(e) => update("header_cta_label", e.target.value)}
                    placeholder="Download"
                  />
                </Field>
              </Card>
            </TabsContent>

            {/* Hero */}
            <TabsContent value="hero" className="mt-6">
              <Card>
                <div className="text-xs text-muted-foreground rounded-lg bg-muted/50 p-3 leading-relaxed">
                  <strong className="text-foreground">Tip:</strong> The last word of the Hero Title is highlighted in red.
                </div>
                <Field icon={Sparkles} label="Hero Badge (small pill above the title)">
                  <Input
                    value={form.hero_badge}
                    onChange={(e) => update("hero_badge", e.target.value)}
                  />
                </Field>
                <Field icon={Sparkles} label="Hero Title">
                  <Input
                    value={form.hero_title}
                    onChange={(e) => update("hero_title", e.target.value)}
                  />
                </Field>
                <Field icon={Sparkles} label="Hero Subtitle">
                  <Textarea
                    rows={3}
                    value={form.hero_subtitle}
                    onChange={(e) => update("hero_subtitle", e.target.value)}
                  />
                </Field>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Primary CTA Label (download button)">
                    <Input
                      value={form.hero_primary_cta_label}
                      onChange={(e) => update("hero_primary_cta_label", e.target.value)}
                    />
                  </Field>
                  <Field label="Secondary CTA Label">
                    <Input
                      value={form.hero_secondary_cta_label}
                      onChange={(e) => update("hero_secondary_cta_label", e.target.value)}
                    />
                  </Field>
                </div>
                <Field label="Secondary CTA URL (internal like /about or full https://...)">
                  <Input
                    value={form.hero_secondary_cta_url}
                    onChange={(e) => update("hero_secondary_cta_url", e.target.value)}
                  />
                </Field>
                <div className="border-t border-border pt-5 space-y-5">
                  <p className="text-sm font-semibold text-foreground">Bottom CTA Section</p>
                  <Field label="CTA Section Title">
                    <Input
                      value={form.cta_section_title}
                      onChange={(e) => update("cta_section_title", e.target.value)}
                    />
                  </Field>
                  <Field label="CTA Section Subtitle">
                    <Textarea
                      rows={2}
                      value={form.cta_section_subtitle}
                      onChange={(e) => update("cta_section_subtitle", e.target.value)}
                    />
                  </Field>
                </div>
              </Card>
            </TabsContent>

            {/* Footer */}
            <TabsContent value="footer" className="mt-6">
              <Card>
                <Field icon={LayoutTemplate} label="Footer Tagline (under the logo)">
                  <Textarea
                    rows={2}
                    value={form.site_tagline}
                    onChange={(e) => update("site_tagline", e.target.value)}
                  />
                </Field>
                <Field icon={LayoutTemplate} label="Footer Copyright (leave empty for auto)">
                  <Input
                    placeholder={`© ${new Date().getFullYear()} ${form.site_name}. All rights reserved.`}
                    value={form.footer_copyright}
                    onChange={(e) => update("footer_copyright", e.target.value)}
                  />
                </Field>
                <div className="text-xs text-muted-foreground rounded-lg bg-muted/50 p-3 leading-relaxed">
                  Footer social links are managed in the <strong>Social</strong> tab.
                  Contact details shown in the footer come from the <strong>Contact</strong> tab.
                  Store badge links use the <strong>App Download URL</strong> from the General tab.
                </div>
              </Card>
            </TabsContent>

            {/* Contact */}
            <TabsContent value="contact" className="mt-6">
              <Card>
                <Field icon={Mail} label="Contact Email">
                  <Input
                    type="email"
                    value={form.contact_email}
                    onChange={(e) => update("contact_email", e.target.value)}
                  />
                </Field>
                <Field icon={Phone} label="Contact Phone">
                  <Input
                    type="tel"
                    value={form.contact_phone}
                    onChange={(e) => update("contact_phone", e.target.value)}
                  />
                </Field>
              </Card>
            </TabsContent>

            {/* Social */}
            <TabsContent value="social" className="mt-6">
              <Card>
                <Field icon={Instagram} label="Instagram URL">
                  <Input value={form.instagram_url} onChange={(e) => update("instagram_url", e.target.value)} />
                </Field>
                <Field icon={Twitter} label="Twitter / X URL">
                  <Input value={form.twitter_url} onChange={(e) => update("twitter_url", e.target.value)} />
                </Field>
                <Field icon={Facebook} label="Facebook URL">
                  <Input value={form.facebook_url} onChange={(e) => update("facebook_url", e.target.value)} />
                </Field>
                <Field icon={Youtube} label="YouTube URL">
                  <Input value={form.youtube_url} onChange={(e) => update("youtube_url", e.target.value)} />
                </Field>
              </Card>
            </TabsContent>

            {/* Page editors */}
            {PAGES.map((p) => {
              const titleKey = `${p.key}_title` as keyof SiteSettings;
              const descKey = `${p.key}_description` as keyof SiteSettings;
              const contentKey = `${p.key}_content` as keyof SiteSettings;
              return (
                <TabsContent key={p.key} value={p.key} className="mt-6">
                  <Card>
                    <div className="text-xs text-muted-foreground mb-2 rounded-lg bg-muted/50 p-3 leading-relaxed">
                      <strong className="text-foreground">Tip:</strong> Separate sections with a blank line.
                      The first line of each section becomes the heading; the rest is the paragraph.
                    </div>
                    <Field label="Page Title">
                      <Input
                        value={form[titleKey] as string}
                        onChange={(e) => update(titleKey, e.target.value)}
                      />
                    </Field>
                    <Field label="Short Description (shown under the title)">
                      <Textarea
                        rows={2}
                        value={form[descKey] as string}
                        onChange={(e) => update(descKey, e.target.value)}
                      />
                    </Field>
                    <Field label="Page Content">
                      <Textarea
                        rows={18}
                        className="font-mono text-sm"
                        value={form[contentKey] as string}
                        onChange={(e) => update(contentKey, e.target.value)}
                      />
                    </Field>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>

          <div className="sticky bottom-4 z-20 flex justify-end">
            <Button type="submit" disabled={saving} size="lg" className="shadow-lg">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save all changes
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5">{children}</div>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon?: any;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="flex items-center gap-2 mb-1.5">
        {Icon && <Icon className="h-4 w-4 text-primary" />} {label}
      </Label>
      {children}
    </div>
  );
}