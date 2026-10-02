import { ArrowUp } from 'lucide-react'
import { useAudioFx } from '../hooks/useAudioFx'

interface FooterProps {
  onNavigatePanel?: (panelIndex: number) => void
}

export function Footer({ onNavigatePanel }: FooterProps) {
  const { playClick, playHover } = useAudioFx()

  const scrollToTop = () => {
    playClick()
    if (onNavigatePanel) {
      onNavigatePanel(0)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-white/10 bg-[#07080A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-[#8E8A94]">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <img
              src="/images/saish-photo-passport.jpg"
              alt="Saish Sanas"
              className="w-8 h-8 rounded-full object-cover border border-[#FF056D]/40 shrink-0 grayscale hover:grayscale-0 transition-all duration-300 shadow-sm"
              loading="lazy"
            />
            <span className="text-[#F4EFE6] font-bold tracking-wider">SAISH SANAS</span>
          </div>
          <span className="hidden sm:inline text-[#5E5B56]">/</span>
          <span>SOFTWARE & SYSTEMS DEVELOPER</span>
          <span className="hidden sm:inline text-[#5E5B56]">/</span>
          <span className="text-[#FF056D] font-semibold">PUNE, INDIA</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-right">
          <span className="text-[#5E5B56] text-[11px]">
            ARCHITECTED FOR PERFORMANCE & RELIABILITY
          </span>

          <button
            onClick={scrollToTop}
            onMouseEnter={playHover}
            data-cursor="TOP"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#8E8A94] hover:text-[#FF056D] border border-white/10 hover:border-[#FF056D]/40 transition-colors flex items-center gap-1.5"
            aria-label="Scroll back to top"
          >
            <span className="text-[10px] font-bold">TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
