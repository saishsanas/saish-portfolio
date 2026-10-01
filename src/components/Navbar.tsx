import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, FileText, Menu, X } from 'lucide-react'
import { useAudioFx } from '../hooks/useAudioFx'

interface NavbarProps {
  onOpenResume: () => void
  activePanel: number
  onSelectPanel: (panelIndex: number) => void
}

export function Navbar({ onOpenResume, activePanel, onSelectPanel }: NavbarProps) {
  const { isMuted, toggleSound, playClick, playHover } = useAudioFx()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navPanels = [
    { label: 'HOME', number: '01', panelIndex: 0 },
    { label: 'WORK', number: '02', panelIndex: 1 },
    { label: 'ENGINEERING', number: '03', panelIndex: 2 },
    { label: 'JOURNEY', number: '04', panelIndex: 3 },
    { label: 'CONTACT', number: '05', panelIndex: 4 },
  ]

  const handlePanelClick = (index: number) => {
    playClick()
    setMobileMenuOpen(false)
    onSelectPanel(index)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#090A0C]/94 backdrop-blur-md border-b border-white/10 py-2.5'
            : 'bg-[#090A0C]/70 backdrop-blur-sm py-4 md:py-5 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brandmark */}
          <button
            onClick={() => handlePanelClick(0)}
            onMouseEnter={playHover}
            className="group flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF056D] rounded-xl p-1"
            data-cursor="HOME"
            aria-label="Return to Home Panel"
          >
            <div className="w-8 h-8 rounded bg-[#15161A] border border-[#202126] group-hover:border-[#FF056D] transition-colors flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-[#FF056D]">SS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-wider text-[#F4EFE6] group-hover:text-[#FF056D] transition-colors">
                SAISH SANAS
              </span>
              <span className="font-mono text-[10px] text-[#8E8A94] tracking-widest uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF056D] animate-pulse"></span>
                JAVA BACKEND DEV
              </span>
            </div>
          </button>

          {/* Desktop Primary Panel Navigation */}
          <nav
            role="tablist"
            aria-label="Portfolio Panels"
            className="hidden lg:flex items-center gap-1 bg-[#121318]/90 backdrop-blur border border-white/10 rounded-full p-1.5 shadow-2xl"
          >
            {navPanels.map((panel) => {
              const isActive = activePanel === panel.panelIndex
              return (
                <button
                  key={panel.label}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handlePanelClick(panel.panelIndex)}
                  onMouseEnter={playHover}
                  data-cursor={panel.label}
                  className={`relative px-4 py-1.5 text-xs font-mono rounded-full transition-all duration-300 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF056D] ${
                    isActive
                      ? 'text-[#090A0C] font-bold shadow-md shadow-[#FF056D]/20'
                      : 'text-[#8E8A94] hover:text-[#F4EFE6] hover:bg-white/5 font-medium'
                  }`}
                >
                  {/* Sliding active pill indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPanelPill"
                      className="absolute inset-0 bg-[#FF056D] rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`text-[10px] ${isActive ? 'text-[#090A0C]' : 'text-[#FF056D]'}`}>
                    {panel.number}
                  </span>
                  <span>{panel.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                toggleSound()
                playClick()
              }}
              onMouseEnter={playHover}
              title={isMuted ? 'Turn Sound FX On' : 'Mute Sound FX'}
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#15161A] border border-white/10 hover:border-[#FF056D]/60 text-[#8E8A94] hover:text-[#FF056D] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF056D]"
              data-cursor={isMuted ? 'UNMUTE' : 'MUTE'}
              aria-label="Toggle Sound Effects"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF056D]" />}
            </button>

            {/* Resume Button */}
            <button
              onClick={() => {
                playClick()
                onOpenResume()
              }}
              onMouseEnter={playHover}
              data-cursor="RESUME"
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono font-medium text-[#F4EFE6] hover:border-[#FF056D]/50 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF056D]"
            >
              <FileText className="w-3.5 h-3.5 text-[#FF056D] group-hover:scale-110 transition-transform" />
              <span>RESUME ↗</span>
            </button>

            {/* Contact CTA */}
            <button
              onClick={() => handlePanelClick(4)}
              onMouseEnter={playHover}
              data-cursor="CONNECT"
              className="px-3.5 sm:px-4 py-1.5 rounded-full bg-[#FF056D] hover:bg-[#D9045D] text-[#090A0C] text-xs font-mono font-bold tracking-wider transition-all transform active:scale-95 shadow-md shadow-[#FF056D]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF056D]"
            >
              LET&apos;S TALK
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => {
                playClick()
                setMobileMenuOpen(!mobileMenuOpen)
              }}
              className="lg:hidden p-2 text-[#8E8A94] hover:text-[#F4EFE6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF056D] rounded-lg"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[56px] z-30 bg-[#090A0C]/98 backdrop-blur-xl border-b border-white/10 lg:hidden flex flex-col justify-between p-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-2 pt-2">
              <span className="font-mono text-xs text-[#FF056D] tracking-widest uppercase mb-2 font-bold">
                // SELECT EXPERIENCE PANEL
              </span>
              {navPanels.map((panel) => {
                const isActive = activePanel === panel.panelIndex
                return (
                  <button
                    key={panel.label}
                    onClick={() => handlePanelClick(panel.panelIndex)}
                    className={`flex items-center justify-between py-3.5 px-4 rounded-xl border transition-all text-left ${
                      isActive
                        ? 'bg-[#FF056D]/15 border-[#FF056D] text-[#FF056D] font-bold'
                        : 'border-white/5 text-[#F4EFE6] hover:bg-white/5'
                    }`}
                  >
                    <span className="font-display font-semibold text-lg">{panel.label}</span>
                    <span className="font-mono text-xs text-[#8E8A94]">{panel.number}</span>
                  </button>
                )
              })}
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenResume()
                }}
                className="w-full py-3 rounded-xl bg-white/10 border border-white/15 text-[#F4EFE6] font-mono text-sm font-semibold flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#FF056D]" />
                VIEW RESUME ↗
              </button>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={toggleSound}
                  className="flex items-center gap-2 text-xs font-mono text-[#8E8A94] hover:text-white"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#FF056D]" />}
                  <span>{isMuted ? 'SOUND MUTED' : 'SOUND ACTIVE'}</span>
                </button>
                <span className="font-mono text-[10px] text-[#8E8A84]">PANEL {activePanel + 1} / 5</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
