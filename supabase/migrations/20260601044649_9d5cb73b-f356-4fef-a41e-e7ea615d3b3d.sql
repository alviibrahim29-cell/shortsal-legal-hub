
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS header_cta_label text NOT NULL DEFAULT 'Download',
  ADD COLUMN IF NOT EXISTS hero_badge text NOT NULL DEFAULT 'Welcome to the future of short video',
  ADD COLUMN IF NOT EXISTS hero_title text NOT NULL DEFAULT 'Create. Watch. Go Viral.',
  ADD COLUMN IF NOT EXISTS hero_subtitle text NOT NULL DEFAULT 'SHORTSAL is the ultimate short video platform where creativity meets community. Upload, discover, and share moments that matter.',
  ADD COLUMN IF NOT EXISTS hero_primary_cta_label text NOT NULL DEFAULT 'Download App',
  ADD COLUMN IF NOT EXISTS hero_secondary_cta_label text NOT NULL DEFAULT 'Explore',
  ADD COLUMN IF NOT EXISTS hero_secondary_cta_url text NOT NULL DEFAULT '/about',
  ADD COLUMN IF NOT EXISTS cta_section_title text NOT NULL DEFAULT 'Ready to start creating?',
  ADD COLUMN IF NOT EXISTS cta_section_subtitle text NOT NULL DEFAULT 'Download SHORTSAL now and share your story with the world.',
  ADD COLUMN IF NOT EXISTS footer_copyright text NOT NULL DEFAULT '';
