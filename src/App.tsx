import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Terminal } from 'lucide-react'
import { AudioProvider, useAudioFx } from './hooks/useAudioFx'
import { CustomCursor } from './components/CustomCursor'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Identity } from './components/Identity'
import { TechStack } from './components/TechStack'
import { FeaturedWork } from './components/FeaturedWork'
import { ArchitectureFlow } from './components/ArchitectureFlow'
import { Timeline } from './components/Timeline'
import { Credentials } from './components/Credentials'
import { ResearchPublications } from './components/ResearchPublications'
import { BuildPhilosophy } from './components/BuildPhilosophy'
import { Personality } from './components/Personality'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { LightboxData } from './components/PublicationLightboxModal'
import { Project, Credential } from './types'

const ResumeModal = lazy(() => import('./components/ResumeModal').then((m) => ({ default: m.ResumeModal })))
const ProjectModal = lazy(() => import('./components/ProjectModal').then((m) => ({ default: m.ProjectModal })))
const CertificateModal = lazy(() => import('./components/CertificateModal').then((m) => ({ default: m.CertificateModal })))
const PublicationLightboxModal = lazy(() => import('./components/PublicationLightboxModal').then((m) => ({ default: m.PublicationLightboxModal })))
const NotFoundPage = lazy(() => import('./components/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

const PANEL_NAMES = [
  'HOME // EXECUTIVE OVERVIEW',
  'WORK // PRODUCTION ARCHITECTURES',
  'ENGINEERING // SYSTEMS & STACK',
  'JOURNEY // ACCREDITATIONS & SCHOLARSHIP',
  'CONTACT // RECRUITER DESK & CHANNELS',
]

const normalizePath = (path: string) => {
  const cleanPath = path.split('?')[0].split('#')[0]
  return cleanPath.replace(/\/+$/, '')
}

const getBaseHomePath = () => {
  const pathname = window.location.pathname
  if (pathname.startsWith('/saish-portfolio')) {
    return '/saish-portfolio/'
  }
  return '/'
}

const isHomeRoute = (pathname: string) => {
  const normalized = normalizePath(pathname)
  const baseNormalized = normalizePath(import.meta.env.BASE_URL || '')

  return (
    normalized === '' ||
    normalized === '/' ||
    normalized === '/saish-portfolio' ||
    (baseNormalized !== '' && baseNormalized !== '.' && normalized === baseNormalized)
  )
}

function PortfolioContent() {
  const { playClick, playHover } = useAudioFx()
  const [activePanel, setActivePanel] = useState(0)
  const [direction, setDirection] = useState(1)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  // Modal states
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null)
  const [selectedArtwork, setSelectedArtwork] = useState<LightboxData | null>(null)

  // Automatic body scroll lock while ANY modal is open, with guaranteed cleanup on close
  useEffect(() => {
    const isAnyModalOpen =
      isResumeOpen ||
      selectedProject !== null ||
      selectedCredential !== null ||
      selectedArtwork !== null

    if (isAnyModalOpen) {
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prevOverflow
      }
    }
  }, [isResumeOpen, selectedProject, selectedCredential, selectedArtwork])

  // Listen to popstate for SPA routing
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Check URL hash on initial load
  useEffect(() => {
    const hash = window.location.hash.toLowerCase()
    if (hash === '#work') setActivePanel(1)
    else if (hash === '#stack' || hash === '#architecture' || hash === '#engineering') setActivePanel(2)
    else if (hash === '#journey' || hash === '#credentials' || hash === '#research') setActivePanel(3)
    else if (hash === '#contact' || hash === '#personality') setActivePanel(4)
  }, [])

  const handleSelectPanel = useCallback(
    (index: number) => {
      if (index === activePanel) return
      setDirection(index > activePanel ? 1 : -1)
      setActivePanel(index)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [activePanel]
  )

  const handleConnectClick = useCallback(() => {
    if (activePanel !== 4) {
      setDirection(1)
      setActivePanel(4)
    }

    const start = performance.now()
    const checkAndScroll = () => {
      const contactOptions = document.getElementById('contact-options')
      if (contactOptions) {
        contactOptions.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (performance.now() - start < 1000) {
        requestAnimationFrame(checkAndScroll)
      }
    }

    requestAnimationFrame(checkAndScroll)
  }, [activePanel])

  // Keyboard navigation across panels [1-5] and Arrow Keys [← / →]
  useEffect(() => {
    const isAnyModalOpen =
      isResumeOpen ||
      selectedProject !== null ||
      selectedCredential !== null ||
      selectedArtwork !== null

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside a form input/textarea or a modal is open
      const target = e.target as HTMLElement
      if (isAnyModalOpen || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        if (activePanel < 4) {
          playClick()
          handleSelectPanel(activePanel + 1)
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (activePanel > 0) {
          playClick()
          handleSelectPanel(activePanel - 1)
        }
      } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const targetIndex = parseInt(e.key, 10) - 1
        playClick()
        handleSelectPanel(targetIndex)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePanel, isResumeOpen, selectedProject, selectedCredential, selectedArtwork, handleSelectPanel, playClick])

  // Custom 404 Route handling
  if (!isHomeRoute(currentPath)) {
    return (
      <Suspense fallback={null}>
        <NotFoundPage
          onReturnHome={() => {
            const homePath = getBaseHomePath()
            window.history.pushState({}, '', homePath)
            setCurrentPath(homePath)
            setActivePanel(0)
          }}
        />
      </Suspense>
    )
  }

  return (
    <div className="min-h-screen bg-[#090A0C] text-[#F4EFE6] relative selection:bg-[#FF056D] selection:text-[#090A0C] flex flex-col justify-between overflow-x-hidden">
      {/* Custom magnetic spring cursor */}
      <CustomCursor />

      {/* Top Persistent Chrome Navigation */}
      <Navbar
        activePanel={activePanel}
        onSelectPanel={handleSelectPanel}
        onConnectClick={handleConnectClick}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Central Application Stage: Framer Motion Animated Panels */}
      <main className="flex-1 w-full max-w-7xl mx-auto pt-20 pb-20 relative px-2 sm:px-4 lg:px-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activePanel}
            initial={{ opacity: 0, y: direction * 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction * -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full focus:outline-none"
            tabIndex={-1}
          >
            {/* PANEL 01 — HOME */}
            {activePanel === 0 && (
              <div className="space-y-12">
                <Hero
                  onOpenResume={() => setIsResumeOpen(true)}
                  onNavigateWork={() => handleSelectPanel(1)}
                />
                <Identity />
              </div>
            )}

            {/* PANEL 02 — WORK */}
            {activePanel === 1 && (
              <div>
                <FeaturedWork onSelectProject={(project) => setSelectedProject(project)} />
              </div>
            )}

            {/* PANEL 03 — ENGINEERING */}
            {activePanel === 2 && (
              <div className="space-y-16">
                <TechStack />
                <ArchitectureFlow />
                <BuildPhilosophy />
              </div>
            )}

            {/* PANEL 04 — JOURNEY */}
            {activePanel === 3 && (
              <div className="space-y-16">
                <Timeline />
                <Credentials onSelectCredential={(cred) => setSelectedCredential(cred)} />
                <ResearchPublications onSelectArtwork={(art) => setSelectedArtwork(art)} />
              </div>
            )}

            {/* PANEL 05 — CONTACT / PERSONAL */}
            {activePanel === 4 && (
              <div className="space-y-16">
                <Personality />
                <Contact onOpenResume={() => setIsResumeOpen(true)} />
                <Footer onNavigatePanel={handleSelectPanel} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Telemetry & Panel Switcher Strip */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-[#090A0C]/90 backdrop-blur-md border-t border-white/10 py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          {/* Current Panel Status */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF056D] animate-pulse" />
            <span className="text-[#FF056D] font-bold">PANEL 0{activePanel + 1} / 05</span>
            <span className="text-[#5E5D66] hidden sm:inline">//</span>
            <span className="text-[#F4EFE6]/80 hidden sm:inline">{PANEL_NAMES[activePanel]}</span>
          </div>

          {/* Keyboard Hint (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] text-[#8E8A94]">
            <Terminal className="w-3.5 h-3.5 text-[#FF056D]" />
            <span>NAVIGATE:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[#F4EFE6]">←</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[#F4EFE6]">→</kbd>
            <span className="text-[#5E5D66]">OR</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[#F4EFE6]">1-5</kbd>
          </div>

          {/* Stage Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (activePanel > 0) {
                  playClick()
                  handleSelectPanel(activePanel - 1)
                }
              }}
              disabled={activePanel === 0}
              onMouseEnter={playHover}
              className={`p-1.5 sm:px-3 sm:py-1 rounded-lg border font-mono text-xs flex items-center gap-1 transition-all ${
                activePanel === 0
                  ? 'border-white/5 text-[#5E5D66] cursor-not-allowed opacity-40'
                  : 'border-white/10 text-[#8E8A94] hover:text-[#F4EFE6] hover:border-[#FF056D]/50 hover:bg-white/5'
              }`}
              aria-label="Previous Panel"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PREV</span>
            </button>

            <button
              onClick={() => {
                if (activePanel < 4) {
                  playClick()
                  handleSelectPanel(activePanel + 1)
                }
              }}
              disabled={activePanel === 4}
              onMouseEnter={playHover}
              className={`p-1.5 sm:px-3 sm:py-1 rounded-lg border font-mono text-xs flex items-center gap-1 transition-all ${
                activePanel === 4
                  ? 'border-white/5 text-[#5E5D66] cursor-not-allowed opacity-40'
                  : 'bg-[#FF056D] text-[#090A0C] border-[#FF056D] font-bold shadow-md shadow-[#FF056D]/20 hover:bg-[#D9045D]'
              }`}
              aria-label="Next Panel"
            >
              <span className="hidden sm:inline">NEXT</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* Modals with Focus Trap & Escape key dismissal */}
      <Suspense fallback={null}>
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        <CertificateModal credential={selectedCredential} onClose={() => setSelectedCredential(null)} />
        <PublicationLightboxModal data={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
      </Suspense>
    </div>
  )
}

export default function App() {
  return (
    <AudioProvider>
      <PortfolioContent />
    </AudioProvider>
  )
}
