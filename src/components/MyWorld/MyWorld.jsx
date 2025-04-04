import React, { useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../../styles"; // Adjusted relative path
import { pages } from "../../constants"; // Adjusted relative path
import { fadeIn, textVariant } from "../../utils/motion"; // Adjusted relative path
import { useNavigate } from "react-router-dom";
import LazyImage from "../LazyImage";
import MovieApp from "./MovieApp"; // Import the MovieApp component

const PageCard = ({ index, name, description, tags, image, onClick }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      style={{ willChange: "transform, opacity" }}
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[300px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <LazyImage
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        <div className="mt-5">
          <h3 className="text-white text-[19px] font-bold">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>

        <button
          onClick={onClick}
          className="mt-4 bg-secondary text-white px-4 py-2 rounded-md hover:bg-white hover:text-primary transition duration-200"
        >
          Visit Page
        </button>
      </Tilt>
    </motion.div>
  );
};

const MyWorld = () => {
  const [activePage, setActivePage] = useState(null);

  const handlePageClick = (page) => {
    setActivePage(page);
  };

  // const renderActivePage = () => {
  //   switch (activePage) {
  //     case "movieapp":
  //       return <MovieApp />; // Render the MovieApp component
  //     // Add cases for other pages if needed
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="myworld-container pt-40">
      <motion.div
        variants={textVariant()}
        style={{ willChange: "transform, opacity" }}
      >
        <p className={styles.sectionSubText}>Explore.</p>
        <h2 className={styles.sectionHeadText}>My World.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Welcome to MyWorld! Here you can explore various sections and pages
          about my journey, work, and interests.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {pages.map((page, index) => (
          <PageCard
            key={`page-${index}`}
            index={index}
            {...page}
            onClick={() => handlePageClick(page.page_link)}
          />
        ))}
      </div>

      {/* Render the active page */}
      {/* {renderActivePage()} */}
    </div>
  );
};

export default MyWorld;