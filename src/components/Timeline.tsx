import { motion } from 'framer-motion'
import { CheckCircle2, Briefcase, GraduationCap, Award, BookOpen, ShieldCheck } from 'lucide-react'
import { timeline } from '../data/timeline'
import { useAudioFx } from '../hooks/useAudioFx'

export function Timeline() {
  const { playHover } = useAudioFx()

  return (
    <section id="journey" className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#090A0C] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#FF056D] tracking-widest uppercase font-bold">
                // 06 AUTHENTIC CHRONOLOGY & EXPERIENCE
              </span>
              <div className="h-[1px] w-12 bg-white/20" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#F4EFE6] tracking-tight uppercase">
              ENGINEERING <span className="text-[#FF056D]">TRAJECTORY</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#8E8A94] font-sans">
            A genuine progression grounded in computer engineering fundamentals, industry internship experience, formal research scholarship, and active backend development.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-white/15 ml-4 md:ml-36 space-y-12 sm:space-y-16">
          {timeline.map((item, index) => {
            const isActive = item.status === 'ACTIVE'
            const isInternship = item.status === 'INTERNSHIP'

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={playHover}
                className="relative pl-8 sm:pl-12 group"
              >
                {/* Milestone Node on Axis */}
                <div
                  className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                    isInternship
                      ? 'bg-[#FF056D] border-[#FF056D] shadow-[0_0_12px_rgba(255,5,109,0.7)]'
                      : isActive
                      ? 'bg-[#FF056D] border-[#FF056D] shadow-[0_0_12px_rgba(255,5,109,0.5)]'
                      : 'bg-[#090A0C] border-white/40 group-hover:border-[#FF056D]'
                  }`}
                />

                {/* Left Year Label (positioned absolute on desktop) */}
                <div className="md:absolute md:-left-40 md:top-0 font-mono text-xs font-bold text-[#8E8A94] group-hover:text-[#FF056D] transition-colors mb-2 md:mb-0">
                  <span className="block text-sm text-[#F4EFE6] font-display">{item.year}</span>
                  <span className="text-[10px] text-[#8E8A94]">{item.period}</span>
                </div>

                {/* Timeline Card */}
                <div className={`p-6 sm:p-8 rounded-2xl bg-[#111215] border transition-all ${
                  isInternship
                    ? 'border-[#FF056D]/40 shadow-lg shadow-[#FF056D]/5 group-hover:border-[#FF056D]'
                    : 'border-white/10 group-hover:border-white/25'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[11px] font-bold text-[#FF056D] bg-[#FF056D]/10 px-2.5 py-0.5 rounded border border-[#FF056D]/20">
                      {item.tag}
                    </span>

                    <span className="font-mono text-[10px] text-[#8E8A94] flex items-center gap-1.5">
                      {isInternship ? (
                        <>
                          <Briefcase className="w-3.5 h-3.5 text-[#FF056D]" />
                          <span className="text-[#F4EFE6] font-semibold">INDUSTRY INTERNSHIP</span>
                        </>
                      ) : isActive ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF056D] animate-pulse"></span>
                          IN ACTIVE PROGRESS
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-[#FF056D]" />
                          VERIFIED RECORD
                        </>
                      )}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#F4EFE6] tracking-tight uppercase group-hover:text-[#FF056D] transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-mono text-xs text-[#8E8A94] mt-1 mb-4">
                    // {item.subtitle}
                  </p>

                  <p className="text-sm text-[#F4EFE6]/80 font-sans leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Deliverables / Key Focus */}
                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <span className="font-mono text-[10px] text-[#8E8A94] uppercase tracking-wider block font-bold">
                      KEY DELIVERABLES & FOCUS:
                    </span>
                    <ul className="space-y-1.5 text-xs font-mono text-[#8E8A94]">
                      {item.deliverables.map((del, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <span className="text-[#FF056D] font-bold">›</span>
                          <span className="text-[#F4EFE6]/90">{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
