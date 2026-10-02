import { motion, useReducedMotion } from 'framer-motion'

/**
 * Common Halftone Screentone Pattern Definition
 */
export function ScreentonePattern() {
  return (
    <svg className="absolute w-0 h-0" aria-hidden="true">
      <defs>
        <pattern id="mangaHalftone" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#F4EFE6" fillOpacity="0.15" />
          <circle cx="8" cy="8" r="1.2" fill="#F4EFE6" fillOpacity="0.15" />
        </pattern>
        <pattern id="mangaHalftonePink" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.5" fill="#FF056D" fillOpacity="0.2" />
          <circle cx="11" cy="11" r="1.5" fill="#FF056D" fillOpacity="0.2" />
        </pattern>
      </defs>
    </svg>
  )
}

/**
 * 01. Hero Background Manga Atmosphere
 * Positioned in the dark background behind the Hero content
 */
export function MangaHeroBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
      <ScreentonePattern />

      {/* Cropped Manga Panel Layout in Right Background */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0.05, y: 0 } : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 0.06, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-12 right-0 md:right-12 w-[340px] sm:w-[480px] lg:w-[620px] h-[550px] opacity-[0.06] pointer-events-none"
      >
        <svg className="w-full h-full" viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main Rectangular Manga Panel Outer Boundary */}
          <rect x="80" y="40" width="460" height="420" stroke="#F4EFE6" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />
          
          {/* Secondary Inset Panel Division */}
          <line x1="80" y1="260" x2="540" y2="260" stroke="#F4EFE6" strokeWidth="1" opacity="0.5" />
          <line x1="320" y1="260" x2="320" y2="460" stroke="#F4EFE6" strokeWidth="1" opacity="0.5" />

          {/* Screentone Texture Area */}
          <rect x="82" y="42" width="456" height="216" fill="url(#mangaHalftone)" opacity="0.4" />

          {/* Generic Manga Character Profile Line-Art Contour */}
          <path
            d="M 220 220 Q 240 180, 270 160 T 320 140 T 380 145 Q 430 155, 450 190 T 460 250 M 270 160 Q 290 120, 340 110 T 400 120 M 310 170 Q 330 165, 350 175 M 390 175 Q 410 165, 430 170 M 350 195 C 370 205, 390 205, 410 195 M 300 240 L 480 240 M 120 320 Q 180 290, 240 310 T 300 350"
            stroke="#F4EFE6"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Faint Mechanical / Cybernetic Speed Hatches */}
          <path
            d="M 100 80 L 180 160 M 120 80 L 200 160 M 140 80 L 220 160 M 400 300 L 480 380 M 420 300 L 500 380 M 440 300 L 520 380"
            stroke="#FF056D"
            strokeWidth="1"
            opacity="0.35"
          />
        </svg>
      </motion.div>
    </div>
  )
}

/**
 * 02. Work Background Manga Atmosphere
 * Positioned in the dark background behind FeaturedWork section
 */
export function MangaWorkBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0.04, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.05, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: 'easeOut' }}
        className="absolute top-24 left-0 md:left-8 w-[320px] sm:w-[500px] h-[600px] opacity-[0.05] pointer-events-none"
      >
        <svg className="w-full h-full" viewBox="0 0 500 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Vertical Manga Column Panel Frame */}
          <rect x="20" y="30" width="440" height="540" stroke="#F4EFE6" strokeWidth="1" opacity="0.6" />

          {/* Diagonal Manga Cut Line */}
          <line x1="20" y1="200" x2="460" y2="140" stroke="#FF056D" strokeWidth="1" opacity="0.4" />
          <line x1="20" y1="420" x2="460" y2="360" stroke="#F4EFE6" strokeWidth="1" opacity="0.4" />

          {/* Technical System Architecture Line Art */}
          <path
            d="M 60 80 H 420 M 60 120 H 380 M 100 240 L 200 340 L 300 280 L 400 380 M 80 480 Q 240 440, 400 480"
            stroke="#F4EFE6"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.7"
          />

          {/* Manga Shading Ticks */}
          <path
            d="M 40 50 L 70 80 M 55 50 L 85 80 M 70 50 L 100 80 M 85 50 L 115 80"
            stroke="#F4EFE6"
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Halftone Screentone Fill */}
          <rect x="22" y="32" width="436" height="106" fill="url(#mangaHalftone)" opacity="0.3" />
        </svg>
      </motion.div>
    </div>
  )
}

/**
 * 03. Identity / Tech Stack Background Manga Atmosphere
 */
