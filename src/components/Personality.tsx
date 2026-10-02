import { motion } from 'framer-motion'
import { Trophy, Gamepad2, Award, Globe, Sparkles, Activity } from 'lucide-react'
import { useAudioFx } from '../hooks/useAudioFx'
import { MangaPersonalityBackground } from './MangaBackgroundAtmosphere'

export function Personality() {
  const { playHover } = useAudioFx()

  const languages = [
    {
      name: 'Marathi',
      level: 'Fluent / Native',
      tag: 'Primary Native Language',
      proficiency: 100,
      description: 'Maternal native fluency with total spoken, written, and expressive command.',
    },
    {
      name: 'Hindi',
      level: 'Fluent / Native',
      tag: 'National Fluency',
      proficiency: 100,
      description: 'Complete native bilingual fluency across professional, colloquial, and formal dialogue.',
    },
    {
      name: 'English',
      level: 'Intermediate',
      tag: 'Professional Working Proficiency',
      proficiency: 75,
      description: 'Technical engineering communication, architecture documentation, and collaborative dialogue.',
    },
    {
      name: 'Japanese',
      level: 'Beginner',
      tag: 'Foundational Acquisition',
      proficiency: 30,
      description: 'Active foundational study covering kana (Hiragana/Katakana), basic Kanji, and everyday grammar.',
    },
  ]

  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#07080A] relative overflow-hidden">
      <MangaPersonalityBackground />
      <div className="max-w-7xl mx-auto space-y-20">
        {/* ============================================================
            SECTION 01: PERSONAL INTERESTS & ATHLETIC DISCIPLINES
            ============================================================ */}
        <div>
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs text-[#FF056D] tracking-widest uppercase font-bold">
                  // 08 BEYOND THE CODE
                </span>
                <div className="h-[1px] w-12 bg-white/20" />
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#F4EFE6] tracking-tight uppercase">
                ATHLETIC DISCIPLINES & <span className="text-[#FF056D]">INTERESTS</span>
              </h2>
            </div>

            <p className="max-w-md text-sm text-[#8E8A94] font-sans">
              Competitive team athletics, physical conditioning, and interactive gaming that cultivate tactical spatial awareness, focus, and fast decision-making.
            </p>
          </div>

          {/* Interests Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* FEATURED: Football (Primary Prominence - 12 cols or large focal card) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onMouseEnter={playHover}
              className="lg:col-span-12 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#121319] via-[#0E0F14] to-[#151218] border-2 border-[#FF056D]/40 hover:border-[#FF056D] transition-all relative overflow-hidden group shadow-2xl"
            >
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF056D]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:bg-[#FF056D]/15 transition-all" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-8">
                <div className="flex-1 space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs text-[#FF056D] bg-[#FF056D]/10 border border-[#FF056D]/30 px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#FF056D]" />
                      PRIMARY ATHLETIC DISCIPLINE
                    </span>
                    <span className="font-mono text-xs text-[#F4EFE6]/80 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
                      Zilla Parishad & Pune District Level
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#F4EFE6] tracking-tight uppercase group-hover:text-[#FF056D] transition-colors">
                      FOOTBALL // MIDFIELD CONTROL & TACTICAL EXECUTION
                    </h3>
                    <p className="font-mono text-xs text-[#8E8A94] uppercase tracking-wider mt-1">
                      COMPETITIVE SCHOOL & DISTRICT SQUAD REPRESENTATION
                    </p>
                  </div>

                  <blockquote className="border-l-2 border-[#FF056D] pl-4 sm:pl-6 py-1 font-sans text-base sm:text-lg text-[#F4EFE6] italic leading-relaxed">
                    "Passionate football player with several years of playing experience. Represented my school team at Zilla Parishad level and Pune district level."
                  </blockquote>

                  <p className="text-sm text-[#8E8A94] font-sans leading-relaxed max-w-3xl">
                    Years of competitive football have instilled a mindset of situational awareness, rapid tactical transitions, and collective accountability. Operating under high match tempo requires reading positional spacing, anticipating defensive press, and executing passes with deterministic timing—qualities that directly influence how I architect clean, resilient distributed software.
                  </p>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between gap-4 shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-[#FF056D]/10 border border-[#FF056D]/30 flex items-center justify-center text-[#FF056D] group-hover:scale-110 transition-transform shadow-lg shadow-[#FF056D]/10">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <div className="font-mono text-right text-xs text-[#8E8A94]">
                    <span className="block text-[#FF056D] font-bold">MULTIPLE SEASONS</span>
                    <span>DISTRICT LEVEL</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8E8A94]">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[#F4EFE6]">
                    Midfield Positioning
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[#F4EFE6]">
                    High-Tempo Coordination
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[#F4EFE6]">
                    Match Stamina & Grit
                  </span>
                </div>
                <span className="text-[#FF056D] font-semibold">// 90-MINUTE FOCUS</span>
              </div>
            </motion.div>

            {/* GAMING (6 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onMouseEnter={playHover}
              className="lg:col-span-6 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#121319] via-[#0E0F14] to-[#151218] border-2 border-[#FF056D]/30 hover:border-[#FF056D] transition-all flex flex-col justify-between group shadow-2xl relative overflow-hidden"
            >
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF056D]/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16 group-hover:bg-[#FF056D]/15 transition-all" />

              {/* Corner Crosshairs Accent */}
              <span className="absolute -top-1.5 -left-1.5 font-mono text-[10px] text-[#FF056D]/40 select-none">+</span>
              <span className="absolute -top-1.5 -right-1.5 font-mono text-[10px] text-[#FF056D]/40 select-none">+</span>
              <span className="absolute -bottom-1.5 -left-1.5 font-mono text-[10px] text-[#FF056D]/40 select-none">+</span>
              <span className="absolute -bottom-1.5 -right-1.5 font-mono text-[10px] text-[#FF056D]/40 select-none">+</span>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#FF056D]/10 border border-[#FF056D]/30 flex items-center justify-center text-[#FF056D] group-hover:scale-110 transition-transform shadow-lg shadow-[#FF056D]/10">
                    <Gamepad2 className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] text-[#8E8A94] uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded border border-white/5">
                    INTERACTIVE DOWNTIME
                  </span>
                </div>

                <span className="font-mono text-xs text-[#FF056D] font-bold uppercase tracking-wider block mb-1">
                  COGNITIVE RECREATION
                </span>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F4EFE6] tracking-tight uppercase mb-4">
                  GAMING & INTERACTIVE SYSTEMS
                </h3>

                <blockquote className="border-l-2 border-[#FF056D] pl-4 py-1 font-sans text-sm text-[#F4EFE6] italic leading-relaxed mb-4">
                  "I enjoy competitive games such as Valorant, PUBG, BGMI, and Counter-Strike, along with story-driven games that offer immersive worlds and rich interactive experiences."
                </blockquote>

                <p className="text-xs sm:text-sm text-[#8E8A94] font-sans leading-relaxed">
                  Engaging in tactical coordination, real-time input reflexes, and mechanical strategy serves as an invigorating creative balance to systems architecture and backend engineering.
                </p>

                {/* Typography-based game tags */}
                <div className="mt-4 pt-3 flex flex-wrap gap-1.5 font-mono text-[11px]">
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[#F4EFE6]/90">
                    Valorant
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[#F4EFE6]/90">
                    Counter-Strike
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[#F4EFE6]/90">
                    PUBG / BGMI
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[#F4EFE6]/90">
                    Story-Driven Worlds
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between font-mono text-xs text-[#8E8A94] relative z-10">
                <span>ENGAGEMENT STYLE</span>
                <span className="text-[#FF056D] font-bold">TACTICAL & IMMERSIVE</span>
              </div>
            </motion.div>

            {/* TAEKWONDO (6 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onMouseEnter={playHover}
              className="lg:col-span-6 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#121319] via-[#0E0F14] to-[#151218] border-2 border-[#FF056D]/30 hover:border-[#FF056D] transition-all flex flex-col justify-between group shadow-2xl relative overflow-hidden"
            >
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF056D]/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16 group-hover:bg-[#FF056D]/15 transition-all" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#FF056D]/10 border border-[#FF056D]/30 flex items-center justify-center text-[#FF056D] group-hover:scale-110 transition-transform shadow-lg shadow-[#FF056D]/10">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] text-[#FF056D] bg-[#FF056D]/10 border border-[#FF056D]/30 px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                    BRONZE MEDALIST
                  </span>
                </div>

                <span className="font-mono text-xs text-[#FF056D] font-bold uppercase tracking-wider block mb-1">
                  MARTIAL ARTS DISCIPLINE
                </span>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F4EFE6] tracking-tight uppercase mb-4">
                  TAEKWONDO // PUNE DISTRICT LEVEL
                </h3>

                <blockquote className="border-l-2 border-[#FF056D]/40 pl-4 py-1 font-sans text-sm text-[#F4EFE6]/90 italic leading-relaxed mb-4">
                  "Trained in Taekwondo and earned a Bronze Medal at the Pune District level."
                </blockquote>

                <p className="text-xs sm:text-sm text-[#8E8A94] font-sans leading-relaxed">
                  Martial arts training demands strict mental discipline, kinetic precision, reflex control, and composure under pressure—instilling a high tolerance for rigorous iterative improvement.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between font-mono text-xs text-[#8E8A94] relative z-10">
                <span>OFFICIAL RECOGNITION</span>
                <span className="text-[#FF056D] font-bold">PUNE DISTRICT BRONZE MEDAL</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ============================================================
            SECTION 02: DEDICATED LANGUAGES SECTION
            ============================================================ */}
        <div>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs text-[#FF056D] tracking-widest uppercase font-bold">
                  // LINGUISTIC PROFICIENCY
                </span>
                <div className="h-[1px] w-12 bg-white/20" />
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#F4EFE6] tracking-tight uppercase">
                COMMUNICATION & <span className="text-[#FF056D]">LANGUAGES</span>
              </h3>
            </div>

            <p className="max-w-md text-xs sm:text-sm text-[#8E8A94] font-sans">
              Clear technical articulation and multicultural communication across regional, national, and international engineering environments.
            </p>
          </div>

          {/* Languages 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {languages.map((lang, idx) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onMouseEnter={playHover}
                className="p-6 rounded-2xl bg-[#111216] border border-white/10 hover:border-[#FF056D]/40 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#17181D] border border-white/10 flex items-center justify-center text-[#FF056D] group-hover:scale-110 transition-transform">
                      <Globe className="w-5 h-5" />
                    </div>

                    <span className="font-mono text-[10px] text-[#FF056D] bg-[#FF056D]/10 border border-[#FF056D]/30 px-2 py-0.5 rounded font-bold uppercase">
                      {lang.level}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-xl text-[#F4EFE6] uppercase group-hover:text-[#FF056D] transition-colors mb-1">
                    {lang.name}
                  </h4>

                  <span className="font-mono text-[10px] text-[#8E8A94] uppercase tracking-wider block mb-3">
                    {lang.tag}
                  </span>

                  <p className="text-xs text-[#8E8A94] font-sans leading-relaxed mb-6">
                    {lang.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#8E8A94]">
                    <span>PROFICIENCY</span>
                    <span className="text-[#F4EFE6] font-semibold">{lang.level}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                      className="h-full bg-[#FF056D] rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
