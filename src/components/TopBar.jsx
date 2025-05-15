import React, { useState } from 'react';
import './TopBar.css';
import { FaGithub } from 'react-icons/fa'; // npm install react-icons
import ProjectPopup from './ProjectPopup';
import AboutDialog from './AboutDialog';
import CryptoDonate from './CryptoDonate';
import {ScoreIndicator} from "./ScoreIndicator.jsx";

export default function TopBar({percentage}) {
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
      <div style={{
             flex: '1 1 auto',
             maxWidth:'300px',
             padding:'0 10px 0 10px',
             overflow: 'hidden'
           }}>
        <div style={{
               fontSize:'12px',
               paddingBottom:'5px',
               fontFamily:'monospace',
               fontWeight:'550',
               whiteSpace:'nowrap',
               overflow: 'hidden'
             }}>
          TOP {100 - percentage}%
        </div>
        <ScoreIndicator percentage={percentage}/>
      </div>
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
