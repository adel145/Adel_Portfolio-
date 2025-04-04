// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Tilt } from "react-tilt";
// import { motion } from "framer-motion";
// import { styles } from "../../styles";
// import { textVariant, fadeIn } from "../../utils/motion";
// import ReactPlayer from "react-player";

// const MovieApp = () => {
//   const [movies, setMovies] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [view, setView] = useState("all"); // Options: 'all', 'watchlist', 'continue', 'addMovie'
//   const [watchlist, setWatchlist] = useState([]);
//   const [continueWatching, setContinueWatching] = useState([]);
//   const [newMovie, setNewMovie] = useState({
//     title: "",
//     type: "",
//     language: "",
//     description: "",
//     embedCode: "",
//     cover: "",
//   });
//   const [selectedMovie, setSelectedMovie] = useState(null); // For video playback
//   const [editMovie, setEditMovie] = useState(null); // For editing movies

//   // Fetch movies from the backend
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/movies")
//       .then((response) => setMovies(response.data))
//       .catch((error) => console.error("Error fetching movies:", error));
//   }, []);

//   const addMovie = async () => {
//     try {
//       // Ensure the JumpShare link has the proper format
//       const formattedLink = newMovie.embedCode.startsWith("https://jmp.sh/")
//         ? `https://jumpshare.com/embed/${newMovie.embedCode.split("/").pop()}`
//         : newMovie.embedCode;
  
//       const movieToAdd = {
//         title: newMovie.title,
//         type: newMovie.type,
//         embedCode: formattedLink,
//       };
  
//       const response = await axios.post("http://localhost:5000/api/movies", movieToAdd);
//       setMovies([...movies, response.data]); // Update state with the new movie
//       setNewMovie({ title: "", type: "", embedCode: "" }); // Reset form fields
//       setView("all");
//       console.log("Movie added successfully:", response.data);
//     } catch (error) {
//       console.error("Error adding movie:", error.response?.data || error.message);
//     }
//   };
  
  
  

//   const deleteMovie = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/movies/${id}`);
//       setMovies(movies.filter((movie) => movie._id !== id));
//     } catch (error) {
//       console.error("Error deleting movie:", error);
//     }
//   };

//   const addToWatchlist = (movie) => {
//     setWatchlist([...watchlist, movie]);
//   };

//   const renderMovies = () => {
//     const filteredMovies =
//       view === "watchlist"
//         ? watchlist
//         : view === "continue"
//         ? continueWatching
//         : movies.filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));

//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//         {filteredMovies.map((movie) => (
//           <motion.div
//             key={movie._id}
//             variants={fadeIn("up", "spring", 0.5, 0.75)}
//             style={{ willChange: 'transform, opacity' }}
//             className="bg-dark-navy text-white p-4 rounded-lg shadow-md"
//             onClick={() => setSelectedMovie(movie)} // Open player on click
//           >
//             <Tilt className="relative w-full h-[230px]">
//               <img
//                 src={movie.cover}
//                 alt={movie.title}
//                 className="w-full h-full object-cover rounded-md"
//               />
//             </Tilt>
//             <h3 className="text-lg font-bold mt-4">{movie.title}</h3>
//             <p className="text-sm text-gray-400">{movie.type}</p>
//             <div className="flex gap-2 mt-4">
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent parent click event
//                   addToWatchlist(movie);
//                 }}
//                 className="px-4 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
//               >
//                 Watchlist
//               </button>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent parent click event
//                   setEditMovie(movie);
//                 }}
//                 className="px-4 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent parent click event
//                   deleteMovie(movie._id);
//                 }}
//                 className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
//               >
//                 Delete
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="p-6 bg-primary min-h-screen text-white">
//       <h1 className="text-4xl font-bold text-center mb-6 text-purple-500">Movie App</h1>

//       {/* Navigation Options */}
//       <div className="flex justify-around mb-6">
//         <button
//           onClick={() => setView("all")}
//           className={`px-4 py-2 ${
//             view === "all" ? "bg-purple-600" : "bg-dark-navy"
//           } text-white rounded-md hover:bg-purple-700 transition`}
//         >
//           Find Movies/TV
//         </button>
//         <button
//           onClick={() => setView("watchlist")}
//           className={`px-4 py-2 ${
//             view === "watchlist" ? "bg-purple-600" : "bg-dark-navy"
//           } text-white rounded-md hover:bg-purple-700 transition`}
//         >
//           Watchlist
//         </button>
//         <button
//           onClick={() => setView("continue")}
//           className={`px-4 py-2 ${
//             view === "continue" ? "bg-purple-600" : "bg-dark-navy"
//           } text-white rounded-md hover:bg-purple-700 transition`}
//         >
//           Continue Watching
//         </button>
//         <button
//           onClick={() => setView("addMovie")}
//           className={`px-4 py-2 ${
//             view === "addMovie" ? "bg-purple-600" : "bg-dark-navy"
//           } text-white rounded-md hover:bg-purple-700 transition`}
//         >
//           Add Movie
//         </button>
//       </div>

