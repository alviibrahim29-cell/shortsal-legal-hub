import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flame, LogOut, Save, Loader2, Mail, Phone, Instagram, Twitter, Facebook, Youtube, ShieldCheck } from "lucide-react";
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

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase
        .from("site_settings")
        .update({
          contact_email: form.contact_email,
          contact_phone: form.contact_phone,
          instagram_url: form.instagram_url,
          twitter_url: form.twitter_url,
          facebook_url: form.facebook_url,
          youtube_url: form.youtube_url,
        })
        .eq("id", form.id);
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

  const fields: { key: keyof SiteSettings; label: string; icon: any; type?: string; placeholder?: string }[] = [
    { key: "contact_email", label: "Contact Email", icon: Mail, type: "email" },
    { key: "contact_phone", label: "Contact Phone", icon: Phone, type: "tel" },
    { key: "instagram_url", label: "Instagram URL", icon: Instagram, placeholder: "https://instagram.com/..." },
    { key: "twitter_url", label: "Twitter / X URL", icon: Twitter, placeholder: "https://twitter.com/..." },
    { key: "facebook_url", label: "Facebook URL", icon: Facebook, placeholder: "https://facebook.com/..." },
    { key: "youtube_url", label: "YouTube URL", icon: Youtube, placeholder: "https://youtube.com/..." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Flame className="h-4 w-4" />
            </span>
            SHORTSAL
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

      <main className="container mx-auto px-4 py-10 max-w-3xl">
        <div className="flex items-center gap-2 text-primary mb-2">
          <ShieldCheck className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Admin Panel</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Site Settings</h1>
        <p className="text-muted-foreground mb-8">
          Update the contact information and social media links shown across the entire site.
        </p>

        <form onSubmit={save} className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5">
          {fields.map(({ key, label, icon: Icon, type, placeholder }) => (
            <div key={key}>
              <Label htmlFor={key} className="flex items-center gap-2 mb-1.5">
                <Icon className="h-4 w-4 text-primary" /> {label}
              </Label>
              <Input
                id={key}
                type={type ?? "url"}
                value={form[key] as string}
                placeholder={placeholder}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            </div>
          ))}

          <div className="pt-2 flex justify-end">
            <Button type="submit" disabled={saving} size="lg">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save changes
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}