import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, FileText, Menu, X, ArrowUpRight } from 'lucide-react'
import { useAudioFx } from '../hooks/useAudioFx'

interface NavbarProps {
  onOpenResume: () => void
}

export function Navbar({ onOpenResume }: NavbarProps) {
  const { isMuted, toggleSound, playClick, playHover } = useAudioFx()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'WORK', href: '#work', number: '01' },
    { label: 'STACK', href: '#stack', number: '02' },
    { label: 'ARCHITECTURE', href: '#architecture', number: '03' },
    { label: 'JOURNEY', href: '#journey', number: '04' },
    { label: 'CREDENTIALS', href: '#credentials', number: '05' },
    { label: 'RESEARCH', href: '#research', number: '06' },
    { label: 'PHILOSOPHY', href: '#philosophy', number: '07' },
  ]

  const scrollTo = (href: string) => {
    playClick()
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#090A0C]/92 backdrop-blur-md border-b border-white/10 py-3'
            : 'bg-transparent py-5 md:py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brandmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onMouseEnter={playHover}
            className="group flex items-center gap-3"
            data-cursor="HOME"
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
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#15161A]/80 backdrop-blur border border-white/10 rounded-full px-4 py-1.5 shadow-2xl">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                onMouseEnter={playHover}
                data-cursor="GO"
                className="px-3.5 py-1 text-xs font-mono font-medium text-[#8E8A94] hover:text-[#F4EFE6] hover:bg-white/5 rounded-full transition-all flex items-center gap-1.5 group"
              >
                <span className="text-[10px] text-[#FF056D] font-semibold group-hover:text-[#F4EFE6] transition-colors">{link.number}</span>
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                toggleSound()
                playClick()
              }}
              onMouseEnter={playHover}
              title={isMuted ? 'Turn Sound FX On' : 'Mute Sound FX'}
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-[#15161A] border border-white/10 hover:border-[#FF056D]/60 text-[#8E8A94] hover:text-[#FF056D] transition-all"
              data-cursor={isMuted ? 'UNMUTE' : 'MUTE'}
              aria-label="Toggle Sound Effects"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#FF056D]" />}
            </button>

            {/* Resume Button */}
            <button
              onClick={() => {
                playClick()
                onOpenResume()
              }}
              onMouseEnter={playHover}
              data-cursor="RESUME"
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono font-medium text-[#F4EFE6] hover:border-[#FF056D]/50 transition-all group"
            >
              <FileText className="w-3.5 h-3.5 text-[#FF056D] group-hover:scale-110 transition-transform" />
              <span>RESUME ↗</span>
            </button>

            {/* Contact CTA */}
            <button
              onClick={() => scrollTo('#contact')}
              onMouseEnter={playHover}
              data-cursor="CONNECT"
              className="px-4 py-1.5 rounded-full bg-[#FF056D] hover:bg-[#D9045D] text-[#090A0C] text-xs font-mono font-bold tracking-wider transition-all transform active:scale-95 shadow-md shadow-[#FF056D]/20"
            >
              LET'S TALK
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => {
                playClick()
                setMobileMenuOpen(!mobileMenuOpen)
              }}
              className="lg:hidden p-2 text-[#8E8A94] hover:text-[#F4EFE6] transition-colors"
              aria-label="Open Navigation Menu"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[60px] z-30 bg-[#090A0C]/98 backdrop-blur-xl border-b border-white/10 lg:hidden flex flex-col justify-between p-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-2 pt-4">
              <span className="font-mono text-xs text-[#FF056D] tracking-widest uppercase mb-2 font-bold">
                // NAVIGATION PROTOCOL
              </span>
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="flex items-center justify-between py-3 border-b border-white/5 text-left text-lg font-display font-semibold text-[#F4EFE6] hover:text-[#FF056D] transition-colors"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-[#8E8A94]">{link.number}</span>
                </button>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenResume()
                }}
                className="w-full py-3 rounded-lg bg-white/10 border border-white/15 text-[#F4EFE6] font-mono text-sm font-semibold flex items-center justify-center gap-2"
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
                <span className="font-mono text-[10px] text-[#8E8A84]">SYS_V3.0.0</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
