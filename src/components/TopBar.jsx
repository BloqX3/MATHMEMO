import React, { useState } from 'react';
import './TopBar.css';
import { FaGithub } from 'react-icons/fa'; // npm install react-icons
import ProjectPopup from './ProjectPopup';
import AboutDialog from './AboutDialog';
import CryptoDonate from './CryptoDonate';

export default function TopBar() {
  const [about, openAbout] = useState(false)
  const [donate, openDonate] = useState(false)
  return (
    <header className="topbar">
      {about &&
      <ProjectPopup
            title="About MATHMEMO"
            isOpen={about}
            setIsOpen={openAbout}
          >
        <AboutDialog buyCoffee={()=>{
          openAbout(false)
          openDonate(true)
        }} />
      </ProjectPopup>}
      {donate &&
      <ProjectPopup
            title="Buy me a coffee"
            isOpen={donate}
            setIsOpen={openDonate}
          >
        <CryptoDonate />
      </ProjectPopup>}
      <nav className="topbar__nav">
        <button
          className="topbar__btn"
          onClick={() => (openAbout(true))}
        >
          About
        </button>
        <a
          className="topbar__link"
          href="https://github.com/BloqX3/MATHMEMO"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="topbar__icon" />
          GitHub
        </a>
      </nav>

      <button
        className="topbar__donate"
        onClick={() => (openDonate(true))}
        target="_blank"
        rel="noopener noreferrer"
      >
        ☕ Buy Me A Coffee
      </button>
    </header>
  );
}
