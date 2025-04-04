import { Tilt } from "react-tilt"
import { motion } from "framer-motion"

import { styles } from "../../styles"
import {visit} from "../../assets"
import { SectionWrapper } from "../../hoc" 
import { certificates } from "../../constants"
import { fadeIn, textVariant } from "../../utils/motion";
//import { max } from "three/webgpu"

const CertificateCard = ({ index, name, college, description, tags, image, source_code_link }) => {
    return (
      <motion.div 
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      style={{ willChange: 'transform, opacity' }}>
        <Tilt
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-tertiary p-5 rounded-2xl sm:w-[300px] w-full"
        >
          <div className="relative w-full h-[230px]">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-2xl"
            />
  
            <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
              <div
                onClick={() => window.open(source_code_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              >
                <img
                  src={visit}
                  alt="visit"
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </div>
          </div>
  
          <div className="mt-5">
            <h3 className="text-white text-[19px] font-bold">{name}</h3>
            <h4 className="text-white text-[16px] mt-1"> {college}</h4> {/* הצגת שם המכללה */}
            <p className="mt-2 text-secondary text-[14px]">{description}</p>
          </div>
  
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p
                key={tag.name}
                className={`text-[14px] ${tag.color}`}
              >
                #{tag.name}
              </p>
            ))}
          </div>
        </Tilt>
      </motion.div>
    );
  };
  

const Works = () => {
  return (
    <>

      <motion.div
        variants={textVariant()}
        style={{ willChange: 'transform, opacity' }}>
        <p className={styles.sectionSubText}>What I Have Learned.</p>
        <h2 className={styles.sectionHeadText}>Education.</h2>

      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          These certificates and experiences reflect my journey as a Computer Science student at Sapir College.
           I have completed additional courses, while also participating in workshops and tech events to further develop my skills and knowledge.

        </motion.p>

      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {certificates.map((certificate, index) => (
          <CertificateCard
            key={`certificate-${index}`}
            index={index}
            {...certificate}
          />
        ))}

      </div>

    </>
  )
}

export default SectionWrapper(Works, "education");