import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, FileText, Terminal, ShieldCheck, MapPin, Cpu, GitCommit } from 'lucide-react'
import { useAudioFx } from '../hooks/useAudioFx'

interface HeroProps {
  onOpenResume: () => void
  onNavigateWork?: () => void
}

export function Hero({ onOpenResume, onNavigateWork }: HeroProps) {
  const { playClick, playHover } = useAudioFx()
  const [timeString, setTimeString] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      // Display IST / local time
      setTimeString(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' IST'
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const scrollToWork = () => {
    playClick()
    if (onNavigateWork) {
      onNavigateWork()
    } else {
      const element = document.getElementById('work')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-grid-pattern overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-[#FF056D]/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -top-10 right-0 w-[450px] h-[350px] bg-[#B8004C]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Telemetry Display */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[11px] text-[#8E8A94] select-none pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-[#FF056D] font-bold">●</span>
          <span>LOCATION: PUNE, INDIA</span>
          <span className="hidden sm:inline text-[#5E5D66]">|</span>
          <span className="hidden sm:inline">SAVITRIBAI PHULE PUNE UNIVERSITY</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF056D] animate-pulse"></span>
          <span className="text-[#F4EFE6]">TIME ZONE: IST</span>
          <span className="text-[#5E5D66]">|</span>
          <span className="text-[#FF056D] font-semibold">{timeString || 'LIVE'}</span>
        </div>
      </div>

      {/* Main Editorial Hero Layout (Asymmetric 12-Column Grid) */}
      <div className="max-w-7xl mx-auto w-full my-auto py-8 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (7 cols): Typography, Identity & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Kicker Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15161A] border border-[#202126] text-xs font-mono text-[#F4EFE6]">
                <span className="w-2 h-2 rounded-full bg-[#FF056D]"></span>
                <span className="font-semibold text-[#F4EFE6]">SYS.ENGINEERING</span>
                <span className="text-[#5E5D66]">//</span>
                <span className="text-[#FF056D] font-bold">JAVA 21 & SPRING BOOT</span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-2 text-xs font-mono text-[#8E8A94]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF056D]" />
                <span>OCI 2025 CERTIFIED • TCS iON AI FOUNDATION</span>
              </div>
            </motion.div>

            {/* Oversized Cinematic Typography */}
            <div className="space-y-0.5 select-none">
              {/* Row 1: First Name */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[clamp(3rem,6vw,5.6rem)] leading-[0.9] tracking-tighter uppercase text-[#F4EFE6]"
                >
                  SAISH
                </motion.h1>
              </div>

              {/* Row 2: Last Name with Editorial Stroke */}
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[clamp(3rem,6vw,5.6rem)] leading-[0.9] tracking-tighter uppercase text-[#F4EFE6]"
                >
                  <span className="text-stroke hover:text-[#FF056D] transition-colors duration-300">SANAS</span>
                </motion.div>
              </div>

              {/* Row 3: Specialty Highlight */}
              <div className="overflow-hidden pt-1">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-[clamp(2.5rem,5.2vw,4.8rem)] leading-[0.9] tracking-tight text-[#FF056D] block">
                    JAVA BACKEND
                  </span>
                </motion.div>
              </div>

              {/* Row 4: Developer Role */}
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-display font-bold text-2xl sm:text-4xl md:text-5xl lg:text-[clamp(2rem,4.4vw,4rem)] leading-[0.9] tracking-tight uppercase text-[#8E8A94] block">
                    DEVELOPER
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Editorial Technical Mission Statement */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="max-w-xl space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-[#FF056D] tracking-wider uppercase font-bold">
                  // ENGINEERING CREED
                </span>
                <div className="h-[1px] w-8 bg-[#FF056D]/40" />
              </div>
              <p className="text-sm sm:text-base text-[#F4EFE6]/85 font-sans leading-relaxed">
                Architecting deterministic backend systems, transactional outbox pipelines, and temporal event stores. Grounded in <span className="text-[#F4EFE6] font-semibold">Java 21</span>, <span className="text-[#F4EFE6] font-semibold">Spring Boot</span>, <span className="text-[#F4EFE6] font-semibold">PostgreSQL</span>, and rigorous systems discipline.
              </p>
            </motion.div>

            {/* Primary Interactive CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              {/* Main Action: VIEW WORK */}
              <button
                onClick={scrollToWork}
                onMouseEnter={playHover}
                data-cursor="EXPLORE"
                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-[#FF056D] hover:bg-[#D9045D] text-[#090A0C] font-mono text-sm font-bold tracking-wider uppercase transition-all shadow-xl shadow-[#FF056D]/20 active:scale-95 touch-manipulation"
              >
                <span>VIEW WORK ↗</span>
                <div className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center group-hover:translate-y-0.5 transition-transform">
                  <ArrowDown className="w-3.5 h-3.5 text-[#090A0C]" />
                </div>
              </button>

              {/* Secondary Action: RESUME */}
              <button
                onClick={() => {
                  playClick()
                  onOpenResume()
                }}
                onMouseEnter={playHover}
                data-cursor="RESUME"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#15161A] hover:bg-[#1D1E24] border border-[#202126] hover:border-[#FF056D]/50 text-[#F4EFE6] font-mono text-sm font-semibold tracking-wider uppercase transition-all active:scale-95 touch-manipulation"
              >
                <FileText className="w-4 h-4 text-[#FF056D]" />
                <span>EXAMINE RESUME ↗</span>
              </button>

              {/* Terminal Quick Glance */}
              <div className="hidden sm:flex items-center gap-3 px-4 py-3 rounded-xl bg-[#111215] border border-white/5 font-mono text-xs text-[#8E8A94]">
                <Terminal className="w-4 h-4 text-[#FF056D]" />
                <span>mvn test</span>
                <span className="text-[#FF056D] font-bold">● 100% PASS</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column (5 cols): Large Asymmetric Editorial Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end mt-4 lg:mt-0"
          >
            {/* Editorial Frame with Corner Crosshairs */}
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none group">
              {/* Corner Accents */}
              <div className="absolute -top-2 -left-2 text-[#FF056D] font-mono text-xs font-bold select-none">+</div>
              <div className="absolute -top-2 -right-2 text-[#FF056D] font-mono text-xs font-bold select-none">+</div>
              <div className="absolute -bottom-2 -left-2 text-[#FF056D] font-mono text-xs font-bold select-none">+</div>
              <div className="absolute -bottom-2 -right-2 text-[#FF056D] font-mono text-xs font-bold select-none">+</div>

              {/* Background Geometric Accent Strip */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-[#FF056D]/20 via-transparent to-transparent opacity-60 blur-sm pointer-events-none" />

              {/* Portrait Container */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#14151B] to-[#090A0C] border border-white/10 p-3 sm:p-4 shadow-2xl">
                {/* Visual Metadata Header */}
                <div className="flex items-center justify-between pb-3 px-2 border-b border-white/5 font-mono text-[10px] text-[#8E8A94]">
                  <span className="flex items-center gap-1.5 text-[#F4EFE6]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF056D]"></span>
                    ID // SAISH_SANAS
                  </span>
                  <span className="text-[#FF056D]">BE_COMP_ENG // 2026</span>
                </div>

                {/* The Primary Portrait Image with Seamless Bottom Mask */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#090A0C]">
                  <img
                    src="/images/saish-portrait-cutout.png"
                    alt="Saish Sanas - Java Backend Developer"
                    className="w-full h-full object-cover object-top contrast-[1.06] brightness-[0.98] saturate-[0.96] group-hover:saturate-105 group-hover:scale-[1.02] transition-all duration-700 select-none"
                    style={{
                      maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                    }}
                  />

                  {/* Subtle Grid Overlay on bottom of portrait */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-transparent to-transparent pointer-events-none" />

                  {/* Micro Accent Pill Tag on Portrait */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#0E1015]/90 backdrop-blur-md border border-white/10 font-mono text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#FF056D] font-bold text-[10px] tracking-wider uppercase">
                        PRIMARY SPECIALIZATION
                      </span>
                      <span className="text-[10px] text-[#8E8A94]">PUNE, MH</span>
                    </div>
                    <div className="text-[#F4EFE6] font-display font-bold text-sm tracking-tight">
                      JAVA 21 • SPRING BOOT • POSTGRESQL
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Telemetry Footer Strip */}
      <div className="max-w-7xl mx-auto w-full pt-6 border-t border-white/10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="flex flex-col">
            <span className="text-[#8E8A94] text-[10px] tracking-wider uppercase">01 // SPECIALIZATION</span>
            <span className="text-[#F4EFE6] font-medium">Java, Spring Boot & Event Sourcing</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#8E8A94] text-[10px] tracking-wider uppercase">02 // DATA ENGINE</span>
            <span className="text-[#F4EFE6] font-medium">PostgreSQL & MySQL / JPA Hibernate</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#8E8A94] text-[10px] tracking-wider uppercase">03 // ARCHITECTURAL PATTERN</span>
            <span className="text-[#F4EFE6] font-medium">Temporal Replay & Transactional Outbox</span>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <span className="text-[#8E8A94] text-[10px] tracking-wider uppercase">04 // LOCATION & STATUS</span>
            <span className="text-[#FF056D] font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF056D] animate-pulse"></span>
              PUNE, INDIA // OPEN FOR ROLES
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
