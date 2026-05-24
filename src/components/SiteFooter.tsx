import { Link } from "@tanstack/react-router";
import { Flame, Instagram, Twitter, Facebook, Youtube, Mail, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Flame className="h-5 w-5" />
              </span>
              SHORTSAL
            </Link>
            <p className="text-sm text-secondary-foreground/70 leading-relaxed">
              The next-generation short video platform for creators worldwide.
            </p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
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
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Get in touch</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> SHORTSAL@gmail.com</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> 827997****</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-secondary-foreground/60">
          <p>© {new Date().getFullYear()} SHORTSAL. All rights reserved.</p>
          <p>Made with passion for creators.</p>
        </div>
      </div>
    </footer>
  );
}