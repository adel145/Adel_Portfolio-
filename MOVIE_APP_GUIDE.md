# Movie App Guide

## What Was Built

The Movie App in `src/components/MyWorld/MovieApp.jsx` is now a static, client-side Netflix-style portfolio demo with:

- Demo login
- Movies and series categories
- Search
- Watchlist/favorites
- Continue Watching progress
- Movie details
- Series details with seasons and episodes
- Native HTML5 video playback
- Temporary Google Drive iframe playback
- Safe missing-video messaging

It does not use a backend, Express, MongoDB, secrets, scraping, torrents, or illegal streaming sources.

## Demo Login Credentials

Demo credentials are configured in the Movie App code for portfolio testing.

Warning: frontend-only login is not real secure authentication. Use real backend authentication before handling private accounts, paid content, or sensitive user data.

## Where To Edit Movies

Edit movie entries in:

`src/components/MyWorld/movieLibraryData.js`

Movie objects use:

- `id`
- `type: "movie"`
- `title`
- `year`
- `genres`
- `poster`
- `backdrop`
- `rating`
- `duration`
- `description`
- `videoType`
- `videoUrl`
- `embedUrl`
- `trailerUrl`
- `featured`

## Where To Edit Series And Episodes

Edit series entries in:

`src/components/MyWorld/movieLibraryData.js`

Series objects use:

- `id`
- `type: "series"`
- `title`
- `year`
- `genres`
- `poster`
- `backdrop`
- `rating`
- `description`
- `seasons`

Each season contains `episodes`, and each episode contains:

- `id`
- `title`
- `episodeNumber`
- `duration`
- `description`
- `thumbnail`
- `videoType`
- `videoUrl`
- `embedUrl`

## Where To Paste Legal Video URLs

Paste only legal hosted video URLs in `videoUrl` or legal embed URLs in `embedUrl` fields inside:

`src/components/MyWorld/movieLibraryData.js`

Look for this comment:

```js
// Replace this with your legal hosted video URL.
```

For direct MP4 files, use:

```js
videoType: "html5",
videoUrl: "https://example.com/video.mp4",
```

For iframe embeds, use:

```js
videoType: "iframe",
embedUrl: "https://drive.google.com/file/d/FILE_ID/preview",
```

The current demo uses a public MDN CC0 sample video for a few entries so the HTML5 player and progress tracking can be tested. Some entries use `VIDEO_URL_PLACEHOLDER`, which intentionally shows this message in the player:

`Video source is not configured yet. Add a legal video URL or embed URL in the movie library data file.`

Important: do not commit private or copyrighted video URLs to this public repository.

## Using Google Drive videos temporarily

1. Upload MP4 to Google Drive.
2. Share file as Anyone with the link / Viewer.
3. Copy the link.
4. Convert:

```text
https://drive.google.com/file/d/FILE_ID/view?usp=sharing
```

to:

```text
https://drive.google.com/file/d/FILE_ID/preview
```

5. Paste it as `embedUrl`.
6. Use `videoType: "iframe"`.
7. Warning: Google Drive iframe videos are not truly private in a public GitHub Pages app.
8. Note: progress tracking is limited for iframe videos.

## localStorage Keys

Storage is managed in:

`src/components/MyWorld/movieAppStorage.js`

The keys are:

- `movieApp.auth.v1`
- `movieApp.watchlist.v1`
- `movieApp.progress.v1`

Logout clears only `movieApp.auth.v1`. Watchlist and progress remain per username.

## How To Run Locally

```bash
npm install
npm run dev
```

Then open the local Vite URL and navigate to `#/movie-app` or open My World and choose Movie App.

## How To Build

```bash
npm run build
```

The app remains compatible with GitHub Pages because it is static/client-side and still uses the existing Vite base path and `HashRouter`.

## Important Legal Warning

Do not commit private, paid, unauthorized, or copyrighted movie/series video URLs to this public repository. Only use videos you own, have licensed, or have permission to host and display.

## Recommended Future Upgrade Path

1. Host legal videos on Bunny Stream or Cloudflare R2.
2. Add real backend/auth only if moving away from pure GitHub Pages.
3. Optionally add TMDB metadata integration later for posters, descriptions, and search. TMDB is for metadata, not for playing movie files.
