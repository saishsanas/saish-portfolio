import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ExternalLink, FileText } from 'lucide-react'
import { useAudioFx } from '../hooks/useAudioFx'
import { getPublicUrl } from '../utils/getPublicUrl'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { playClick } = useAudioFx()
  const resumeUrl = getPublicUrl('/resume/Saish-Sanas-Resume.pdf')

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-5xl h-[90vh] flex flex-col rounded-3xl bg-[#0D0E12] border border-white/20 shadow-2xl overflow-hidden z-10 my-auto"
          >
            {/* Header Action Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#14151A] border-b border-white/10 shrink-0 gap-3">
              <div className="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden">
                <FileText className="w-4 h-4 text-[#FF056D] shrink-0" />
                <span className="font-mono text-xs font-bold text-[#FF056D] tracking-wider uppercase shrink-0">
                  // OFFICIAL RESUME
                </span>
                <span className="text-[#5E5B56] hidden sm:inline">|</span>
                <span className="font-mono text-xs text-[#F4EFE6] truncate hidden sm:inline">
                  Saish-Sanas-Resume.pdf
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  data-cursor="VIEW"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-[#F4EFE6] transition-all touch-manipulation"
                  title="Open PDF in New Tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>VIEW FULL PDF ↗</span>
                </a>

                <a
                  href={resumeUrl}
                  download="Saish-Sanas-Resume.pdf"
                  onClick={playClick}
                  data-cursor="DOWNLOAD"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FF056D] hover:bg-[#D9045D] text-xs font-mono font-bold text-[#090A0C] transition-all shadow-md shadow-[#FF056D]/20 touch-manipulation"
                  title="Download Resume PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">DOWNLOAD PDF</span>
                  <span className="xs:hidden">PDF</span>
                </a>

                <button
                  onClick={onClose}
                  data-cursor="CLOSE"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#8E8A94] hover:text-[#F4EFE6] transition-colors touch-manipulation ml-1"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer Frame */}
            <div className="flex-1 w-full h-full bg-[#090A0D] overflow-hidden relative flex flex-col">
              <object
                data={resumeUrl}
                type="application/pdf"
                className="w-full h-full border-0 bg-white"
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[#090A0D] text-[#8E8A94] font-mono space-y-4">
                  <p className="text-base text-[#F4EFE6] font-semibold">
                    Saish Sanas — Software Developer Resume PDF
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-[#FF056D] text-[#090A0C] font-bold text-xs uppercase shadow-md shadow-[#FF056D]/20"
                    >
                      VIEW PDF IN NEW TAB ↗
                    </a>
                    <a
                      href={resumeUrl}
                      download="Saish-Sanas-Resume.pdf"
                      className="px-5 py-2.5 rounded-xl bg-white/10 text-[#F4EFE6] font-bold text-xs uppercase border border-white/10"
                    >
                      DOWNLOAD RESUME PDF ↗
                    </a>
                  </div>
                </div>
              </object>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