export function MangaStackBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0.04 } : { opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 0.05, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.0, ease: 'easeOut' }}
        className="absolute bottom-10 right-0 md:right-16 w-[360px] sm:w-[540px] h-[480px] opacity-[0.05] pointer-events-none"
      >
        <svg className="w-full h-full" viewBox="0 0 540 480" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Isometric Manga Technical Panel Grid */}
          <polygon points="60,120 270,30 480,120 270,210" stroke="#F4EFE6" strokeWidth="1.2" fill="url(#mangaHalftone)" opacity="0.25" />
          <polygon points="60,240 270,150 480,240 270,330" stroke="#FF056D" strokeWidth="1" opacity="0.3" />
          <polygon points="60,360 270,270 480,360 270,450" stroke="#F4EFE6" strokeWidth="1.2" opacity="0.4" />

          {/* Vertical Grid Axis Lines */}
          <line x1="60" y1="120" x2="60" y2="360" stroke="#F4EFE6" strokeWidth="1" opacity="0.4" />
          <line x1="270" y1="30" x2="270" y2="450" stroke="#F4EFE6" strokeWidth="1.2" opacity="0.5" />
          <line x1="480" y1="120" x2="480" y2="360" stroke="#F4EFE6" strokeWidth="1" opacity="0.4" />
        </svg>
      </motion.div>
    </div>
  )
}

/**
 * 04. Timeline / Journey Background Manga Atmosphere
 */
export function MangaJourneyBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0.04 } : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 0.05, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
        className="absolute top-1/3 left-0 md:left-12 w-[300px] sm:w-[460px] h-[520px] opacity-[0.05] pointer-events-none"
      >
        <svg className="w-full h-full" viewBox="0 0 460 520" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Diagonal Manga Storyline Frame */}
          <path d="M 40 40 L 420 80 L 380 460 L 20 420 Z" stroke="#F4EFE6" strokeWidth="1.2" opacity="0.5" />
          
          {/* Manga Halftone Inset */}
          <path d="M 50 60 L 410 100 L 390 240 L 30 200 Z" fill="url(#mangaHalftone)" opacity="0.3" />

          {/* Faint Silhouette Contour Line */}
          <path
            d="M 120 380 Q 180 320, 240 340 T 320 300 Q 360 280, 400 320"
            stroke="#FF056D"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.45"
          />
        </svg>
      </motion.div>
    </div>
  )
}

/**
 * 05. Beyond Code / Personality Background Manga Atmosphere
 * Slightly more visible personality section atmosphere
 */
export function MangaPersonalityBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0.06 } : { opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 0.07, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.0, ease: 'easeOut' }}
        className="absolute top-16 right-0 md:right-10 w-[380px] sm:w-[560px] h-[540px] opacity-[0.07] pointer-events-none"
      >
        <svg className="w-full h-full" viewBox="0 0 560 540" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dynamic Action Manga Panel Border */}
          <polygon points="40,30 520,70 480,500 20,460" stroke="#F4EFE6" strokeWidth="1.5" opacity="0.65" />
          <line x1="40" y1="260" x2="500" y2="290" stroke="#FF056D" strokeWidth="1.2" opacity="0.5" />

          {/* Radial Manga Speedtone Burst in Background */}
          <path
            d="M 270 260 L 40 30 M 270 260 L 160 30 M 270 260 L 280 30 M 270 260 L 400 30 M 270 260 L 520 70 M 270 260 L 510 180 M 270 260 L 490 340 M 270 260 L 480 500 M 270 260 L 320 490 M 270 260 L 160 470 M 270 260 L 20 460 M 270 260 L 30 340 M 270 260 L 35 180"
            stroke="#F4EFE6"
            strokeWidth="0.8"
            opacity="0.3"
          />

          {/* Halftone Overlay Box */}
          <polygon points="42,32 518,72 505,180 37,140" fill="url(#mangaHalftonePink)" opacity="0.3" />
        </svg>
      </motion.div>
    </div>
  )
}

/**
 * 06. Contact Background Manga Atmosphere
 */
export function MangaContactBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0.04 } : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 0.05, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
        className="absolute bottom-4 left-0 md:left-20 w-[340px] sm:w-[500px] h-[360px] opacity-[0.05] pointer-events-none"
      >
        <svg className="w-full h-full" viewBox="0 0 500 360" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Closing Manga Panel Horizon Frame */}
          <rect x="30" y="40" width="440" height="280" stroke="#F4EFE6" strokeWidth="1" strokeDasharray="8 4" opacity="0.5" />
          <line x1="30" y1="180" x2="470" y2="180" stroke="#FF056D" strokeWidth="1" opacity="0.35" />

          {/* Soft Faint Ink Wash Lines */}
          <path
            d="M 50 100 Q 250 80, 450 120 M 50 140 Q 250 120, 450 160 M 50 220 Q 250 200, 450 240"
            stroke="#F4EFE6"
            strokeWidth="1.2"
            opacity="0.4"
          />
        </svg>
      </motion.div>
    </div>
  )
}
