import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { movieLibrary, VIDEO_URL_PLACEHOLDER } from "./movieLibraryData";
import {
  clearAuthSession,
  getAuthSession,
  getUserProgress,
  getUserWatchlist,
  saveUserProgressItem,
  signInDemoUser,
  toggleUserWatchlistItem,
} from "./movieAppStorage";

const tabs = [
  { id: "all", label: "All" },
  { id: "movie", label: "Movies" },
  { id: "series", label: "Series" },
  { id: "watchlist", label: "Watchlist" },
  { id: "continue", label: "Continue Watching" },
];

const isConfiguredVideoUrl = (videoUrl) =>
  typeof videoUrl === "string" &&
  /^https?:\/\//i.test(videoUrl.trim()) &&
  videoUrl !== VIDEO_URL_PLACEHOLDER;

const isConfiguredEmbedUrl = (embedUrl) =>
  typeof embedUrl === "string" && /^https?:\/\//i.test(embedUrl.trim());

const getVideoType = (target) => target.videoType || "html5";

const getMovieProgressKey = (movieId) => `movie:${movieId}`;

const getEpisodeProgressKey = (seriesId, seasonNumber, episodeId) =>
  `episode:${seriesId}:s${seasonNumber}:${episodeId}`;

const getProgressPercent = (progressItem) => {
  if (!progressItem?.durationSeconds) return 0;
  return Math.min(
    100,
    Math.round((progressItem.currentTime / progressItem.durationSeconds) * 100)
  );
};

