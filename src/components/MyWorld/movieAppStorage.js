const AUTH_KEY = "movieApp.auth.v1";
const WATCHLIST_KEY = "movieApp.watchlist.v1";
const PROGRESS_KEY = "movieApp.progress.v1";

const demoUsers = {
  adel145: "123456",
  yara267: "654321",
};

const readJson = (key, fallback) => {
  if (typeof window === "undefined") return fallback;

  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const storageKeys = {
  auth: AUTH_KEY,
  watchlist: WATCHLIST_KEY,
  progress: PROGRESS_KEY,
};

export const signInDemoUser = (username, password) => {
  const normalizedUsername = username.trim();
  const isValid = demoUsers[normalizedUsername] === password;

  if (!isValid) {
    return { ok: false, message: "Invalid username or password." };
  }

  const session = {
    username: normalizedUsername,
    loggedInAt: new Date().toISOString(),
  };

  writeJson(AUTH_KEY, session);
  return { ok: true, session };
};

export const getAuthSession = () => readJson(AUTH_KEY, null);

export const clearAuthSession = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_KEY);
};

export const getUserWatchlist = (username) => {
  const allWatchlists = readJson(WATCHLIST_KEY, {});
  return allWatchlists[username] || [];
};

export const setUserWatchlist = (username, watchlistIds) => {
  const allWatchlists = readJson(WATCHLIST_KEY, {});
  writeJson(WATCHLIST_KEY, {
    ...allWatchlists,
    [username]: watchlistIds,
  });
};

export const toggleUserWatchlistItem = (username, contentId) => {
  const current = getUserWatchlist(username);
  const next = current.includes(contentId)
    ? current.filter((id) => id !== contentId)
    : [...current, contentId];

  setUserWatchlist(username, next);
  return next;
};

export const getUserProgress = (username) => {
  const allProgress = readJson(PROGRESS_KEY, {});
  return allProgress[username] || {};
};

export const saveUserProgressItem = (username, progressItem) => {
  const allProgress = readJson(PROGRESS_KEY, {});
  const userProgress = allProgress[username] || {};

  writeJson(PROGRESS_KEY, {
    ...allProgress,
    [username]: {
      ...userProgress,
      [progressItem.progressKey]: {
        ...progressItem,
        updatedAt: new Date().toISOString(),
      },
    },
  });
};
