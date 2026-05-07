import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../utils/motion";

const MovieApp = () => {
  const [movies] = useState([
    {
      id: 1,
      title: "The Matrix",
      type: "Sci-Fi",
      cover: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
      description: "A computer hacker learns about the true nature of reality and his role in the war against its controllers."
    },
    {
      id: 2,
      title: "Inception",
      type: "Sci-Fi/Action",
      cover: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
    },
    {
      id: 3,
      title: "Interstellar",
      type: "Sci-Fi/Adventure",
      cover: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="pt-28 sm:pt-32 px-4 py-8 sm:p-6 bg-primary min-h-screen text-white overflow-hidden">
      <motion.div variants={textVariant()}>
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-6 text-purple-500">Movie App</h1>
        <p className="text-center mb-8 text-[15px] sm:text-base">A sample movie collection app</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-6 max-w-7xl mx-auto">
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            variants={fadeIn("up", "spring", index * 0.3, 0.75)}
            className="bg-tertiary p-4 sm:p-5 rounded-lg cursor-pointer"
            onClick={() => setSelectedMovie(movie)}
          >
            <div className="relative w-full h-[220px] sm:h-[230px]">
              <img
                src={movie.cover}
                alt={movie.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-white text-[20px] font-bold mt-4">{movie.title}</h3>
            <p className="mt-2 text-secondary text-[14px]">{movie.type}</p>
          </motion.div>
        ))}
      </div>

      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-tertiary p-5 sm:p-6 rounded-lg relative w-[calc(100vw-2rem)] max-w-3xl">
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 sm:px-4 py-2 rounded-md"
            >
              Close
            </button>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 pr-20">{selectedMovie.title}</h2>
            <p className="text-secondary mb-4">{selectedMovie.type}</p>
            <p className="mb-6">{selectedMovie.description}</p>
            <div className="text-center text-gray-400">
              This is a demo version. Video playback would be available in the full version.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieApp;
