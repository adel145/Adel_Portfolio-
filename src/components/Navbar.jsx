import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { close, logo, menu } from "../assets";
import { navLinks, profileLinks } from "../constants";
import { styles } from "../styles";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  const handleNavClick = (title, id) => {
    setActive(title);
    setToggle(false);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-4 sm:py-5 fixed top-0 z-20 bg-primary/95 backdrop-blur-sm`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto gap-3 sm:gap-5">
        <RouterLink
          to="/"
          className="flex items-center gap-2 min-w-0 flex-1 lg:flex-none"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="Adel Mohsen logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[15px] sm:text-[18px] font-bold cursor-pointer truncate">
            Adel Mohsen <span className="xl:inline hidden">| CS Student & Full-Stack AI Developer</span>
          </p>
        </RouterLink>

        <ul className="list-none hidden lg:flex flex-row gap-8">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${active === nav.title ? "text-white" : "text-secondary"} hover:text-white text-[16px] font-medium cursor-pointer`}
              onClick={() => handleNavClick(nav.title, nav.id)}
            >
              <RouterLink to="/">{nav.title}</RouterLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href={profileLinks.github}
            target="_blank"
            rel="noreferrer"
            className="text-secondary hover:text-white text-[15px] font-medium"
          >
            GitHub
          </a>
          <RouterLink
            to="/myworld"
            className="navbar-world-link bg-secondary text-primary px-4 py-2 rounded-md hover:bg-white transition duration-200 font-semibold"
          >
            MyWorld
          </RouterLink>
        </div>

        <div className="lg:hidden flex shrink-0 justify-end items-center">
          <button type="button" aria-label="Toggle navigation menu" className="h-11 w-11 flex items-center justify-center" onClick={() => setToggle(!toggle)}>
            <img src={toggle ? close : menu} alt="" className="w-[28px] h-[28px] object-contain" />
          </button>
          <div className={`${!toggle ? "hidden" : "flex"} p-5 black-gradient absolute top-[72px] right-0 mx-4 my-2 w-[calc(100vw-2rem)] max-w-[280px] z-10 rounded-lg`}>
            <ul className="list-none flex justify-end items-start flex-col gap-4 w-full">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`${active === nav.title ? "text-white" : "text-secondary"} font-poppins font-medium cursor-pointer text-[16px]`}
                  onClick={() => handleNavClick(nav.title, nav.id)}
                >
                  <RouterLink to="/">{nav.title}</RouterLink>
                </li>
              ))}
              <li>
                <a className="text-secondary font-medium text-[16px]" href={profileLinks.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <RouterLink className="text-secondary font-medium text-[16px]" to="/myworld" onClick={() => setToggle(false)}>
                  MyWorld
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
