import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, FileText, Award } from 'lucide-react'
import { useAudioFx } from '../hooks/useAudioFx'
import { getPublicUrl } from '../utils/getPublicUrl'

export interface LightboxData {
  title: string
  subtitle: string
  imageSrc: string
  type: 'PAPER' | 'CERTIFICATE'
  linkUrl?: string
}

interface PublicationLightboxModalProps {
  data: LightboxData | null
  onClose: () => void
}

export function PublicationLightboxModal({ data, onClose }: PublicationLightboxModalProps) {
  const { playClick } = useAudioFx()

  useEffect(() => {
    if (!data) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [data, onClose])

  return (
    <AnimatePresence>
      {data && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0D0E12] border border-white/20 shadow-2xl overflow-hidden z-10 my-auto"
          >
            {/* Header Action Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-[#14151A] border-b border-white/10 shrink-0 gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
                <span className="font-mono text-xs font-bold text-[#FF056D] tracking-wider uppercase flex items-center gap-1.5 shrink-0">
                  {data.type === 'CERTIFICATE' ? <Award className="w-4 h-4 text-[#FF056D]" /> : <FileText className="w-4 h-4 text-[#FF056D]" />}
                  // {data.type === 'CERTIFICATE' ? 'CERTIFICATE' : 'PAPER PREVIEW'}
                </span>
                <span className="text-[#5E5D66] hidden sm:inline">|</span>
                <span className="font-mono text-xs text-[#8E8A94] hidden sm:inline truncate max-w-xs">
                  {data.subtitle}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {data.linkUrl && (
                  <a
                    href={data.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    data-cursor="DOI"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-[#8E8A94] hover:text-[#F4EFE6] transition-colors touch-manipulation"
                  >
                    <span>DOI ↗</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

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

            {/* Modal Content / High-Res Image View */}
            <div className="overflow-y-auto p-4 sm:p-8 bg-[#07080A] flex flex-col items-center">
              <div className="text-center max-w-2xl mb-6">
                <h3 className="font-display font-bold text-lg sm:text-xl text-[#F4EFE6] uppercase tracking-tight">
                  {data.title}
                </h3>
                <p className="font-mono text-xs text-[#8E8A94] mt-1">
                  {data.subtitle}
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden border border-white/15 bg-white/5 shadow-2xl max-w-3xl">
                <img
                  src={getPublicUrl(data.imageSrc)}
                  alt={data.title}
                  className="w-full h-auto object-contain max-h-[68vh] select-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
