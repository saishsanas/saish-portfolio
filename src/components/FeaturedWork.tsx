import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronRight, Terminal, Smartphone, ExternalLink, Layers, GitBranch, CheckCircle2, Eye, LayoutGrid } from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import { projects } from '../data/projects'
import { Project } from '../types'
import { useAudioFx } from '../hooks/useAudioFx'
import { MangaWorkBackground } from './MangaBackgroundAtmosphere'
import { getPublicUrl } from '../utils/getPublicUrl'

interface FeaturedWorkProps {
  onSelectProject: (project: Project) => void
}

/**
 * Animated technical visualization for OutBox-Sync:
 * APPLICATION → DATABASE TRANSACTION → OUTBOX EVENT → WORKER → EVENT CONSUMER
 */
function OutboxFlowVisualizer() {
  const [activeStep, setActiveStep] = useState(0)
  const steps = [
    { name: 'APPLICATION', sub: 'HTTP Command Ingestion', detail: 'REST request initiates domain state change' },
    { name: 'DATABASE TRANSACTION', sub: 'Single ACID Boundary', detail: 'Local commit: Business Entity + Outbox Row' },
    { name: 'OUTBOX EVENT', sub: 'Status: PENDING', detail: 'Immutable record stored in relational outbox table' },
    { name: 'ASYNC WORKER', sub: 'SELECT FOR UPDATE SKIP LOCKED', detail: 'Lockless daemon polls & dispatches batches' },
    { name: 'EVENT CONSUMER', sub: 'Idempotent Broker ACK', detail: 'Downstream handler processes with deduplication' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [steps.length])

  return (
    <div className="rounded-2xl bg-[#090A0D] border border-white/10 p-5 sm:p-6 space-y-4 shadow-2xl relative overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
        <div className="flex items-center gap-2 text-[#FF056D]">
          <span className="w-2 h-2 rounded-full bg-[#FF056D] animate-ping" />
          <span className="font-bold tracking-wider">EVENT_FLOW_SIMULATION</span>
        </div>
        <span className="text-[10px] text-[#8E8A94] uppercase">GUARANTEED AT-LEAST-ONCE</span>
      </div>

      {/* Nodes visual flow */}
      <div className="space-y-2">
        {steps.map((st, idx) => {
          const isCurrent = idx === activeStep
          const isPast = idx < activeStep

          return (
            <div key={st.name} className="relative">
              <motion.div
                animate={{
                  backgroundColor: isCurrent ? 'rgba(255, 5, 109, 0.12)' : 'rgba(18, 19, 23, 0.9)',
                  borderColor: isCurrent ? 'rgba(255, 5, 109, 0.6)' : 'rgba(255, 255, 255, 0.06)',
                }}
                className="p-3 rounded-xl border transition-colors flex items-center justify-between gap-3 relative overflow-hidden"
              >
                {/* Active pulsating beacon */}
                {isCurrent && (
                  <motion.div
                    layoutId="activeOutboxStepBeacon"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF056D]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs font-bold ${isCurrent ? 'text-[#FF056D]' : 'text-[#8E8A94]'}`}>
                    0{idx + 1}
                  </span>
                  <div>
                    <span className={`font-display font-bold text-xs uppercase tracking-wide block ${isCurrent ? 'text-[#F4EFE6]' : 'text-[#F4EFE6]/75'}`}>
                      {st.name}
                    </span>
                    <span className="font-mono text-[10px] text-[#8E8A94] block mt-0.5">
                      {st.sub}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-semibold ${
                    isCurrent
                      ? 'bg-[#FF056D]/20 text-[#FF056D] border border-[#FF056D]/40'
                      : isPast
                      ? 'bg-white/5 text-[#8E8A94]'
                      : 'text-[#5E5D66]'
                  }`}>
                    {isCurrent ? 'PROCESSING' : isPast ? 'COMMITTED' : 'AWAITING'}
                  </span>
                </div>
              </motion.div>

              {idx < steps.length - 1 && (
                <div className="h-1.5 w-[2px] ml-6 bg-gradient-to-b from-[#FF056D]/50 to-transparent" />
              )}
            </div>
          )
        })}
      </div>

      {/* Live explanation panel */}
      <div className="p-3 rounded-xl bg-[#111216] border border-white/5 font-mono text-[11px] text-[#8E8A94] flex items-center justify-between">
        <span className="text-[#F4EFE6]/90 truncate">
          Active: <span className="text-[#FF056D] font-semibold">{steps[activeStep].detail}</span>
        </span>
        <span className="text-[#5E5D66] text-[10px] shrink-0 ml-2">STEP {activeStep + 1}/5</span>
      </div>
    </div>
  )
}

export function FeaturedWork({ onSelectProject }: FeaturedWorkProps) {
  const { playClick, playHover } = useAudioFx()
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0].id)
  const [viewMode, setViewMode] = useState<'console' | 'all'>('console')

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0]
  const isOutboxProject = activeProject.featuredVisualType === 'outbox-flow'

  return (
    <section id="work" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <MangaWorkBackground />
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-[#FF056D] tracking-widest uppercase font-bold">
                // 02 WORK // PRODUCTION SYSTEMS &amp; PROJECTS
              </span>
              <div className="h-[1px] w-12 bg-white/20" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#F4EFE6] tracking-tight uppercase">
              FEATURED <span className="text-[#FF056D]">ENGINEERING</span> WORK
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playClick()
                setViewMode(viewMode === 'console' ? 'all' : 'console')
              }}
              onMouseEnter={playHover}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15161A] hover:bg-[#1E1F26] border border-white/10 text-xs font-mono text-[#8E8A94] hover:text-[#F4EFE6] transition-all"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#FF056D]" />
              <span>{viewMode === 'console' ? 'VIEW ALL PROJECTS' : 'SWITCH TO CONSOLE'}</span>
            </button>
          </div>
        </div>

        {/* INTERACTIVE PROJECT COMMAND SELECTOR (Tabs across the top) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {projects.map((p) => {
            const isSelected = p.id === activeProject.id
            const isCareWave = p.id === 'carewave'
            return (
              <button
                key={p.id}
                onClick={() => {
                  playClick()
                  setSelectedProjectId(p.id)
                }}
                onMouseEnter={playHover}
                data-cursor="SELECT"
                className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF056D] ${
                  isSelected
                    ? 'bg-[#15161A] border-[#FF056D] shadow-xl shadow-[#FF056D]/20'
                    : 'bg-[#0E0F13] border-white/10 hover:border-white/25 hover:bg-[#121318]'
                }`}
              >
                {/* Active Top Bar */}
                {isSelected && (
                  <motion.div
                    layoutId="activeProjectTopLine"
                    className="absolute top-0 left-0 right-0 h-1 bg-[#FF056D]"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}

                {/* Subtle Manga Corner Crosshairs */}
                <span className="absolute top-1 left-1.5 font-mono text-[9px] text-[#FF056D]/30 group-hover:text-[#FF056D]/70 transition-colors select-none">+</span>
                <span className="absolute top-1 right-1.5 font-mono text-[9px] text-[#FF056D]/30 group-hover:text-[#FF056D]/70 transition-colors select-none">+</span>

                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-bold ${isSelected ? 'text-[#FF056D]' : 'text-[#8E8A94]'}`}>
                    // {p.number}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isCareWave && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#FF056D]/15 text-[#FF056D] border border-[#FF056D]/30 font-bold uppercase">
                        PRIMARY
                      </span>
                    )}
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#8E8A94]">
                      {p.isMobileApp ? 'MOBILE' : 'SYSTEM'}
                    </span>
                  </div>
                </div>

                <div className={`font-display font-extrabold text-base sm:text-lg tracking-tight uppercase block truncate ${
                  isSelected ? 'text-[#F4EFE6]' : 'text-[#F4EFE6]/80 group-hover:text-[#F4EFE6]'
                }`}>
                  {p.title}
                </div>

                <p className="font-mono text-[11px] text-[#8E8A94] mt-1 line-clamp-1">
                  {p.tagline}
                </p>
              </button>
            )
          })}
        </div>

        {/* CONSOLE VIEW: SPOTLIGHTED PROJECT CARD */}
        {viewMode === 'console' ? (
          <AnimatePresence mode="wait">
            <motion.article
              key={activeProject.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-3xl bg-[#0F1014] border p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden transition-colors ${
                activeProject.id === 'carewave'
                  ? 'border-[#FF056D]/40 shadow-[#FF056D]/10'
                  : 'border-white/15'
              }`}
            >
              {/* Corner Manga Crosshairs */}
              <span className="absolute top-2 left-3 font-mono text-xs text-[#FF056D]/50 select-none">+</span>
              <span className="absolute top-2 right-3 font-mono text-xs text-[#FF056D]/50 select-none">+</span>
              <span className="absolute bottom-2 left-3 font-mono text-xs text-[#FF056D]/50 select-none">+</span>
              <span className="absolute bottom-2 right-3 font-mono text-xs text-[#FF056D]/50 select-none">+</span>

              {/* Subtle Ambient Accent */}
              <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none opacity-10 bg-[#FF056D]" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
                {/* Left Column (7 cols): Recruiter Structured Breakdown & CTAs */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Top Header Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="font-mono text-xs font-bold text-[#FF056D] tracking-widest shrink-0">
                        PROJECT // {activeProject.number}
                      </span>
                      <span className="text-[#5E5D66] hidden sm:inline">/</span>
                      <span className="font-mono text-xs text-[#8E8A94] uppercase flex items-center gap-1.5">
                        {activeProject.isMobileApp && <Smartphone className="w-3.5 h-3.5 text-[#FF056D]" />}
                        {activeProject.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {activeProject.id === 'carewave' && (
                        <span className="font-mono text-[10px] text-[#FF056D] bg-[#FF056D]/10 border border-[#FF056D]/40 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                          ★ PRIMARY SHOWCASE
                        </span>
                      )}
                      <span className="font-mono text-xs text-[#8E8A94] px-2.5 py-0.5 rounded bg-white/5 border border-white/5 shrink-0">
                        {activeProject.status}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#F4EFE6] tracking-tight uppercase">
                      {activeProject.title}
                    </h3>
                    <p className="font-mono text-sm text-[#FF056D] mt-2 font-medium">
                      {activeProject.tagline}
                    </p>
                  </div>

                  {/* WHAT IT IS */}
                  <div className="p-4 rounded-xl bg-[#141519] border border-white/5 space-y-1 relative group/box hover:border-white/15 transition-colors">
                    <span className="font-mono text-[10px] text-[#FF056D] uppercase tracking-wider font-bold block">
                      WHAT IT IS:
                    </span>
                    <p className="font-sans text-sm text-[#F4EFE6]/90 leading-relaxed">
                      {activeProject.whatItIs}
                    </p>
                  </div>

                  {/* WHAT SAISH BUILT */}
                  <div className="p-4 rounded-xl bg-[#141519] border border-white/5 space-y-1 relative group/box hover:border-white/15 transition-colors">
                    <span className="font-mono text-[10px] text-[#FF056D] uppercase tracking-wider font-bold block">
                      WHAT SAISH BUILT:
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-[#8E8A94] leading-relaxed">
                      {activeProject.whatSaishBuilt}
                    </p>
                  </div>

                  {/* TECHNOLOGIES */}
                  <div>
                    <span className="font-mono text-[10px] text-[#5E5D66] uppercase tracking-wider block mb-2 font-bold">
                      TECHNOLOGIES:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-xs px-3 py-1 rounded-lg bg-[#17181D] border border-white/10 text-[#F4EFE6] hover:border-[#FF056D]/50 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action CTAs */}
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <button
                      onClick={() => {
                        playClick()
                        onSelectProject(activeProject)
                      }}
                      data-cursor="CASE STUDY"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF056D] hover:bg-[#D9045D] text-[#090A0C] font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-[#FF056D]/20 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF056D] touch-manipulation group/btn"
                    >
                      <span>EXPLORE CASE STUDY</span>
                      <ChevronRight className="w-4 h-4 text-[#090A0C] group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>

                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClick}
                      data-cursor="GITHUB"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#15161A] hover:bg-[#1D1E24] border border-white/10 text-[#8E8A94] hover:text-[#F4EFE6] font-mono text-xs font-semibold tracking-wider uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF056D] touch-manipulation"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>VIEW REPOSITORY ↗</span>
                    </a>

                    {activeProject.repoLinks &&
                      activeProject.repoLinks.map((sublink) => (
                        <a
                          key={sublink.label}
                          href={sublink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={playClick}
                          data-cursor="REPO"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-[#8E8A94] hover:text-[#F4EFE6] transition-colors touch-manipulation"
                        >
                          <span>{sublink.label}</span>
                        </a>
                      ))}
                  </div>
                </div>

                {/* Right Column (5 cols): Visual Schematic & Screenshots */}
                <div className="lg:col-span-5 space-y-4">
                  {isOutboxProject ? (
                    <OutboxFlowVisualizer />
                  ) : activeProject.screenshots && activeProject.screenshots.length > 0 ? (
                    <div className="rounded-2xl bg-[#090A0D] border border-white/10 p-4 space-y-3 shadow-xl relative group/frame">
                      {/* Manga-panel corner crosshairs */}
                      <span className="absolute -top-1 -left-1 font-mono text-[9px] text-[#FF056D]/50 select-none">+</span>
                      <span className="absolute -top-1 -right-1 font-mono text-[9px] text-[#FF056D]/50 select-none">+</span>
                      <span className="absolute -bottom-1 -left-1 font-mono text-[9px] text-[#FF056D]/50 select-none">+</span>
                      <span className="absolute -bottom-1 -right-1 font-mono text-[9px] text-[#FF056D]/50 select-none">+</span>

                      <div className="flex items-center justify-between font-mono text-xs text-[#8E8A94]">
                        <span className="flex items-center gap-2 text-[#FF056D] font-bold">
                          {activeProject.isMobileApp ? (
                            <Smartphone className="w-3.5 h-3.5" />
                          ) : (
                            <Terminal className="w-3.5 h-3.5" />
                          )}
                          {activeProject.isMobileApp ? 'MOBILE INTERFACE GALLERY' : 'SYSTEM ARCHITECTURE CAPTURES'}
                        </span>
                        <span className="text-[10px] text-[#8E8A94] uppercase tracking-wider">
                          {activeProject.screenshots.length} CAPTURES
                        </span>
                      </div>

                      {activeProject.isMobileApp ? (
                        /* CareWave Mobile Screenshots */
                        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-1">
                          {activeProject.screenshots.slice(0, 3).map((shot, sIdx) => (
                            <div
                              key={sIdx}
                              onClick={() => {
                                playClick()
                                onSelectProject(activeProject)
                              }}
                              className="group/shot relative rounded-xl overflow-hidden border border-white/15 hover:border-[#FF056D] aspect-[9/16] bg-[#07080B] cursor-pointer shadow-lg hover:shadow-xl hover:shadow-[#FF056D]/15 transition-all duration-300 transform hover:-translate-y-1"
                              title={shot.title}
                            >
                              {/* Device top pill indicator */}
                              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-white/20 z-10 pointer-events-none" />

                              <img
                                src={shot.src}
                                alt={shot.title}
                                className="w-full h-full object-cover object-top group-hover/shot:scale-105 transition-transform duration-500 ease-out"
                              />

                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-1.5 text-[9px] font-mono text-[#F4EFE6] truncate text-center backdrop-blur-[2px]">
                                <span className="text-[#FF056D] font-bold mr-0.5">#0{sIdx+1}</span>
                                {shot.title}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* Web App Screenshots (Chronos, SaishTask) */
                        <div className="space-y-3 pt-1">
                          {activeProject.screenshots.map((shot, sIdx) => (
                            <div
                              key={sIdx}
                              onClick={() => {
                                playClick()
                                onSelectProject(activeProject)
                              }}
                              className="group/shot relative rounded-xl overflow-hidden border border-white/15 hover:border-[#FF056D] aspect-[16/9] bg-[#07080B] cursor-pointer shadow-lg hover:shadow-xl hover:shadow-[#FF056D]/15 transition-all duration-300 transform hover:-translate-y-0.5"
                              title={shot.title}
                            >
                              {/* Window titlebar header */}
                              <div className="absolute top-0 left-0 right-0 h-6 bg-[#111216]/90 backdrop-blur border-b border-white/10 px-2.5 flex items-center justify-between z-10 font-mono text-[9px] text-[#8E8A94]">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-[#FF056D]/80" />
                                  <span className="w-2 h-2 rounded-full bg-white/20" />
                                  <span className="w-2 h-2 rounded-full bg-white/20" />
                                </div>
                                <span className="text-[#F4EFE6]/70 truncate max-w-[180px] font-semibold">{shot.title}</span>
                                <span className="text-[#FF056D] text-[8px] font-bold">INSPECT ↗</span>
                              </div>

                              <img
                                src={shot.src}
                                alt={shot.title}
                                className="w-full h-full object-cover object-top pt-6 group-hover/shot:scale-[1.03] transition-transform duration-500 ease-out"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : null}

                  {/* Architectural Schematic Box */}
                  <div className="rounded-2xl bg-[#090A0D] border border-white/10 p-5 font-mono text-xs space-y-3.5 shadow-xl relative">
                    <span className="absolute top-1 left-2 font-mono text-[9px] text-[#FF056D]/30 select-none">+</span>
                    <span className="absolute top-1 right-2 font-mono text-[9px] text-[#FF056D]/30 select-none">+</span>

                    <div className="flex items-center justify-between pb-2.5 border-b border-white/10 text-[#8E8A94]">
                      <span className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-[#FF056D]" />
                        ARCHITECTURE_SPECIFICATION
                      </span>
                      <span className="text-[10px] text-[#FF056D] font-bold">VERIFIED</span>
                    </div>

                    <div className="space-y-2">
                      {activeProject.architecture.slice(0, 3).map((item, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-[#121317] border border-white/5 hover:border-white/15 transition-colors"
                        >
                          <span className="text-[10px] text-[#FF056D] uppercase tracking-wider block font-bold">
                            {item.layer}
                          </span>
                          <span className="text-[#F4EFE6]/80 font-sans text-xs mt-0.5 block">
                            {item.detail}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-white/5">
                      <span className="font-mono text-[10px] text-[#FF056D] tracking-wider uppercase block mb-1.5 font-bold">
                        ENGINEERING DECISIONS:
                      </span>
                      <ul className="space-y-1.5 text-[11px] font-sans text-[#8E8A94]">
                        {activeProject.engineeringDecisions.slice(0, 2).map((dec, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#FF056D] font-bold">›</span>
                            <span className="leading-snug text-[#F4EFE6]/85">{dec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        ) : (
          /* COMPARISON VIEW: ALL 4 PROJECTS LISTED */
          <div className="space-y-10">
            {projects.map((project, index) => {
              const isOutbox = project.featuredVisualType === 'outbox-flow'
              return (
                <article
                  key={project.id}
                  className="rounded-3xl bg-[#0F1014] border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs text-[#FF056D] font-bold">
                        <span>PROJECT // {project.number}</span>
                        <span className="text-[#5E5D66]">|</span>
                        <span className="text-[#8E8A94] uppercase">{project.category}</span>
                      </div>
                      <h3 className="font-display font-bold text-2xl text-[#F4EFE6] uppercase mt-1">
                        {project.title}
                      </h3>
                      <p className="font-mono text-xs text-[#8E8A94]">{project.tagline}</p>
                    </div>

                    <button
                      onClick={() => {
                        playClick()
                        onSelectProject(project)
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF056D] hover:bg-[#D9045D] text-[#090A0C] font-mono text-xs font-bold uppercase self-start sm:self-center shrink-0"
                    >
                      <span>ENTER CASE STUDY</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm text-[#F4EFE6]/90 font-sans leading-relaxed">
                    {project.whatItIs}
                  </p>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
