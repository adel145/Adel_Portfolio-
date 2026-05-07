import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { github, visit } from "../assets";
import { projects } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import LazyImage from "./LazyImage";

const isValidExternalLink = (url) => /^https?:\/\//.test(url ?? "");

const ProjectCard = ({
  index,
  name,
  status,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
}) => {
  const useImagePreview = [
    "Miktsoan / Professional",
    "Crystallia",
    "Tips Predictor",
    "Pet Shop E-Commerce",
  ].includes(name);
  const sourceLink = isValidExternalLink(source_code_link) ? source_code_link : "";
  const liveLink = isValidExternalLink(live_demo_link) ? live_demo_link : "";
  const displayName = name.split(" / ")[0];

  return (
    <motion.div className="h-full" variants={fadeIn("up", "spring", index * 0.15, 0.75)} style={{ willChange: "transform, opacity" }}>
      <Tilt options={{ max: 18, scale: 1, speed: 450 }} className="portfolio-card bg-tertiary p-4 sm:p-5 rounded-lg w-full max-w-[380px] min-h-[500px] sm:min-h-[560px] flex flex-col">
        <div className="project-preview relative w-full h-[180px] xs:h-[195px] sm:h-[225px] overflow-hidden rounded-lg">
          {useImagePreview ? (
            <LazyImage src={image} alt={`${name} project preview`} className="w-full h-full object-cover" />
          ) : (
            <div className="project-visual-panel h-full w-full">
              <span>{status}</span>
              <strong>{displayName}</strong>
            </div>
          )}
          <span className="absolute top-3 left-3 rounded-md bg-primary/90 border border-white/10 px-3 py-1 text-[12px] font-semibold text-white">
            {status}
          </span>
        </div>

        <div className="mt-5 flex-1 flex flex-col">
          <h3 className="text-white text-[19px] sm:text-[21px] font-bold leading-tight">{name}</h3>
          <p className="mt-3 text-secondary text-[14px] leading-6">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[13px] break-words ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>

        <div className="mt-5 flex gap-3 pt-1">
          {sourceLink && (
            <a
              href={sourceLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${name} source code`}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center"
            >
              <LazyImage src={github} alt="" className="w-1/2 h-1/2 object-contain" />
            </a>
          )}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${name} live demo`}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center"
            >
              <LazyImage src={visit} alt="" className="w-1/2 h-1/2 object-contain" />
            </a>
          )}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()} style={{ willChange: "transform, opacity" }}>
        <p className={styles.sectionSubText}>Selected Work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[15px] sm:text-[17px] max-w-3xl leading-7 sm:leading-[30px]"
        >
          A focused set of projects aligned with junior full-stack, automation,
          data, and AI-powered application roles. I keep the descriptions realistic:
          what matters is the product problem, the stack, and the engineering choices.
        </motion.p>
      </div>

      <div className="mt-12 sm:mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
