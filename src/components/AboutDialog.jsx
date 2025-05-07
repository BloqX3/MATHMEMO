import React from 'react'

export default function AboutDialog({buyCoffee}) {
  return (
    <div style={{
        display:'flex',
        flexDirection:'column',
        textAlign:'start',
        gap:'5px'
    }}>
          <p>
            made with 💖 in iraq, By BloqX3
          </p>
          <p>
            MATHMEMO is designed for people like me, who struggle to find
            a suitable website to sharpen their skill in memorizing diffirent
            constants.
            
          </p>
          <p>
            Built with Vite + React, MATHMEMO is available completely free
            on <a style={{cursor:"pointer"}} href="https://github.com/BloqX3/MATHMEMO">github </a>for any sort of use or destirbution.
          </p>
          <p>
            You don't need to, but you can buy me a coffee 
          </p>
          <p></p>
          <p></p>
          <p></p>
          <button
            onClick={buyCoffee}
            target="_blank"
            rel="noopener noreferrer"
          >
            ☕ Buy Me A Coffee
          </button>
    </div>
  )
}
