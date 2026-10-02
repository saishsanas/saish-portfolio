import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { techStack } from '../data/techStack'
import { TechItem } from '../types'
import { useAudioFx } from '../hooks/useAudioFx'
import { MangaStackBackground } from './MangaBackgroundAtmosphere'

export function TechStack() {
  const { playClick, playHover, playSelect } = useAudioFx()
  const [selectedTech, setSelectedTech] = useState<TechItem>(techStack[0])
  const [activeCategory, setActiveCategory] = useState<string>('ALL')

  const categories = ['ALL', 'Core & Runtime', 'Data & Persistence', 'Distributed & Reliability', 'Interface & Tools']

  const filteredTech =
    activeCategory === 'ALL'
      ? techStack
      : techStack.filter((item) => item.category === activeCategory)

  return (
    <section id="stack" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#090A0C] relative overflow-hidden">
      <MangaStackBackground />
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#FF056D] tracking-widest uppercase font-bold">
                // 03 ENGINEERING STACK
              </span>
              <div className="h-[1px] w-12 bg-white/20" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#F4EFE6] tracking-tight uppercase">
              TECHNICAL <span className="text-[#FF056D]">ARSENAL</span> & RATIONALE
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#8E8A94] font-sans">
            No synthetic percentage bars. Every technology is backed by concrete architectural implementation, usage context, and verifiable project code.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClick()
                setActiveCategory(cat)
              }}
              onMouseEnter={playHover}
              className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#FF056D] text-[#090A0C] font-bold shadow-lg shadow-[#FF056D]/20'
                  : 'bg-[#15161A] text-[#8E8A94] hover:text-[#F4EFE6] hover:bg-[#1D1E24] border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Layout: Left Tech Grid, Right Live Inspector Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tech Grid (7 columns on lg) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredTech.map((tech) => {
              const isSelected = selectedTech.id === tech.id
              return (
                <button
                  key={tech.id}
                  onClick={() => {
                    playSelect()
                    setSelectedTech(tech)
                  }}
                  onMouseEnter={() => {
                    playHover()
                    setSelectedTech(tech)
                  }}
                  data-cursor="INSPECT"
                  className={`text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 border relative group ${
                    isSelected
                      ? 'bg-[#18191F] border-[#FF056D] shadow-lg shadow-[#FF056D]/10 ring-1 ring-[#FF056D]/40'
                      : 'bg-[#111215] border-[#202126] hover:border-white/20 hover:bg-[#15161A]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-base text-[#F4EFE6] group-hover:text-[#FF056D] transition-colors">
                      {tech.name}
                    </span>
                    <span className="font-mono text-[10px] text-[#8E8A94] group-hover:text-[#F4EFE6] uppercase px-2 py-0.5 rounded bg-white/5 border border-white/5">
                      {tech.badge}
                    </span>
                  </div>

                  <p className="text-xs text-[#8E8A94] line-clamp-2 font-sans mb-3 leading-relaxed">
                    {tech.role}
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-white/5">
                    <span className="text-[#5E5D66]">PROJECT:</span>
                    <span className="text-[#F4EFE6]/80 font-medium group-hover:text-[#FF056D] transition-colors">
                      {tech.usedInProject}
                    </span>
                  </div>

                  {isSelected && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -left-[1px] top-4 bottom-4 w-1 bg-[#FF056D] rounded-r"
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Right Live Inspector Console (5 columns on lg) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#111216] border border-white/10 shadow-2xl relative overflow-hidden">
              {/* Console header bar */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[#8E8A94] ml-2 font-mono text-[11px]">TECH_INSPECTOR.v3</span>
                </div>
                <span className="text-[#FF056D] font-bold text-[10px] tracking-wider uppercase">
                  ACTIVE SYMBOL
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTech.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-[#FF056D] font-bold uppercase tracking-wider">
                        {selectedTech.category}
                      </span>
                    </div>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F4EFE6] tracking-tight">
                      {selectedTech.name}
                    </h3>
                    <p className="font-mono text-xs text-[#8E8A94] mt-1">
                      // {selectedTech.role}
                    </p>
                  </div>

                  {/* Technical Explanation */}
                  <div className="p-4 rounded-xl bg-[#090A0C] border border-white/5 font-sans text-sm text-[#F4EFE6]/80 leading-relaxed">
                    {selectedTech.explanation}
                  </div>

                  {/* Key Implementation Features */}
                  <div>
                    <span className="font-mono text-xs text-[#8E8A94] uppercase tracking-wider block mb-2.5">
                      // KEY IMPLEMENTATION PRACTICES
                    </span>
                    <ul className="space-y-2">
                      {selectedTech.keyFeatures.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs font-mono text-[#F4EFE6]/90">
                          <Check className="w-3.5 h-3.5 text-[#FF056D] mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Project Anchor Reference */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-[#8E8A94]">APPLIED IN:</span>
                    <span className="text-[#FF056D] font-bold bg-[#FF056D]/10 px-2 py-0.5 rounded">
                      {selectedTech.usedInProject}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
