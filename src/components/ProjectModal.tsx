import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, CheckCircle2, Smartphone, GitBranch } from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import { Project } from '../types'
import { useAudioFx } from '../hooks/useAudioFx'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { playClick } = useAudioFx()

  useEffect(() => {
    if (!project) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
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
                <span className="font-mono text-xs font-bold text-[#FF056D] shrink-0">
                  PROJECT // {project.number}
                </span>
                <span className="text-[#5E5B56] hidden sm:inline">|</span>
                <span className="font-mono text-xs text-[#8E8A94] uppercase truncate hidden sm:inline">
                  {project.category}
                </span>
                <span className="text-[#5E5B56] hidden md:inline">|</span>
                <span className="font-mono text-[11px] text-[#FF056D] font-bold shrink-0">
                  {project.status}
                </span>
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
            <div className="overflow-y-auto p-5 sm:p-8 space-y-6 font-sans text-[#F4EFE6]">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F4EFE6] tracking-tight uppercase">
                    {project.title}
                  </h2>
                  {project.isMobileApp && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FF056D]/10 border border-[#FF056D]/30 font-mono text-[10px] text-[#FF056D] font-bold flex items-center gap-1">
                      <Smartphone className="w-3 h-3" /> MOBILE APP
                    </span>
                  )}
                </div>
                <p className="font-mono text-xs sm:text-sm text-[#FF056D] mt-1 font-semibold">
                  {project.tagline}
                </p>
              </div>

              {/* Screenshots Gallery if available */}
              {project.screenshots && project.screenshots.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#8E8A94] uppercase tracking-wider block font-bold">
                      // {project.isMobileApp ? 'MOBILE APPLICATION INTERFACES' : 'SYSTEM & INTERFACE CAPTURES'} ({project.screenshots.length} SCREENS)
                    </span>
                    <span className="font-mono text-[10px] text-[#FF056D]">SCROLL HORIZONTALLY →</span>
                  </div>

                  <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x no-scrollbar">
                    {project.screenshots.map((s, sIdx) => (
                      <div
                        key={sIdx}
                        className={`flex-shrink-0 ${project.isMobileApp ? 'w-44 sm:w-52' : 'w-72 sm:w-[420px]'} rounded-2xl bg-[#090A0D] border border-white/15 p-2 shadow-xl snap-start group`}
                      >
                        <div className={`${project.isMobileApp ? 'aspect-[9/19]' : 'aspect-[16/10]'} rounded-xl overflow-hidden bg-black/60 relative`}>
                          <img
                            src={s.src}
                            alt={s.title}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="pt-2 px-1 text-center">
                          <span className="font-mono text-[11px] text-[#F4EFE6] font-medium block truncate">
                            {s.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* WHAT IT IS */}
              <div className="p-4 rounded-xl bg-[#14151A] border border-white/5 space-y-1">
                <span className="font-mono text-[10px] text-[#FF056D] uppercase tracking-wider font-bold block">
                  WHAT IT IS:
                </span>
                <p className="text-sm text-[#F4EFE6]/90 leading-relaxed font-sans">
                  {project.whatItIs}
                </p>
              </div>

              {/* WHAT SAISH BUILT */}
              <div className="p-4 rounded-xl bg-[#14151A] border border-white/5 space-y-1">
                <span className="font-mono text-[10px] text-[#FF056D] uppercase tracking-wider font-bold block">
                  WHAT SAISH BUILT:
                </span>
                <p className="text-xs sm:text-sm text-[#8E8A94] leading-relaxed font-sans">
                  {project.whatSaishBuilt}
                </p>
              </div>

              {/* Architectural Stack Breakdown */}
              <div className="space-y-3">
                <span className="font-mono text-xs text-[#8E8A94] uppercase tracking-wider block font-bold">
                  // ARCHITECTURAL LAYERS & DESIGN
                </span>

                <div className="grid grid-cols-1 gap-2.5">
                  {project.architecture.map((arch, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#121318] border border-white/5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
                    >
                      <span className="font-mono text-xs font-bold text-[#FF056D]">
                        {arch.layer}
                      </span>
                      <span className="font-sans text-xs text-[#8E8A94] sm:text-right">
                        {arch.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* IMPORTANT ENGINEERING DECISIONS */}
              <div className="space-y-3">
                <span className="font-mono text-xs text-[#FF056D] uppercase tracking-wider block font-bold">
                  // IMPORTANT ENGINEERING DECISIONS
                </span>

                <ul className="space-y-2">
                  {project.engineeringDecisions.map((dec, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#8E8A94]">
                      <CheckCircle2 className="w-4 h-4 text-[#FF056D] mt-0.5 shrink-0" />
                      <span className="text-[#F4EFE6]/90">{dec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* TECHNOLOGIES */}
              <div>
                <span className="font-mono text-[10px] text-[#5E5B56] uppercase tracking-wider block mb-2 font-bold">
                  TECHNOLOGIES:
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-3 py-1 rounded-lg bg-white/5 text-[#F4EFE6] border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action CTAs */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="font-mono text-xs text-[#8E8A94]">
                  Explore verified source code, API schemas, and documentation on GitHub.
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  {project.repoLinks && project.repoLinks.length > 0 ? (
                    project.repoLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playClick}
                        data-cursor="REPO"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#14151A] hover:bg-[#FF056D] text-[#F4EFE6] hover:text-[#090A0C] border border-white/10 hover:border-[#FF056D] font-mono text-xs font-bold uppercase tracking-wider transition-all touch-manipulation"
                      >
                        <GitBranch className="w-3.5 h-3.5" />
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    ))
                  ) : (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClick}
                      data-cursor="REPO"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF056D] hover:bg-[#B8004C] text-[#090A0C] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#FF056D]/20 touch-manipulation"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>VIEW REPOSITORY ↗</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