const matchesSearch = (item, query) => {
  if (!query) return true;
  const normalized = query.toLowerCase();
  const searchable = [
    item.title,
    item.description,
    item.year,
    ...(item.genres || []),
    ...(item.seasons || []).flatMap((season) =>
      season.episodes.flatMap((episode) => [
        episode.title,
        episode.description,
        `season ${season.seasonNumber}`,
        `episode ${episode.episodeNumber}`,
      ])
    ),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchable.includes(normalized);
};

const ImagePanel = ({ src, alt, className, children }) => {
  const [failed, setFailed] = useState(!src);

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#22144a] via-[#151030] to-black ${className}`}
    >
      {!failed && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
      {children}
    </div>
  );
};

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = signInDemoUser(username, password);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setError("");
    onLogin(result.session);
  };

  return (
    <main className="min-h-screen bg-[#050507] px-4 pt-28 text-white sm:pt-32">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="min-w-0"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-400">
            My World Demo
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-white sm:text-6xl">
            Movie App
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            A static, portfolio-safe streaming library interface with demo
            login, watchlists, series episodes, and legal HTML5 video playback
            placeholders.
          </p>
          <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 text-sm text-slate-300 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              Movies
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              Series
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              Local progress
            </div>
          </div>
        </motion.section>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="rounded-xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-red-950/30 backdrop-blur sm:p-7"
        >
          <h2 className="text-2xl font-bold">Sign in</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Frontend-only demo authentication for this portfolio project.
          </p>

          <label className="mt-6 block text-sm font-semibold text-slate-200">
            Username
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-red-400"
              autoComplete="username"
              placeholder="Enter username"
            />
          </label>

          <label className="mt-4 block text-sm font-semibold text-slate-200">
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-red-400"
              autoComplete="current-password"
              type="password"
              placeholder="Enter password"
            />
          </label>

          {error && (
            <p className="mt-4 rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Enter Movie App
          </button>
        </motion.form>
      </div>
    </main>
  );
};

const ContentCard = ({ item, progressItem, isSaved, onDetails, onPlay, onToggle }) => {
  const progressPercent = getProgressPercent(progressItem);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="group min-w-0 overflow-hidden rounded-lg border border-white/10 bg-[#131016] shadow-lg shadow-black/30 transition hover:-translate-y-1 hover:border-red-400/60"
    >
      <button
        type="button"
        onClick={onDetails}
        className="block w-full text-left"
        aria-label={`Open details for ${item.title}`}
      >
        <ImagePanel
          src={item.poster}
          alt={item.title}
          className="aspect-[2/3] w-full"
        >
          <div className="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {item.type}
          </div>
          {progressPercent > 0 && (
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-white/20">
              <div
                className="h-full bg-red-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}
        </ImagePanel>
      </button>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold text-white">
              {item.title}
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              {item.year} | {item.rating} | {item.genres.join(", ")}
            </p>
          </div>
          <button
            type="button"
            onClick={onToggle}
            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold transition ${
              isSaved
                ? "border-red-400 bg-red-500 text-white"
                : "border-white/15 bg-white/5 text-slate-200 hover:border-red-400"
            }`}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">
          {item.description}
        </p>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onPlay}
            className="flex-1 rounded-md bg-white px-3 py-2 text-sm font-bold text-black transition hover:bg-red-100"
          >
            Play
          </button>
          <button
            type="button"
            onClick={onDetails}
            className="flex-1 rounded-md border border-white/15 px-3 py-2 text-sm font-bold text-white transition hover:border-white/40"
          >
            Details
          </button>
        </div>
      </div>
    </motion.article>
  );
};

const ContinueCard = ({ progressItem, onResume, onDetails }) => {
  const progressPercent = getProgressPercent(progressItem);

  return (
    <article className="overflow-hidden rounded-lg border border-white/10 bg-[#131016]">
      <ImagePanel
        src={progressItem.backdrop || progressItem.poster}
        alt={progressItem.title}
        className="aspect-video w-full"
      >
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-white/20">
          <div
            className="h-full bg-red-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </ImagePanel>
      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
          {progressPercent}% watched
        </p>
        <h3 className="mt-2 text-lg font-bold text-white">
          {progressItem.title}
        </h3>
        <p className="mt-1 text-sm text-slate-400">{progressItem.subtitle}</p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onResume}
            className="flex-1 rounded-md bg-red-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-red-500"
          >
            Resume
          </button>
          <button
            type="button"
            onClick={onDetails}
            className="flex-1 rounded-md border border-white/15 px-3 py-2 text-sm font-bold text-white transition hover:border-white/40"
          >
            Details
          </button>
        </div>
      </div>
    </article>
  );
};

const DashboardHero = ({ featured, onPlay, onDetails, isSaved, onToggle }) => (
  <section className="relative overflow-hidden rounded-none border-y border-white/10 bg-black md:rounded-xl md:border">
    <ImagePanel
      src={featured.backdrop}
      alt={featured.title}
      className="min-h-[430px] w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />
      <div className="relative z-10 flex min-h-[430px] max-w-3xl flex-col justify-end px-4 py-8 sm:px-8 lg:px-10">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-red-400">
          Featured {featured.type}
        </p>
        <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-6xl">
          {featured.title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
          {featured.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-200">
          <span>{featured.year}</span>
          <span>{featured.rating}</span>
          <span>{featured.genres.join(" | ")}</span>
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onPlay}
            className="rounded-md bg-white px-6 py-3 font-black text-black transition hover:bg-red-100"
          >
            Play
          </button>
          <button
            type="button"
            onClick={onDetails}
            className="rounded-md bg-white/15 px-6 py-3 font-bold text-white backdrop-blur transition hover:bg-white/25"
          >
            More Info
          </button>
          <button
            type="button"
            onClick={onToggle}
            className="rounded-md border border-white/20 px-6 py-3 font-bold text-white transition hover:border-red-300"
          >
            {isSaved ? "Remove From Watchlist" : "Add To Watchlist"}
          </button>
        </div>
      </div>
    </ImagePanel>
  </section>
);

const DetailsModal = ({
  item,
  isSaved,
  onClose,
  onPlay,
  onEpisodePlay,
  onToggle,
}) => {
  const [activeSeason, setActiveSeason] = useState(
    item.type === "series" ? item.seasons[0]?.seasonNumber : null
  );
  const selectedSeason =
    item.type === "series"
      ? item.seasons.find((season) => season.seasonNumber === activeSeason)
      : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 px-4 py-6 backdrop-blur">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0f] shadow-2xl">
        <ImagePanel src={item.backdrop} alt={item.title} className="min-h-[300px]">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 rounded-full bg-black/70 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-600"
          >
            Close
          </button>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-black/65 to-black/20" />
          <div className="relative z-10 flex min-h-[300px] flex-col justify-end p-5 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
              {item.type}
            </p>
            <h2 className="mt-2 text-3xl font-black text-white sm:text-5xl">
              {item.title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
              {item.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-300">
              <span>{item.year}</span>
              <span>{item.rating}</span>
              {item.duration && <span>{item.duration}</span>}
              <span>{item.genres.join(" | ")}</span>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onPlay}
                className="rounded-md bg-white px-6 py-3 font-black text-black transition hover:bg-red-100"
              >
                Play
              </button>
              <button
                type="button"
                onClick={onToggle}
                className="rounded-md border border-white/20 px-6 py-3 font-bold text-white transition hover:border-red-300"
              >
                {isSaved ? "Remove From Watchlist" : "Add To Watchlist"}
              </button>
            </div>
          </div>
        </ImagePanel>

        {item.type === "series" && (
          <div className="p-5 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              {item.seasons.map((season) => (
                <button
                  key={season.seasonNumber}
                  type="button"
                  onClick={() => setActiveSeason(season.seasonNumber)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    activeSeason === season.seasonNumber
                      ? "bg-red-600 text-white"
                      : "bg-white/10 text-slate-200 hover:bg-white/15"
                  }`}
                >
                  {season.title}
                </button>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              {selectedSeason?.episodes.map((episode) => (
                <article
                  key={episode.id}
                  className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-3 sm:grid-cols-[170px_1fr_auto] sm:items-center"
                >
                  <ImagePanel
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="aspect-video rounded-md"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
                      Episode {episode.episodeNumber} | {episode.duration}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-white">
                      {episode.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {episode.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onEpisodePlay(selectedSeason, episode)}
                    className="rounded-md bg-white px-5 py-2 font-bold text-black transition hover:bg-red-100"
                  >
                    Play
                  </button>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PlayerModal = ({ target, username, onClose, onProgressSaved }) => {
  const videoType = getVideoType(target);
  const configured =
    videoType === "iframe"
      ? isConfiguredEmbedUrl(target.embedUrl)
      : isConfiguredVideoUrl(target.videoUrl);

  const handleLoadedMetadata = (event) => {
    if (target.resumeTime > 0) {
      event.currentTarget.currentTime = target.resumeTime;
    }
  };

  const handleTimeUpdate = (event) => {
    const video = event.currentTarget;
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;

    const progressItem = {
      progressKey: target.progressKey,
      type: target.type,
      contentId: target.contentId,
      seriesId: target.seriesId,
      seasonNumber: target.seasonNumber,
      episodeId: target.episodeId,
      title: target.title,
      subtitle: target.subtitle,
      poster: target.poster,
      backdrop: target.backdrop,
      videoUrl: target.videoUrl,
      currentTime: Math.floor(video.currentTime),
      durationSeconds: Math.floor(video.duration),
    };

    saveUserProgressItem(username, progressItem);
    onProgressSaved();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 px-4 py-6 backdrop-blur">
      <div className="w-full max-w-5xl rounded-xl border border-white/10 bg-[#09090c] p-4 shadow-2xl sm:p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
              Now Playing
            </p>
            <h2 className="truncate text-xl font-black text-white sm:text-2xl">
              {target.title}
            </h2>
            <p className="mt-1 text-sm text-slate-400">{target.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-600"
          >
            Close
          </button>
        </div>

        {configured && videoType === "iframe" ? (
          <>
            <iframe
              className="aspect-video w-full rounded-lg bg-black"
              src={target.embedUrl}
              title={target.title}
              allow="fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
            <p className="mt-3 text-sm text-slate-400">
              Progress tracking is limited for embedded players.
            </p>
          </>
        ) : configured ? (
          <video
            className="aspect-video w-full rounded-lg bg-black"
            controls
            playsInline
            src={target.videoUrl}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
          >
            Your browser does not support the HTML5 video element.
          </video>
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-white/10 bg-black px-6 text-center">
            <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Video source is not configured yet. Add a legal video URL or
              embed URL in the movie library data file.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const MovieApp = () => {
  const [session, setSession] = useState(() => getAuthSession());
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [playerTarget, setPlayerTarget] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [progress, setProgress] = useState({});

  const username = session?.username;
  const featured = movieLibrary.find((item) => item.featured) || movieLibrary[0];

  useEffect(() => {
    if (!username) return;
    setWatchlist(getUserWatchlist(username));
    setProgress(getUserProgress(username));
  }, [username]);

  const refreshProgress = () => {
    if (username) {
      setProgress(getUserProgress(username));
    }
  };

  const handleLogout = () => {
    clearAuthSession();
    setSession(null);
    setWatchlist([]);
    setProgress({});
    setSelectedItem(null);
    setPlayerTarget(null);
  };

  const toggleWatchlist = (contentId) => {
    if (!username) return;
    setWatchlist(toggleUserWatchlistItem(username, contentId));
  };

  const getItemProgress = (item) => {
    if (item.type === "movie") return progress[getMovieProgressKey(item.id)];

    const episodeProgress = Object.values(progress)
      .filter((entry) => entry.seriesId === item.id)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return episodeProgress[0];
  };

  const makeMovieTarget = (movie, resumeProgress = null) => ({
    progressKey: getMovieProgressKey(movie.id),
    type: "movie",
    contentId: movie.id,
    title: movie.title,
    subtitle: `${movie.year} | ${movie.duration}`,
    poster: movie.poster,
    backdrop: movie.backdrop,
    videoUrl: movie.videoUrl,
    embedUrl: movie.embedUrl,
    videoType: movie.videoType || "html5",
    resumeTime: resumeProgress?.currentTime || 0,
  });

  const makeEpisodeTarget = (
    series,
    season,
    episode,
    resumeProgress = null
  ) => ({
    progressKey: getEpisodeProgressKey(
      series.id,
      season.seasonNumber,
      episode.id
    ),
    type: "episode",
    contentId: episode.id,
    seriesId: series.id,
    seasonNumber: season.seasonNumber,
    episodeId: episode.id,
    title: series.title,
    subtitle: `S${season.seasonNumber}:E${episode.episodeNumber} | ${episode.title}`,
    poster: series.poster,
    backdrop: episode.thumbnail || series.backdrop,
    videoUrl: episode.videoUrl,
    embedUrl: episode.embedUrl,
    videoType: episode.videoType || "html5",
    resumeTime: resumeProgress?.currentTime || 0,
  });

  const playItem = (item) => {
    if (item.type === "movie") {
      setPlayerTarget(makeMovieTarget(item, progress[getMovieProgressKey(item.id)]));
      return;
    }

    const firstSeason = item.seasons[0];
    const firstEpisode = firstSeason?.episodes[0];
    if (firstSeason && firstEpisode) {
      const key = getEpisodeProgressKey(item.id, firstSeason.seasonNumber, firstEpisode.id);
      setPlayerTarget(makeEpisodeTarget(item, firstSeason, firstEpisode, progress[key]));
    }
  };

  const continueItems = useMemo(
    () =>
      Object.values(progress)
        .filter((entry) => entry.currentTime > 0)
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)),
    [progress]
  );

  const visibleItems = useMemo(() => {
    const query = searchQuery.trim();

    if (activeTab === "continue") {
      return continueItems.filter((entry) =>
        [entry.title, entry.subtitle].join(" ").toLowerCase().includes(query.toLowerCase())
      );
    }

    return movieLibrary.filter((item) => {
      const tabMatch =
        activeTab === "all" ||
        item.type === activeTab ||
        (activeTab === "watchlist" && watchlist.includes(item.id));

      return tabMatch && matchesSearch(item, query);
    });
  }, [activeTab, continueItems, searchQuery, watchlist]);

  const openProgressTarget = (progressItem) => {
    const item = movieLibrary.find(
      (content) => content.id === (progressItem.seriesId || progressItem.contentId)
    );
    if (!item) return;

    if (progressItem.type === "movie") {
      setPlayerTarget(makeMovieTarget(item, progressItem));
      return;
    }

    const season = item.seasons.find(
      (candidate) => candidate.seasonNumber === progressItem.seasonNumber
    );
    const episode = season?.episodes.find(
      (candidate) => candidate.id === progressItem.episodeId
    );

    if (season && episode) {
      setPlayerTarget(makeEpisodeTarget(item, season, episode, progressItem));
    }
  };

  const openProgressDetails = (progressItem) => {
    const item = movieLibrary.find(
      (content) => content.id === (progressItem.seriesId || progressItem.contentId)
    );
    if (item) setSelectedItem(item);
  };

  if (!session) {
    return <LoginScreen onLogin={setSession} />;
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050507] pb-14 pt-24 text-white sm:pt-28">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-400">
              Movie App
            </p>
            <h1 className="mt-2 text-3xl font-black text-white sm:text-5xl">
              Welcome, {username}
            </h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:border-red-300 hover:bg-white/10"
          >
            Logout
          </button>
        </div>

        <DashboardHero
          featured={featured}
          onPlay={() => playItem(featured)}
          onDetails={() => setSelectedItem(featured)}
          isSaved={watchlist.includes(featured.id)}
          onToggle={() => toggleWatchlist(featured.id)}
        />

        <div className="sticky top-0 z-20 mt-6 rounded-xl border border-white/10 bg-[#050507]/90 p-3 backdrop-blur">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                    activeTab === tab.id
                      ? "bg-red-600 text-white"
                      : "bg-white/10 text-slate-200 hover:bg-white/15"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <label className="w-full lg:max-w-sm">
              <span className="sr-only">Search movies and series</span>
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search title, genre, description, episode..."
                className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-red-400"
              />
            </label>
          </div>
        </div>

        <section className="mt-8">
          {activeTab === "continue" ? (
            visibleItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visibleItems.map((entry) => (
                  <ContinueCard
                    key={entry.progressKey}
                    progressItem={entry}
                    onResume={() => openProgressTarget(entry)}
                    onDetails={() => openProgressDetails(entry)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="Nothing in continue watching yet"
                text="Play a configured demo video and your progress will appear here."
              />
            )
          ) : visibleItems.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
              {visibleItems.map((item) => (
                <ContentCard
                  key={item.id}
                  item={item}
                  progressItem={getItemProgress(item)}
                  isSaved={watchlist.includes(item.id)}
                  onDetails={() => setSelectedItem(item)}
                  onPlay={() => playItem(item)}
                  onToggle={() => toggleWatchlist(item.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title={
                activeTab === "watchlist"
                  ? "Your watchlist is empty"
                  : "No search results"
              }
              text={
                activeTab === "watchlist"
                  ? "Save a movie or series to see it here after refresh."
                  : "Try another title, genre, description, or episode name."
              }
            />
          )}
        </section>
      </section>

      {selectedItem && (
        <DetailsModal
          item={selectedItem}
          isSaved={watchlist.includes(selectedItem.id)}
          onClose={() => setSelectedItem(null)}
          onPlay={() => playItem(selectedItem)}
          onEpisodePlay={(season, episode) => {
            const key = getEpisodeProgressKey(selectedItem.id, season.seasonNumber, episode.id);
            setPlayerTarget(makeEpisodeTarget(selectedItem, season, episode, progress[key]));
          }}
          onToggle={() => toggleWatchlist(selectedItem.id)}
        />
      )}

      {playerTarget && (
        <PlayerModal
          target={playerTarget}
          username={username}
          onClose={() => setPlayerTarget(null)}
          onProgressSaved={refreshProgress}
        />
      )}
    </main>
  );
};

const EmptyState = ({ title, text }) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-14 text-center">
    <h2 className="text-2xl font-black text-white">{title}</h2>
    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400">
      {text}
    </p>
  </div>
);

export default MovieApp;
