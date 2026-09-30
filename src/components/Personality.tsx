import { motion } from 'framer-motion'
import { Target, Cpu } from 'lucide-react'
import { useAudioFx } from '../hooks/useAudioFx'

export function Personality() {
  const { playHover } = useAudioFx()

  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#07080A] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12 sm:mb-16">
          <span className="font-mono text-xs text-[#FF056D] tracking-widest uppercase font-bold">
            // 08 BEYOND THE CODE
          </span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Football & Tactical Parallels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onMouseEnter={playHover}
            className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-[#111216] border border-white/10 hover:border-[#FF056D]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-[#FF056D] font-bold uppercase tracking-wider">
                  01 // TACTICAL APPRECIATION
                </span>
                <Target className="w-5 h-5 text-[#FF056D]" />
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F4EFE6] tracking-tight uppercase mb-4">
                FOOTBALL & MIDFIELD TRANSITIONS
              </h3>

              <p className="text-sm sm:text-base text-[#F4EFE6]/80 font-sans leading-relaxed mb-4">
                I have a deep fascination with football—particularly tactical positional play (Juego de Posición). The way an elite midfield controls tempo, exploits half-spaces, and transitions instantly from defensive pressure to counter-attack mirrors how distributed message brokers buffer and route high-throughput event spikes.
              </p>

              <p className="text-xs sm:text-sm text-[#8E8A94] font-sans leading-relaxed">
                Whether on a pitch or inside an event loop, success comes down to spacing, deterministic movement, and making split-second decisions with zero hesitation.
              </p>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between font-mono text-xs text-[#8E8A94]">
              <span>DISCIPLINE & STRATEGY</span>
              <span className="text-[#F4EFE6] font-medium">90 MINUTES OF HIGH FOCUS</span>
            </div>
          </motion.div>

          {/* Right Column: Systems Curiosity & Core Belief */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onMouseEnter={playHover}
            className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-[#111216] border border-white/10 hover:border-[#FF056D]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-[#FF056D] font-bold uppercase tracking-wider">
                  02 // MECHANICAL INTELLECT
                </span>
                <Cpu className="w-5 h-5 text-[#FF056D]" />
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F4EFE6] tracking-tight uppercase mb-4">
                HARDWARE LATENCY & APPLIED PHYSICS
              </h3>

              <p className="text-sm sm:text-base text-[#F4EFE6]/80 font-sans leading-relaxed mb-4">
                I enjoy studying the physical limits of computing: L1/L2 CPU cache lines, disk seek penalties, B-tree branch fan-out in PostgreSQL, and network packet round-trip times.
              </p>

              <p className="text-xs sm:text-sm text-[#8E8A94] font-sans leading-relaxed">
                Understanding what the machine is physically doing underneath the JVM abstraction prevents premature optimizations while ensuring systems remain performant under genuine stress.
              </p>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between font-mono text-xs text-[#8E8A94]">
              <span>ENGINEERING CREED</span>
              <span className="text-[#FF056D] font-bold">"PREDICTABLE OVER CLEVER"</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
