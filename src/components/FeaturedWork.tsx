import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronRight, Terminal, Smartphone, ExternalLink, Layers, GitBranch, Shield, Play, Pause, RotateCcw, CheckCircle2 } from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import { projects } from '../data/projects'
import { Project } from '../types'
import { useAudioFx } from '../hooks/useAudioFx'

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
    <div className="rounded-2xl bg-[#090A0D] border border-white/10 p-5 sm:p-6 space-y-5 shadow-2xl relative overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
        <div className="flex items-center gap-2 text-[#FF056D]">
          <span className="w-2 h-2 rounded-full bg-[#FF056D] animate-ping" />
          <span className="font-bold tracking-wider">EVENT_FLOW_SIMULATION</span>
        </div>
        <span className="text-[10px] text-[#8E8A94] uppercase">GUARANTEED AT-LEAST-ONCE</span>
      </div>

      {/* Nodes visual flow */}
      <div className="space-y-2.5">
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
                className="p-3.5 rounded-xl border transition-colors flex items-center justify-between gap-3 relative overflow-hidden"
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

              {/* Connecting connector line */}
              {idx < steps.length - 1 && (
                <div className="h-2 w-[2px] ml-6 bg-gradient-to-b from-[#FF056D]/50 to-transparent" />
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
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null)

  return (
    <section id="work" className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#FF056D] tracking-widest uppercase font-bold">
                // 04 FEATURED WORK
              </span>
              <div className="h-[1px] w-12 bg-white/20" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-6xl text-[#F4EFE6] tracking-tight uppercase">
              PRODUCTION <span className="text-[#FF056D]">SYSTEMS</span> & PROJECTS
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm sm:text-base text-[#8E8A94] font-sans leading-relaxed">
              Engineered with real architecture: event sourcing, temporal reconstruction, transactional outbox consistency, relational data modeling, and mobile dispatch pipelines.
            </p>
          </div>
        </div>

        {/* Large-Format Project Presentations */}
        <div className="space-y-16 lg:space-y-24">
          {projects.map((project, index) => {
            const isOutboxProject = project.featuredVisualType === 'outbox-flow'

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                onMouseEnter={() => {
                  playHover()
                  setHoveredProjectId(project.id)
                }}
                onMouseLeave={() => setHoveredProjectId(null)}
                className="group relative rounded-3xl bg-[#0F1014] border border-white/10 hover:border-[#FF056D]/60 transition-all duration-500 overflow-hidden p-6 sm:p-8 lg:p-12 shadow-2xl"
              >
                {/* Subtle Hot Pink ambient glow on hover */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-[#FF056D]" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
                  {/* Left Column: Number, Title, Tagline, Recruiter Structured Breakdown */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Top Row: Project Number & Category Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-[#FF056D] tracking-widest">
                          PROJECT // {project.number}
                        </span>
                        <span className="text-[#5E5D66]">/</span>
                        <span className="font-mono text-xs text-[#8E8A94] uppercase flex items-center gap-1.5">
                          {project.isMobileApp && <Smartphone className="w-3.5 h-3.5 text-[#FF056D]" />}
                          {project.category}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[#8E8A94] px-2.5 py-0.5 rounded bg-white/5 border border-white/5">
                        {project.status}
                      </span>
                    </div>

                    {/* Project Title & Tagline */}
                    <div>
                      <h3 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#F4EFE6] tracking-tight uppercase group-hover:text-[#FF056D] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="font-mono text-sm text-[#8E8A94] mt-2 font-medium">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Structured Hierarchy: WHAT IT IS */}
                    <div className="p-4 rounded-xl bg-[#141519] border border-white/5 space-y-1.5">
                      <span className="font-mono text-[10px] text-[#FF056D] uppercase tracking-wider font-bold block">
                        WHAT IT IS:
                      </span>
                      <p className="font-sans text-sm text-[#F4EFE6]/90 leading-relaxed">
                        {project.whatItIs}
                      </p>
                    </div>

                    {/* Structured Hierarchy: WHAT SAISH BUILT */}
                    <div className="p-4 rounded-xl bg-[#141519] border border-white/5 space-y-1.5">
                      <span className="font-mono text-[10px] text-[#FF056D] uppercase tracking-wider font-bold block">
                        WHAT SAISH BUILT:
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-[#8E8A94] leading-relaxed">
                        {project.whatSaishBuilt}
                      </p>
                    </div>

                    {/* Structured Hierarchy: TECHNOLOGIES */}
                    <div>
                      <span className="font-mono text-[10px] text-[#5E5D66] uppercase tracking-wider block mb-2 font-bold">
                        TECHNOLOGIES:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-xs px-3 py-1 rounded-lg bg-[#17181D] border border-white/10 text-[#F4EFE6] group-hover:border-[#FF056D]/30 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTAs with Polished Link Treatments (No raw URLs) */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      {/* Case Study Trigger */}
                      <button
                        onClick={() => {
                          playClick()
                          onSelectProject(project)
                        }}
                        data-cursor="CASE STUDY"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FF056D] hover:bg-[#D9045D] text-[#090A0C] font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-[#FF056D]/20 active:scale-95"
                      >
                        <span>EXPLORE CASE STUDY</span>
                        <ChevronRight className="w-4 h-4 text-[#090A0C]" />
                      </button>

                      {/* Primary GitHub Repository Link */}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playClick}
                        data-cursor="GITHUB"
                        className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#15161A] hover:bg-[#1D1E24] border border-white/10 hover:border-white/20 text-[#8E8A94] hover:text-[#F4EFE6] font-mono text-xs font-semibold tracking-wider uppercase transition-all"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>VIEW REPOSITORY ↗</span>
                      </a>

                      {/* Sub-links for Multi-Repo Projects (e.g. Saishtask backend & frontend) */}
                      {project.repoLinks && project.repoLinks.map((sublink) => (
                        <a
                          key={sublink.label}
                          href={sublink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={playClick}
                          data-cursor="REPO"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-[#8E8A94] hover:text-[#F4EFE6] transition-colors"
                        >
                          <span>{sublink.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Visual Architectural Schematic & Screenshots/Flow */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* 1. OutBox-Sync: Original Technical Visualization */}
                    {isOutboxProject ? (
                      <OutboxFlowVisualizer />
                    ) : project.screenshots && project.screenshots.length > 0 ? (
                      /* 2. Projects with Actual Repository Visuals (Chronos, CareWave, SaishTask) */
                      <div className="rounded-2xl bg-[#090A0D] border border-white/10 p-4 space-y-3 shadow-xl">
                        <div className="flex items-center justify-between font-mono text-xs text-[#8E8A94]">
                          <span className="flex items-center gap-2 text-[#FF056D] font-bold">
                            {project.isMobileApp ? (
                              <Smartphone className="w-3.5 h-3.5" />
                            ) : (
                              <Terminal className="w-3.5 h-3.5" />
                            )}
                            {project.isMobileApp ? 'MOBILE APP INTERFACES' : 'AUTHENTIC REPOSITORY VISUALS'}
                          </span>
                          <span className="text-[10px] text-[#8E8A94] uppercase">
                            {project.screenshots.length} SCREENS
                          </span>
                        </div>

                        {/* Screenshot previews: Responsive Editorial Layout */}
                        {project.isMobileApp ? (
                          /* Mobile Layout: 3-column narrow cards */
                          <div className="grid grid-cols-3 gap-2">
                            {project.screenshots.slice(0, 3).map((shot, sIdx) => (
                              <div
                                key={sIdx}
                                onClick={() => {
                                  playClick()
                                  onSelectProject(project)
                                }}
                                className="group/shot relative rounded-xl overflow-hidden border border-white/10 aspect-[9/16] bg-black/40 cursor-pointer hover:border-[#FF056D] transition-all"
                                title={shot.title}
                              >
                                <img
                                  src={shot.src}
                                  alt={shot.title}
                                  className="w-full h-full object-cover object-top group-hover/shot:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 to-transparent p-1.5 text-[9px] font-mono text-[#F4EFE6] truncate text-center">
                                  {shot.title}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          /* Desktop/Systems Layout (Chronos, SaishTask): 2-stacked or 2-column wide cards */
                          <div className="space-y-2.5">
                            {project.screenshots.map((shot, sIdx) => (
                              <div
                                key={sIdx}
                                onClick={() => {
                                  playClick()
                                  onSelectProject(project)
                                }}
                                className="group/shot relative rounded-xl overflow-hidden border border-white/10 aspect-[16/9] bg-black/50 cursor-pointer hover:border-[#FF056D] transition-all"
                                title={shot.title}
                              >
                                <img
                                  src={shot.src}
                                  alt={shot.title}
                                  className="w-full h-full object-cover object-top group-hover/shot:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2.5 flex items-center justify-between font-mono text-xs">
                                  <span className="text-[#F4EFE6] font-medium text-[11px] truncate">
                                    {shot.title}
                                  </span>
                                  <span className="text-[10px] text-[#FF056D] shrink-0 font-bold">
                                    INSPECT ↗
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : null}

                    {/* Architectural Schematic Box */}
                    <div className="rounded-2xl bg-[#090A0D] border border-white/10 p-5 sm:p-6 font-mono text-xs space-y-4 shadow-xl">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[#8E8A94]">
                        <span className="flex items-center gap-2">
                          <Terminal className="w-3.5 h-3.5 text-[#FF056D]" />
                          ARCHITECTURE_MAP
                        </span>
                        <span className="text-[10px] text-[#FF056D] font-bold">VERIFIED</span>
                      </div>

                      {/* Layer Breakdowns */}
                      <div className="space-y-2.5">
                        {project.architecture.slice(0, 3).map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-[#121317] border border-white/5 hover:border-white/15 transition-colors"
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

                      {/* Important Engineering Decisions */}
                      <div className="pt-2 border-t border-white/5">
                        <span className="font-mono text-[10px] text-[#FF056D] tracking-wider uppercase block mb-2 font-bold">
                          IMPORTANT ENGINEERING DECISIONS:
                        </span>
                        <ul className="space-y-2 text-[11px] font-sans text-[#8E8A94]">
                          {project.engineeringDecisions.slice(0, 3).map((dec, i) => (
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
            )
          })}
        </div>
      </div>
    </section>
  )
}
