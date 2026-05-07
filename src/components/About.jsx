import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import LazyImage from "./LazyImage";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="w-full max-w-[250px]">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.2, 0.65)}
      style={{ willChange: "transform, opacity" }}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div className="bg-tertiary rounded-[20px] py-5 px-5 sm:px-8 min-h-[220px] sm:min-h-[240px] flex justify-evenly items-center flex-col">
        <LazyImage src={icon} alt={title} className="w-16 h-16 object-contain" />
        <h3 className="text-white text-[18px] sm:text-[20px] font-bold text-center">{title}</h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[15px] sm:text-[17px] max-w-3xl leading-7 sm:leading-[30px]"
      >
        I am Adel Mohsen, a B.Sc. Computer Science student at Sapir Academic
        College, with expected graduation in 07/2026. I build practical products
        across React, Node.js, MongoDB, Python, automation, data, and ML/AI,
        with real project experience from academic, business, and portfolio
        systems. My strongest work combines product thinking with clear,
        reliable engineering.
      </motion.p>

      <div className="mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 justify-items-center">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
