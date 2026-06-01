import { Link } from "@tanstack/react-router";
import { Flame, Instagram, Twitter, Facebook, Youtube, Mail, Phone } from "lucide-react";
import { useSiteSettings, SITE_SETTINGS_DEFAULTS } from "@/hooks/useSiteSettings";
import badgeAppstore from "@/assets/badge-appstore.png";
import badgePlaystore from "@/assets/badge-playstore.png";
import badgeIndus from "@/assets/badge-indus.png";

export function SiteFooter() {
  const { data: settings = SITE_SETTINGS_DEFAULTS } = useSiteSettings();
  const downloadHref = settings.download_url || "#";
  const downloads = [
    { src: badgeAppstore, alt: "Download on the App Store", href: downloadHref },
    { src: badgePlaystore, alt: "Get it on Google Play", href: downloadHref },
    { src: badgeIndus, alt: "Available on Indus Appstore", href: downloadHref },
  ];
  const socials = [
    { Icon: Instagram, href: settings.instagram_url },
    { Icon: Twitter, href: settings.twitter_url },
    { Icon: Facebook, href: settings.facebook_url },
    { Icon: Youtube, href: settings.youtube_url },
  ];
  return (
    <footer className="bg-secondary text-secondary-foreground mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Flame className="h-5 w-5" />
              </span>
              {settings.site_name}
            </Link>
            <p className="text-sm text-secondary-foreground/70 leading-relaxed">
              {settings.site_tagline}
            </p>
            <div className="flex gap-3 mt-5">
              {socials.map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-primary hover:scale-110 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/community-guidelines" className="hover:text-primary transition-colors">Community</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/community-guidelines" className="hover:text-primary transition-colors">Guidelines</Link></li>
              <li><Link to="/earning-policy" className="hover:text-primary transition-colors">Earning Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Get in touch</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> {settings.contact_email}</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {settings.contact_phone}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <h4 className="text-center font-semibold mb-5 text-sm uppercase tracking-wider">Download the app</h4>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {downloads.map((d) => (
              <a
                key={d.alt}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={d.alt}
                className="block transition-transform hover:scale-105"
              >
                <img
                  src={d.src}
                  alt={d.alt}
                  loading="lazy"
                  className="h-12 sm:h-14 w-auto rounded-lg"
                />
              </a>
            ))}
          </div>
          <p className="text-center text-sm text-secondary-foreground/60 mt-8">
            © {new Date().getFullYear()} {settings.site_name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}