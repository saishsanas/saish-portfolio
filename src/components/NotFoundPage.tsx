import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Home, AlertTriangle, ArrowLeft } from 'lucide-react'
import { useAudioFx } from '../hooks/useAudioFx'

interface NotFoundPageProps {
  onReturnHome: () => void
}

export function NotFoundPage({ onReturnHome }: NotFoundPageProps) {
  const { playClick, playHover } = useAudioFx()
  const [currentPath, setCurrentPath] = useState('/')

  useEffect(() => {
    setCurrentPath(window.location.pathname)

    // Keyboard support: ESC or Backspace returns home
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        playClick()
        onReturnHome()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onReturnHome, playClick])

  return (
    <div className="min-h-screen bg-[#090A0C] text-[#F4EFE6] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#FF056D]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Terminal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl rounded-3xl bg-[#0D0E12] border border-white/15 p-6 sm:p-10 shadow-2xl space-y-8 relative z-10"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#FF056D]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF056D] animate-ping" />
            <span className="font-bold tracking-wider">SYSTEM FAULT // STATUS_404</span>
          </div>
          <span className="text-[#8E8A94]">PUNE_HOST_NODE</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#15161A] border border-white/10 flex items-center justify-center text-[#FF056D]">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#F4EFE6] tracking-tight uppercase">
              RESOURCE <span className="text-[#FF056D]">NOT FOUND</span>
            </h1>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#8E8A94] leading-relaxed">
            The requested route does not exist in this system.
          </p>
        </div>

        {/* Terminal Trace Readout */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#07080A] border border-white/10 font-mono text-xs text-[#8E8A94] space-y-2">
          <div className="flex items-center gap-2 text-[#F4EFE6] pb-2 border-b border-white/5">
            <Terminal className="w-3.5 h-3.5 text-[#FF056D]" />
            <span className="font-bold text-[11px] uppercase">RUNTIME DIAGNOSTIC TRACE</span>
          </div>
          <p className="text-[#F4EFE6]/90">
            <span className="text-[#FF056D] font-bold">&gt;</span> trace.route(&quot;<span className="text-[#F4EFE6]">{currentPath}</span>&quot;)
          </p>
          <p>
            <span className="text-[#8E8A94]">&gt;</span> result: <span className="text-[#FF056D] font-bold">NOT_FOUND</span>
          </p>
          <p>
            <span className="text-[#8E8A94]">&gt;</span> handler: <span className="text-[#8E8A94]">No Controller mapping found for requested URI</span>
          </p>
          <p className="text-[#8E8A94] flex items-center gap-1.5 pt-1">
            <span className="text-[#FF056D]">&gt;</span>
            <span>recovering_home...</span>
            <span className="inline-block w-2 h-3.5 bg-[#FF056D] animate-pulse ml-1" />
          </p>
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            onClick={() => {
              playClick()
              onReturnHome()
            }}
            onMouseEnter={playHover}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#FF056D] hover:bg-[#D9045D] text-[#090A0C] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#FF056D]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF056D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090A0C] active:scale-98"
          >
            <Home className="w-4 h-4" />
            <span>RETURN HOME ↗</span>
          </button>

          <button
            onClick={() => {
              playClick()
              if (window.history.length > 1) {
                window.history.back()
              } else {
                onReturnHome()
              }
            }}
            onMouseEnter={playHover}
            className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-[#15161A] hover:bg-[#1D1E24] border border-white/10 text-[#F4EFE6] font-mono text-xs font-semibold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF056D]"
          >
            <ArrowLeft className="w-4 h-4 text-[#8E8A94]" />
            <span>PREVIOUS STATE</span>
          </button>
        </div>

        {/* Micro Footer Hint */}
        <div className="pt-2 text-center sm:text-left font-mono text-[11px] text-[#5E5D66]">
          Press <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-[#8E8A94] border border-white/10">ESC</kbd> to return to executive command console
        </div>
      </motion.div>
    </div>
  )
}
