import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";

import ErrorBoundary from "./components/ErrorBoundary";

const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Experience = lazy(() => import("./components/Experience"));
const Hero = lazy(() => import("./components/Hero"));
const Navbar = lazy(() => import("./components/Navbar"));
const Tech = lazy(() => import("./components/Tech"));
const Stars = lazy(() => import("./components/canvas/Stars"));
const Education = lazy(() => import("./components/Education"));
const MyWorld = lazy(() => import("./components/MyWorld/MyWorld"));
const ToDo = lazy(() => import("./components/MyWorld/ToDo"));
const MovieApp = lazy(() => import("./components/MyWorld/MovieApp"));
const EventCalendar = lazy(() => import("./components/MyWorld/EventCalendar"));
const NotesApp = lazy(() => import("./components/MyWorld/NotesApp"));

const PageLoader = () => (
  <div className="min-h-screen bg-primary text-white flex items-center justify-center">
    Loading Adel Mohsen portfolio...
  </div>
);

const RouteErrorFallback = () => (
  <div className="min-h-screen bg-primary text-white flex items-center justify-center px-6 text-center">
    Something went wrong while rendering this page.
  </div>
);

const CanvasFallback = ({ className = "" }) => (
  <div className={`bg-primary/40 ${className}`} aria-hidden="true" />
);

const Home = () => (
  <div className="relative z-0 bg-primary">
    <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
      <Hero />
    </div>
    <About />
    <Experience />
    <Education />
    <Tech />
    <Works />
    <div className="relative z-0">
      <Contact />
      <ErrorBoundary label="Stars canvas error" fallback={<CanvasFallback className="absolute inset-0 z-[-1]" />}>
        <Stars />
      </ErrorBoundary>
    </div>
  </div>
);

const Works = lazy(() => import("./components/Works"));

const AppRoutes = () => {
  const location = useLocation();

  return (
    <ErrorBoundary label="Route render error" resetKey={location.key} fallback={<RouteErrorFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myworld" element={<MyWorld />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="/movie-app" element={<MovieApp />} />
        <Route path="/event-calendar" element={<EventCalendar />} />
        <Route path="/notes-app" element={<NotesApp />} />
      </Routes>
    </ErrorBoundary>
  );
};

const App = () => (
  <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Suspense fallback={<PageLoader />}>
      <ErrorBoundary label="Navbar render error">
        <Navbar />
      </ErrorBoundary>
      <AppRoutes />
    </Suspense>
  </HashRouter>
);

export default App;