//       {/* Edit Movie Form */}
//       {editMovie && (
//         <div className="max-w-md mx-auto mb-6">
//           <input
//             type="text"
//             value={editMovie.title}
//             onChange={(e) => setEditMovie({ ...editMovie, title: e.target.value })}
//             placeholder="Title"
//             className="p-2 border border-light-gray rounded-md mb-4 w-full"
//           />
//           <input
//             type="text"
//             value={editMovie.type}
//             onChange={(e) => setEditMovie({ ...editMovie, type: e.target.value })}
//             placeholder="Type"
//             className="p-2 border border-light-gray rounded-md mb-4 w-full"
//           />
//           <input
//             type="text"
//             value={editMovie.language}
//             onChange={(e) => setEditMovie({ ...editMovie, language: e.target.value })}
//             placeholder="Language"
//             className="p-2 border border-light-gray rounded-md mb-4 w-full"
//           />
//           <textarea
//             value={editMovie.description}
//             onChange={(e) => setEditMovie({ ...editMovie, description: e.target.value })}
//             placeholder="Description"
//             className="p-2 border border-light-gray rounded-md mb-4 w-full"
//           ></textarea>
//           <input
//             type="text"
//             value={editMovie.embedCode}
//             onChange={(e) => setEditMovie({ ...editMovie, embedCode: e.target.value })}
//             placeholder="Embed Code"
//             className="p-2 border border-light-gray rounded-md mb-4 w-full"
//           />
//           <input
//             type="text"
//             value={editMovie.cover}
//             onChange={(e) => setEditMovie({ ...editMovie, cover: e.target.value })}
//             placeholder="Cover URL"
//             className="p-2 border border-light-gray rounded-md mb-4 w-full"
//           />
//           <button
//             onClick={updateMovie}
//             className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition w-full"
//           >
//             Update Movie
//           </button>
//         </div>
//       )}

//       {/* Render Movies */}
//       {renderMovies()}

//       {/* Video Player Modal */}
//       {selectedMovie && (
//         <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg relative w-3/4 h-3/4">
//             <button
//               onClick={() => setSelectedMovie(null)}
//               className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-full"
//             >
//               Close
//             </button>
//             <h2 className="text-xl font-bold mb-4">{selectedMovie.title}</h2>
//             <div className="relative w-full h-full">
//               <iframe
//                 src={selectedMovie.embedCode}
//                 title={selectedMovie.title}
//                 className="w-full h-full rounded-md"
//                 allow="fullscreen"
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MovieApp;







////////////////////////////222222222222/////////////////////

// import React, { useState, useEffect } from 'react';

// const MovieApp = () => {
//   const [movies, setMovies] = useState([]); // State to store movies
//   const [series, setSeries] = useState([]); // State to store series
//   const [searchQuery, setSearchQuery] = useState(''); // State for search functionality

//   // Fetch movies and series from the MEGA database (we'll implement this later)
//   useEffect(() => {
//     // Fetch movies and series here
//   }, []);

//   // Filter movies and series based on search query
//   const filteredMovies = movies.filter((movie) =>
//     movie.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   const filteredSeries = series.filter((series) =>
//     series.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold mb-4">Movie Dashboard</h1>

//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search movies or series..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="w-full p-2 mb-4 border border-gray-300 rounded"
//       />

//       {/* Movies Section */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Movies</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {filteredMovies.map((movie) => (
//             <div key={movie.id} className="bg-white p-4 rounded-lg shadow-md">
//               <img
//                 src={movie.thumbnail}
//                 alt={movie.title}
//                 className="w-full h-48 object-cover rounded"
//               />
//               <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
//               <p className="text-gray-600">{movie.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Series Section */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Series</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {filteredSeries.map((series) => (
//             <div key={series.id} className="bg-white p-4 rounded-lg shadow-md">
//               <img
//                 src={series.thumbnail}
//                 alt={series.title}
//                 className="w-full h-48 object-cover rounded"
//               />
//               <h3 className="text-lg font-semibold mt-2">{series.title}</h3>
//               <p className="text-gray-600">{series.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default MovieApp;




// src/components/MyWorld/MovieApp.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./MovieApp/App"; // Adjust the import path as needed

const MovieApp = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default MovieApp;