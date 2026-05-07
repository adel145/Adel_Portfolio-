import { VerticalTimeline , VerticalTimelineElement } from "react-vertical-timeline-component"
import {motion} from "framer-motion"
import 'react-vertical-timeline-component/style.min.css';
import {styles} from "../styles"
import {experiences} from "../constants"
import {SectionWrapper} from "../hoc"
import { textVariant } from "../utils/motion";



const ExperienceCard = ({experience})=>(
<VerticalTimelineElement
   className="vertical-timeline-element--work"
  contentStyle={{
    background: '#1d1836',
    color: '#fff',
    borderRadius: '8px',
    boxShadow: '0 24px 80px -28px rgba(145, 94, 255, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
  }}
   contentArrowStyle={{borderRight: '7px solid  #232631'}}
   date={experience.date}
   iconStyle={{background: experience.iconBg}}
   icon={
    <a
    href={experience.URL} // Link to the URL
    target="_blank"       // Opens in a new tab
    rel="noopener noreferrer" // Security for external links
    className="flex items-center justify-center w-full h-full"
  >
    <img
      src={experience.icon}
      alt={experience.company_name}
      className="w-[80%] h-[80%] object-contain"
    />
  </a>
   }
  >

    <div>
      <h3 className="text-white text-[20px] sm:text-[24px] font-bold leading-tight">{experience.title}</h3>
      <p className="text-secondary text-[15px] sm:text-[16px] font-semibold" 
      style={{margin:0}}>
        {experience.company_name}
      </p>
    </div>

    <ul className="mt-5 list-disc ml-4 sm:ml-5 space-y-2">
      {experience.points.map((points,index)=> (
        <li
        key={`experience-point-${index}`}
        className="text-white text-[13px] sm:text-[14px] pl-1 sm:tracking-wider leading-6"
        >
          {points}
        


        </li>
      ))}

    </ul>
  </VerticalTimelineElement>
  
)

const Experience = () => {
  return (
    <>

    <motion.div 
    variants={textVariant()}
    style={{ willChange: 'transform, opacity' }}>
      <p className={styles.sectionSubText}>What I have done so far.</p>
      <h2 className={styles.sectionHeadText}>Work Experience.</h2>

    </motion.div>
    
    <div className="mt-12 sm:mt-20 flex flex-col">
      <VerticalTimeline>
        {experiences.map((experience, index) =>(<ExperienceCard key={index} experience={experience} />))}

      </VerticalTimeline>
    </div>

</>
  )
}

export default SectionWrapper(Experience,"work")
