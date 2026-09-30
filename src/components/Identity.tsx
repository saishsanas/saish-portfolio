import { motion } from 'framer-motion'
import { Server, Database, GitBranch } from 'lucide-react'
import { useAudioFx } from '../hooks/useAudioFx'

export function Identity() {
  const { playHover } = useAudioFx()

  const pillars = [
    {
      num: '01',
      title: 'DETERMINISTIC SYSTEMS',
      icon: Server,
      text: 'Prioritizing systems where state transitions are explicit, transactional boundaries are atomic, and edge cases are accounted for before they reach production.',
      highlight: 'ACID & Idempotency'
    },
    {
      num: '02',
      title: 'DATA MODELING DISCIPLINE',
      icon: Database,
      text: 'Relational schemas built on proper normalization, thoughtful indexing strategies (B-Tree, GIN), and connection pooling tuned for zero connection leaks.',
      highlight: 'PostgreSQL, MySQL & JPA'
    },
    {
      num: '03',
      title: 'EVENT RELIABILITY',
      icon: GitBranch,
      text: 'Implementing resilient distributed messaging patterns such as Transactional Outbox to prevent dual-write anomalies between database updates and broker events.',
      highlight: 'Guaranteed Delivery'
    },
  ]

  const stats = [
    { value: '03', label: 'CORE BACKEND ARCHITECTURES' },
    { value: 'OCI', label: 'CERTIFIED FOUNDATIONS ASSOCIATE 2025' },
    { value: '02', label: 'PEER-REVIEWED RESEARCH PAPERS' },
    { value: 'SPPU', label: 'COMPUTER ENGINEERING (2022 – 2026)' },
  ]

  return (
    <section id="identity" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12 sm:mb-16">
          <span className="font-mono text-xs text-[#FF056D] tracking-widest uppercase font-bold">
            // 02 IDENTITY & INTENT
          </span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        {/* Asymmetric Editorial Layout: Large Statement on Left, Detailed Blocks on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Oversized Statement */}
          <div className="lg:col-span-6 space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-5xl leading-[1.1] text-[#F4EFE6] tracking-tight uppercase"
            >
              "SOFTWARE IS ONLY AS DEPENDABLE AS ITS <span className="text-[#FF056D]">RESILIENCE</span> UNDER REAL-WORLD LOAD."
            </motion.h2>

            <div className="space-y-4 text-base md:text-lg text-[#F4EFE6]/80 font-sans leading-relaxed border-l-2 border-[#FF056D] pl-6">
              <p>
                I am <span className="text-[#F4EFE6] font-semibold">Saish Sanas</span>, a Java Backend Developer driven by what happens behind the scenes. While interfaces capture user attention, it is the server-side mechanics—correctness, transactional integrity, and relational data modeling—that determine whether an application actually succeeds.
              </p>
              <p className="text-sm md:text-base text-[#8E8A94]">
                Grounded in my Computer Engineering curriculum at Savitribai Phule Pune University and hands-on industry internship experience at Codec Technologies, I focus on solid foundations: writing clean idiomatic Java, structuring deterministic Spring Boot services, designing normalized relational schemas, and orchestrating distributed events.
              </p>
            </div>

            {/* Verified Engineer Credential Badge */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#111216] border border-white/10 hover:border-[#FF056D]/40 transition-all flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden border border-white/15 shrink-0 bg-black/50 shadow-inner">
                <img
                  src="/images/saish-photo-passport.jpg"
                  alt="Saish Sanas - Identity Verification"
                  className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute top-1 left-1 font-mono text-[8px] bg-black/80 text-[#FF056D] px-1 py-0.5 rounded border border-[#FF056D]/30 tracking-tight">
                  ID:VERIFIED
                </div>
              </div>
              <div className="flex-1 space-y-1.5 text-center sm:text-left">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#FF056D] uppercase tracking-wider font-bold">
                    ENGINEER IDENTITY SPECIFICATION
                  </span>
                  <span className="font-mono text-[10px] text-[#8E8A94]">PUNE, IN (UTC+5:30)</span>
                </div>
                <div className="font-display font-bold text-lg text-[#F4EFE6] tracking-wide uppercase">
                  Saish Sanas
                </div>
                <p className="font-mono text-xs text-[#8E8A94] leading-relaxed">
                  B.E. Computer Engineering (SPPU &apos;26) &bull; Oracle Certified Cloud Foundations Associate &bull; 2x Published Researcher
                </p>
                <div className="flex flex-wrap gap-2 pt-1 justify-center sm:justify-start">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-[#F4EFE6] border border-white/5">
                    JAVA 21 / SPRING BOOT
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#FF056D]/10 text-[#FF056D] border border-[#FF056D]/20 font-semibold">
                    POSTGRESQL &bull; DISTRIBUTED
                  </span>
                </div>
              </div>
            </div>

            {/* Verified Statistics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              {stats.map((s, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-display font-black text-2xl sm:text-3xl text-[#F4EFE6] tracking-tight">
                    {s.value}
                  </span>
                  <span className="font-mono text-[10px] text-[#8E8A94] uppercase mt-1 leading-tight">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 3 Architectural Pillars */}
          <div className="lg:col-span-6 space-y-4">
            <span className="font-mono text-xs text-[#8E8A94] uppercase tracking-wider block mb-4">
              // CORE ENGINEERING PILLARS
            </span>

            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <motion.div
                  key={pillar.num}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  onMouseEnter={playHover}
                  className="group relative p-6 sm:p-7 rounded-2xl bg-[#111215] border border-[#202126] hover:border-[#FF056D]/60 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#15161A] border border-white/10 flex items-center justify-center text-[#FF056D] group-hover:scale-110 group-hover:border-[#FF056D]/40 transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-[#F4EFE6] tracking-wide uppercase">
                        {pillar.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-[#FF056D] font-bold">
                      {pillar.num}
                    </span>
                  </div>

                  <p className="text-sm text-[#8E8A94] font-sans leading-relaxed mb-4">
                    {pillar.text}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="font-mono text-[11px] text-[#5E5D66] uppercase">
                      TECH FOCUS:
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#FF056D] bg-[#FF056D]/10 px-2.5 py-0.5 rounded">
                      {pillar.highlight}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
