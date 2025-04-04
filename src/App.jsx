// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
// import Education from "./components/Education";
// import MyWorld from "./components/MyWorld/MyWorld"; // Import the MyWorld component

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         {/* Route for the homepage */}
//         <Route
//           path="/"
//           element={
//             <div className="relatuve z-0 bg-primary">
//               <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
//                 <Hero />
//               </div>
//               <About />
//               <Experience />
//               <Education />
//               <Tech />
//               <Works />
//               {/* <Feedbacks/> */}
//               <div className="relative z-0">
//                 <Contact />
//                 <StarsCanvas />
//               </div>
//             </div>
//           }
//         />
//         {/* Route for the MyWorld page */}
//         <Route path="/myworld" element={<MyWorld />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;


import { lazy, Suspense } from 'react'; // Import lazy and Suspense
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
// import Education from "./components/Education";
// import MyWorld from "./components/MyWorld/MyWorld";
// import ToDo from "./components/MyWorld/ToDo";
// import MovieApp from "./components/MyWorld/MovieApp";
// import EventCalendar from "./components/MyWorld/EventCalendar";
// import NotesApp from "./components/MyWorld/NotesApp";
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"))
const Experience = lazy(() => import("./components/Experience"));
const Feedbacks = lazy(() => import("./components/Feedbacks"));
const Hero = lazy(() => import("./components/Hero"));
const Navbar = lazy(() => import("./components/Navbar"));
const Tech = lazy(() => import("./components/Tech"));
const Works = lazy(() => import("./components/Works"));
const Stars = lazy(() => import("./components/canvas/Stars"));
const Education = lazy(() => import("./components/Education"));
const MyWorld = lazy(() => import("./components/MyWorld/MyWorld"));
const ToDo = lazy(() => import("./components/MyWorld/ToDo"));
const MovieApp = lazy(() => import("./components/MyWorld/MovieApp"));
const EventCalendar = lazy(() => import("./components/MyWorld/EventCalendar"));
const NotesApp = lazy(() => import("./components/MyWorld/NotesApp"));

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar />
      <Routes future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        {/* Route for the homepage */}
        <Route future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          path="/"
          element={
            <div className="relatuve z-0 bg-primary">
              <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                <Hero />
              </div>
              <About />
              <Experience />
              <Education />
              <Tech />
              <Works />
              {/* <Feedbacks/> */}
              <div className="relative z-0">
                <Contact />
                <Stars />
              </div>
            </div>
          }
        />
        {/* Route for the MyWorld page */}
        <Route path="/myworld" element={<MyWorld />} />
        {/* Routes for individual pages */}
        <Route path="/todo" element={<ToDo />} />
        <Route path="/movie-app" element={<MovieApp />} />
        <Route path="/event-calendar" element={<EventCalendar />} />
        <Route path="/notes-app" element={<NotesApp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
