import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";

import { technologies } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";
const TechIcon = ({ technology }) => (
  <div className="group flex h-full w-full flex-col items-center gap-2">
    <div className="h-16 w-16 xs:h-20 xs:w-20 sm:h-24 sm:w-24 rounded-full border border-[#915eff]/35 bg-tertiary/80 p-3 sm:p-5 shadow-[0_0_35px_rgba(145,94,255,0.18)] flex items-center justify-center transition-colors group-hover:border-[#915eff]/70">
      <img
        src={technology.icon}
        alt={technology.name}
        className="h-full w-full object-contain"
        loading="lazy"
        decoding="async"
      />
    </div>
    <span className="max-w-[96px] text-center text-[11px] sm:text-[12px] font-medium leading-tight text-secondary transition-colors group-hover:text-white">
      {technology.name}
    </span>
  </div>
);

const Tech = () => {
  return (
    <>
      <motion.div className="mt-10 sm:mt-20" variants={textVariant()} style={{ willChange: "transform, opacity" }}>
        <p className={styles.sectionSubText}>Core stack</p>
        <h2 className={styles.sectionHeadText}>Skills.</h2>
      </motion.div>

      <div className="mt-10 sm:mt-16 grid grid-cols-3 xs:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-x-4 gap-y-7 sm:gap-x-8 sm:gap-y-10 justify-items-center">
        {technologies.map((technology) => (
          <div className="tech-icon w-24 sm:w-28 min-h-[104px] sm:min-h-[124px]" key={technology.name} title={technology.name}>
            <TechIcon technology={technology} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
