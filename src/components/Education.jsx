import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { visit } from "../assets";
import { certificates } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import LazyImage from "./LazyImage";

const CertificateCard = ({ index, name, college, description, tags, image, source_code_link }) => {
  return (
    <motion.div className="h-full" variants={fadeIn("up", "spring", index * 0.15, 0.75)} style={{ willChange: "transform, opacity" }}>
      <Tilt options={{ max: 18, scale: 1, speed: 450 }} className="portfolio-card bg-tertiary p-5 rounded-lg sm:w-[350px] w-full min-h-[500px] flex flex-col">
        <div className="relative w-full h-[215px] rounded-lg overflow-hidden bg-[#0b0820] border border-white/5 flex items-center justify-center">
          <LazyImage src={image} alt={`${name} certificate`} className="w-full h-full object-contain p-5" loading="lazy" />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <a
              href={source_code_link}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${name} certificate link`}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center"
            >
              <LazyImage src={visit} alt="" className="w-1/2 h-1/2 object-contain" loading="lazy" />
            </a>
          </div>
        </div>

        <div className="mt-5 flex-1">
          <h3 className="text-white text-[20px] font-bold leading-tight">{name}</h3>
          <h4 className="text-white text-[16px] mt-1">{college}</h4>
          <p className="mt-2 text-secondary text-[14px] leading-6">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Education = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Education and certificates</p>
        <h2 className={styles.sectionHeadText}>Education.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          My academic path is centered on Computer Science at Sapir Academic College,
          supported by focused learning in Java development, deep learning, and applied
          engineering topics.
        </motion.p>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
        {certificates.map((certificate, index) => (
          <CertificateCard key={certificate.name} index={index} {...certificate} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education");
