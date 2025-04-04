import { lazy, Suspense } from 'react'; // Import lazy and Suspense
import {BallCanvas} from './canvas';
import {styles} from "../styles"
import { technologies } from '../constants';
import { SectionWrapper } from '../hoc';
import {motion} from "framer-motion"
import 'react-vertical-timeline-component/style.min.css';

import { textVariant } from "../utils/motion";



const Tech = () => {
  return (
    
    
    
    <>
  <motion.div className=' mt-20 ' 
    variants={textVariant()}
    style={{ willChange: 'transform, opacity' }}>
      <p className={styles.sectionSubText}>What can I do.</p>
      <h2 className={styles.sectionHeadText}>Knowledge and Skills.</h2>

    </motion.div>

    <div className=' mt-20 flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology)=>(
        <div className='tech-icon w-28 h-28' key={technology.name} title={technology.name}>
          <BallCanvas icon={technology.icon}/>

        </div>


      ))}
    </div>
    </>
  )
}

export default SectionWrapper(Tech, "");