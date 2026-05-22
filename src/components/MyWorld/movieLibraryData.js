// Replace this with your legal hosted video URL.
// This public MDN CC0 sample is only here so the portfolio demo can show
// native HTML5 progress tracking without using copyrighted movie content.
export const DEMO_LEGAL_VIDEO_URL =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

// Replace this with your legal hosted video URL.
export const VIDEO_URL_PLACEHOLDER = "REPLACE_WITH_YOUR_LEGAL_HOSTED_VIDEO_URL";

// Temporary Google Drive embed support:
// 1. Share the file as "Anyone with the link" / Viewer.
// 2. Convert Google Drive file links from /view to /preview before pasting.
// Example:
// https://drive.google.com/file/d/FILE_ID/view?usp=sharing
// becomes:
// https://drive.google.com/file/d/FILE_ID/preview
export const GOOGLE_DRIVE_EMBED_PLACEHOLDER =
  "https://drive.google.com/file/d/FILE_ID/preview";

export const movieLibrary = [
  {
    id: "movie-neon-drift",
    type: "movie",
    title: "Neon Drift",
    year: 2026,
    genres: ["Sci-Fi", "Action", "Cyberpunk"],
    poster:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=700&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=80",
    rating: "8.7",
    duration: "1h 58m",
    description:
      "A courier in a glowing megacity discovers a memory chip that can rewrite the future of an entire district.",
    videoType: "html5",
    videoUrl: DEMO_LEGAL_VIDEO_URL,
    trailerUrl: VIDEO_URL_PLACEHOLDER,
    featured: true,
  },
  {
    id: "movie-silent-orbit",
    type: "movie",
    title: "HOW I MET YOUR MOTHER",
    year: 2005,
    genres: ["Drama", "Space", "Mystery"],
    poster:
      "https://drive.google.com/file/d/1Hdw3ByeEHakDiyAdrVbEenaFwN2QA2U6/preview",
    backdrop:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    rating: "8.2",
    duration: "2h 06m",
    description:
      "When a research station loses contact with Earth, its final engineer must decide whether an impossible signal is a rescue or a warning.",
    videoType: "iframe",
    embedUrl: "https://drive.google.com/file/d/15O5fxAmBvbe5qFazNlVWjv8vYeFlW0zU/preview",
    trailerUrl: VIDEO_URL_PLACEHOLDER,
  },
  {
    id: "movie-after-midnight",
    type: "movie",
    title: "After Midnight",
    year: 2024,
    genres: ["Thriller", "Noir"],
    poster:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1600&q=80",
    rating: "7.9",
    duration: "1h 44m",
    description:
      "A late-night radio host follows a caller's clues through rain-soaked streets and uncovers the city story nobody wanted aired.",
    videoType: "html5",
    videoUrl: DEMO_LEGAL_VIDEO_URL,
    trailerUrl: VIDEO_URL_PLACEHOLDER,
  },
  {
    id: "series-code-red",
    type: "series",
    title: "Code Red",
    year: 2026,
    genres: ["Tech", "Drama", "Suspense"],
    poster:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80",
    rating: "8.9",
    description:
      "A junior incident response team races through outages, leaks, and impossible deadlines while learning what real ownership costs.",
    featured: true,
    seasons: [
      {
        seasonNumber: 1,
        title: "Season 1",
        episodes: [
          {
            id: "code-red-s1e1",
            title: "The Alert",
            episodeNumber: 1,
            duration: "42m",
            description:
              "A quiet release night turns chaotic when a payment outage lights up every dashboard in the room.",
            thumbnail:
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
            videoType: "html5",
            videoUrl: DEMO_LEGAL_VIDEO_URL,
          },
          {
            id: "code-red-s1e2",
            title: "False Positive",
            episodeNumber: 2,
            duration: "22m",
            description:
              "The team chases a security alert that looks harmless until one missing log line changes the whole investigation.",
            thumbnail:
              "https://drive.google.com/file/d/1Hdw3ByeEHakDiyAdrVbEenaFwN2QA2U6/preview",
            videoType: "iframe",
            embedUrl: "https://www.youtube.com/embed/GurKy5XX5S8",
          },
        ],
        
      },
      {
        seasonNumber: 2,
        title: "Season 2",
        episodes: [
          {
            id: "code-red-s2e1",
            title: "Rollback",
            episodeNumber: 1,
            duration: "44m",
            description:
              "A clean rollback fixes the app but exposes a deeper product decision that nobody documented.",
            thumbnail:
              "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
            videoType: "html5",
            videoUrl: DEMO_LEGAL_VIDEO_URL,
          },
        ],
      },
    ],
  },
  {
    id: "series-desert-lights",
    type: "series",
    title: "Desert Lights",
    year: 2025,
    genres: ["Adventure", "Mystery"],
    poster:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
    rating: "8.1",
    description:
      "Two siblings map strange lights across the desert and find a hidden observatory with records older than the town itself.",
    seasons: [
      {
        seasonNumber: 1,
        title: "Season 1",
        episodes: [
          {
            id: "desert-lights-s1e1",
            title: "Coordinates",
            episodeNumber: 1,
            duration: "36m",
            description:
              "A broken compass leads the siblings to a signal tower that should not exist.",
            thumbnail:
              "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
            videoType: "html5",
            videoUrl: VIDEO_URL_PLACEHOLDER,
          },
          {
            id: "desert-lights-s1e2",
            title: "The Glass Map",
            episodeNumber: 2,
            duration: "41m",
            description:
              "A handmade star map reveals that the lights are moving in a pattern.",
            thumbnail:
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
            videoType: "html5",
            videoUrl: DEMO_LEGAL_VIDEO_URL,
          },
        ],
      },
    ],
  },
];
