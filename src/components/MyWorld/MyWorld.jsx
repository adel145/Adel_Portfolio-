import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { pages } from "../../constants";
import { styles } from "../../styles";
import { fadeIn, textVariant } from "../../utils/motion";
import LazyImage from "../LazyImage";

const PageCard = ({ index, name, description, tags, image, onClick }) => {
  return (
    <motion.div className="h-full w-full" variants={fadeIn("up", "spring", index * 0.15, 0.75)} style={{ willChange: "transform, opacity" }}>
      <Tilt options={{ max: 18, scale: 1, speed: 450 }} className="portfolio-card bg-tertiary p-4 sm:p-5 rounded-lg w-full min-h-[440px] sm:min-h-[480px] flex flex-col">
        <div className="myworld-preview relative w-full h-[180px] sm:h-[215px] rounded-lg overflow-hidden">
          <div className="myworld-preview-backdrop" />
          <LazyImage src={image} alt={`${name} demo preview`} className="relative z-10 w-24 h-24 object-contain" />
        </div>

        <div className="mt-5 flex-1">
          <h3 className="text-white text-[19px] sm:text-[21px] font-bold leading-tight">{name}</h3>
          <p className="mt-3 text-secondary text-[14px] leading-6">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[13px] sm:text-[14px] break-words ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>

        <button
          onClick={onClick}
          className="mt-5 bg-secondary text-primary px-4 py-3 sm:py-2 rounded-md hover:bg-white transition duration-200 font-semibold w-full"
        >
          Open Demo
        </button>
      </Tilt>
    </motion.div>
  );
};

const MyWorld = () => {
  const navigate = useNavigate();

  return (
    <main className="myworld-page pt-28 sm:pt-36 pb-14 sm:pb-20 bg-primary min-h-screen overflow-hidden">
      <section className="max-w-7xl mx-auto px-4 sm:px-16">
        <motion.div variants={textVariant()} style={{ willChange: "transform, opacity" }}>
          <p className={styles.sectionSubText}>Explore.</p>
          <h2 className={styles.sectionHeadText}>My World.</h2>
        </motion.div>

        <div className="w-full flex">
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-3 text-secondary text-[15px] sm:text-[17px] max-w-3xl leading-7 sm:leading-[30px]"
          >
            A small gallery of polished browser demos, experiments, and everyday tools
            that show how I think about practical product interfaces.
          </motion.p>
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-7 justify-items-stretch">
          {pages.map((page, index) => (
            <PageCard
              key={page.name}
              index={index}
              {...page}
              onClick={() => navigate(page.page_link)}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default MyWorld;
