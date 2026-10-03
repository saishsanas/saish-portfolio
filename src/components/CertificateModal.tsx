import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ExternalLink } from 'lucide-react'
import { Credential } from '../types'
import { useAudioFx } from '../hooks/useAudioFx'
import { getPublicUrl } from '../utils/getPublicUrl'

interface CertificateModalProps {
  credential: Credential | null
  onClose: () => void
}

export function CertificateModal({ credential, onClose }: CertificateModalProps) {
  const { playClick } = useAudioFx()

  useEffect(() => {
    if (!credential) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [credential, onClose])

  return (
    <AnimatePresence>
      {credential && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0E1015] border border-white/20 shadow-2xl overflow-hidden z-10 my-auto"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-[#14151B] border-b border-white/10 shrink-0 gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
                <span className="font-mono text-xs font-bold text-[#FF056D] uppercase shrink-0">
                  // {credential.type === 'DEGREE' ? 'ACADEMIC DEGREE RECORD' : 'OFFICIAL ACCREDITATION'}
                </span>
                <span className="text-[#5E5D66] hidden sm:inline">|</span>
                <span className="font-mono text-xs text-[#F4EFE6] truncate hidden sm:inline">{credential.title}</span>
              </div>

              <button
                onClick={onClose}
                data-cursor="CLOSE"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#8E8A94] hover:text-[#F4EFE6] transition-colors shrink-0 touch-manipulation ml-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="font-mono text-xs text-[#FF056D] font-bold block mb-1">
                    {credential.issuer} • {credential.issuedDate}
                  </span>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-[#F4EFE6] uppercase">
                    {credential.title}
                  </h2>
                  {credential.credentialId && (
                    <span className="font-mono text-xs text-[#8E8A94] block mt-1">
                      VERIFIED CREDENTIAL ID: <span className="text-[#F4EFE6] font-semibold">{credential.credentialId}</span>
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 self-start sm:self-center shrink-0">
                  {credential.verifyUrl && (
                    <a
                      href={credential.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClick}
                      data-cursor="VERIFY"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF056D] hover:bg-[#D9045D] text-[#090A0C] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#FF056D]/20 touch-manipulation"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>VERIFY ONLINE ↗</span>
                    </a>
                  )}
                  {(credential.pdfUrl || credential.certificateImage) && (
                    <a
                      href={getPublicUrl(credential.pdfUrl || credential.certificateImage || '')}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClick}
                      data-cursor="DOWNLOAD"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#F4EFE6] font-mono text-xs font-bold uppercase tracking-wider transition-all touch-manipulation"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>
                        {credential.pdfUrl
                          ? 'DOWNLOAD CERTIFICATE PDF ↗'
                          : credential.type === 'DEGREE'
                          ? 'DOWNLOAD DOCUMENT ↗'
                          : 'DOWNLOAD CERTIFICATE ↗'}
                      </span>
                    </a>
                  )}
                </div>
              </div>

              {/* Certificate Artwork Display */}
              {credential.certificateImage ? (
                <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#090A0C] p-2 flex items-center justify-center shadow-inner">
                  <img
                    src={getPublicUrl(credential.certificateImage)}
                    alt={credential.title}
                    className="max-h-[60vh] w-auto object-contain rounded-xl"
                  />
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-[#14151B] border border-white/10 text-center font-mono text-xs text-[#8E8A94]">
                  Official degree curriculum verified under Savitribai Phule Pune University (SPPU).
                </div>
              )}

              <p className="text-sm text-[#8E8A94] font-sans leading-relaxed">
                {credential.description}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
