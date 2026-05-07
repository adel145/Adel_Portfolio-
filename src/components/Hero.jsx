import { motion } from "framer-motion";

import { profileLinks } from "../constants";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import ErrorBoundary from "./ErrorBoundary";

const HeroCanvasFallback = () => (
  <div className="h-full w-full flex items-end justify-center pointer-events-none">
    <div className="mb-20 h-44 sm:h-56 w-[560px] max-w-[72vw] rounded-lg border border-[#915eff]/30 bg-[#151030]/65 shadow-[0_0_80px_rgba(145,94,255,0.32)]" />
  </div>
);

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero-space relative w-full min-h-[760px] sm:min-h-screen mx-auto overflow-hidden">
      <div className="hero-star-field" aria-hidden="true" />

      <div
        className={`relative z-10 pt-[104px] sm:pt-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-3 sm:gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="max-w-3xl min-w-0 flex-1 overflow-hidden">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I&apos;m <span className="text-[#915eff]">Adel</span>
          </h1>
          <p className={`${styles.heroSubText} mt-3 text-white-100 max-w-2xl break-words`}>
            Full-Stack & AI-Powered Apps Developer.
          </p>
          <p className="mt-3 max-w-3xl text-secondary text-[15px] sm:text-[18px] leading-7 break-words">
            I build practical products across React, Node.js, automation, data, and ML/AI,
            with real project experience from academic, business, and portfolio systems.
            Expected B.Sc. graduation: 07/2026.
          </p>

          <div className="mt-7 grid grid-cols-1 sm:flex sm:flex-wrap gap-3 max-w-[520px] sm:max-w-none">
            <a className="hero-cta hero-cta-primary" href={profileLinks.github} target="_blank" rel="noreferrer">
              View GitHub
            </a>
            <a className="hero-cta" href={profileLinks.linkedin} target="_blank" rel="noreferrer">
              View LinkedIn
            </a>
            <a className="hero-cta" href={profileLinks.cv} target="_blank" rel="noreferrer">
              Download CV
            </a>
            <a className="hero-cta" href="#contact">
              Contact Me
            </a>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-[1]">
        <ErrorBoundary label="Hero computer canvas error" fallback={<HeroCanvasFallback />}>
          <ComputersCanvas />
        </ErrorBoundary>
      </div>

      <div className="pointer-events-none absolute z-10 bottom-8 lg:bottom-10 left-1/2 hidden sm:flex -translate-x-1/2 justify-center items-center">
        <button
          type="button"
          aria-label="Scroll to about section"
          onClick={scrollToAbout}
          className="pointer-events-auto w-[34px] h-[60px] lg:w-[35px] lg:h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2 transition-colors hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, 22, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            className="w-3 h-3 rounded-full bg-secondary mb-1"
            style={{ willChange: "transform, opacity" }}
          />
        </button>
      </div>
    </section>
  );
};

export default Hero;
