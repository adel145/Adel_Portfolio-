import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";

import { technologies } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";
const TechIcon = ({ technology }) => (
  <div className="h-full w-full rounded-full border border-[#915eff]/35 bg-tertiary/80 p-5 shadow-[0_0_35px_rgba(145,94,255,0.18)] flex items-center justify-center">
    <img
      src={technology.icon}
      alt={technology.name}
      className="h-full w-full object-contain"
      loading="lazy"
      decoding="async"
    />
  </div>
);

const Tech = () => {
  return (
    <>
      <motion.div className="mt-20" variants={textVariant()} style={{ willChange: "transform, opacity" }}>
        <p className={styles.sectionSubText}>Core stack</p>
        <h2 className={styles.sectionHeadText}>Skills.</h2>
      </motion.div>

      <div className="mt-20 flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technology) => (
          <div className="tech-icon w-28 h-28" key={technology.name} title={technology.name}>
            <TechIcon technology={technology} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
