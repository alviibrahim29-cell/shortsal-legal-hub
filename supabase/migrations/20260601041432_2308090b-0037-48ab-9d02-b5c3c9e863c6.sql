ALTER TABLE public.site_settings
ADD COLUMN IF NOT EXISTS download_url TEXT NOT NULL DEFAULT 'https://apkfab.com/shortsal/co.median.android.bnelkde/apk?h=bbfd1cf29a769942ad8a9e7af7f2f939e8efd0fe54e2f089603af62188474aab';

UPDATE public.site_settings
SET download_url = 'https://apkfab.com/shortsal/co.median.android.bnelkde/apk?h=bbfd1cf29a769942ad8a9e7af7f2f939e8efd0fe54e2f089603af62188474aab'
WHERE download_url IS NULL OR download_url = '';