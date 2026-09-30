import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, ExternalLink, ArrowUpRight, CheckCircle2, FileText, Bookmark, Award, Eye, ShieldAlert, BarChart3, Users } from 'lucide-react'
import { publications } from '../data/publications'
import { PublicationLightboxModal, LightboxData } from './PublicationLightboxModal'
import { useAudioFx } from '../hooks/useAudioFx'

export function ResearchPublications() {
  const { playClick, playHover } = useAudioFx()
  const [selectedArtwork, setSelectedArtwork] = useState<LightboxData | null>(null)

  return (
    <section id="research" className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#090A0C] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#FF056D] tracking-widest uppercase font-bold">
                // 06 SCHOLARLY RESEARCH & PAPERS
              </span>
              <div className="h-[1px] w-12 bg-white/20" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#F4EFE6] tracking-tight uppercase">
              RESEARCH / <span className="text-[#FF056D]">PUBLICATIONS</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#8E8A94] font-sans">
            Formal research investigating low-latency mobile distress communication, emergency telemetry protocols, and empirical usability analysis.
          </p>
        </div>

        {/* Distinctive Publication Layout */}
        <div className="space-y-12 sm:space-y-16">
          {publications.map((pub, idx) => (
            <motion.article
              key={pub.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onMouseEnter={playHover}
              className="group relative rounded-3xl bg-[#111216] border border-white/10 hover:border-[#FF056D]/60 transition-all p-6 sm:p-10 shadow-2xl overflow-hidden"
            >
              {/* Corner Watermark / Index */}
              <div className="absolute top-4 right-8 font-display font-black text-6xl sm:text-8xl text-white/[0.03] select-none pointer-events-none group-hover:text-[#FF056D]/5 transition-colors">
                PUB // 0{idx + 1}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                {/* Left Metadata & Actions Column (4 cols) */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF056D]"></span>
                    <span className="font-mono text-xs text-[#FF056D] font-bold uppercase tracking-wider">
                      RESEARCH PAPER // {pub.number}
                    </span>
                  </div>

                  {/* Journal & Metadata Details Card */}
                  <div className="p-4 rounded-xl bg-[#090A0D] border border-white/5 space-y-3 font-mono text-xs">
                    <div>
                      <span className="text-[#5E5B56] text-[10px] uppercase block">JOURNAL:</span>
                      <span className="text-[#F4EFE6] font-medium block mt-0.5">{pub.journal}</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-2">
                      <span className="text-[#5E5B56] text-[10px] uppercase">TIMELINE:</span>
                      <span className="text-[#8E8A94]">{pub.date}</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-2">
                      <span className="text-[#5E5B56] text-[10px] uppercase">VOLUME & ISSUE:</span>
                      <span className="text-[#8E8A94]">{pub.volumeIssue}</span>
                    </div>

                    {pub.doi && (
                      <div className="border-t border-white/5 pt-2">
                        <span className="text-[#5E5B56] text-[10px] uppercase block">DOI IDENTIFIER:</span>
                        <span className="text-[#FF056D] font-semibold break-all block mt-0.5">{pub.doi}</span>
                      </div>
                    )}

                    {pub.issn && (
                      <div className="border-t border-white/5 pt-2">
                        <span className="text-[#5E5B56] text-[10px] uppercase block">ISSN IDENTIFIER:</span>
                        <span className="text-[#8E8A94] font-semibold block mt-0.5">{pub.issn}</span>
                      </div>
                    )}

                    {/* Authors List */}
                    <div className="border-t border-white/5 pt-2">
                      <span className="text-[#5E5B56] text-[10px] uppercase block mb-1">AUTHORS:</span>
                      <div className="flex flex-wrap gap-1">
                        {pub.authors.map((author, aIdx) => (
                          <span
                            key={aIdx}
                            className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                              author.includes('Saish Sanas')
                                ? 'bg-[#FF056D]/15 text-[#FF056D] font-bold border border-[#FF056D]/30'
                                : 'bg-white/5 text-[#F4EFE6]/80'
                            }`}
                          >
                            {author}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Preview if available */}
                  {pub.thumbnailImage && (
                    <div
                      onClick={() => {
                        playClick()
                        setSelectedArtwork({
                          title: pub.title,
                          subtitle: `${pub.journal} • ${pub.volumeIssue}`,
                          imageSrc: pub.thumbnailImage!,
                          type: 'PAPER',
                          linkUrl: pub.link,
                        })
                      }}
                      className="group/thumb relative rounded-xl overflow-hidden border border-white/10 aspect-[4/3] bg-black/50 cursor-pointer hover:border-[#FF056D] transition-all"
                    >
                      <img
                        src={pub.thumbnailImage}
                        alt={pub.title}
                        className="w-full h-full object-cover object-top group-hover/thumb:scale-105 transition-transform duration-300 opacity-90 group-hover/thumb:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-3 flex items-end justify-between font-mono text-xs">
                        <span className="text-[#F4EFE6] text-[10px] font-bold">PAPER PREVIEW</span>
                        <span className="text-[#FF056D] text-[10px] flex items-center gap-1 font-bold">
                          <Eye className="w-3 h-3" /> EXPAND
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Interactive Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {/* VIEW PAPER Button */}
                    {pub.thumbnailImage && (
                      <button
                        onClick={() => {
                          playClick()
                          setSelectedArtwork({
                            title: pub.title,
                            subtitle: `${pub.journal} • ${pub.volumeIssue}`,
                            imageSrc: pub.thumbnailImage!,
                            type: 'PAPER',
                            linkUrl: pub.link,
                          })
                        }}
                        data-cursor="VIEW"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#16171C] hover:bg-[#1D1E24] text-[#F4EFE6] border border-white/10 hover:border-[#FF056D]/50 font-mono text-xs font-semibold uppercase tracking-wider transition-all"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#FF056D]" />
                        <span>VIEW PAPER</span>
                      </button>
                    )}

                    {/* VIEW CERTIFICATE Button */}
                    {pub.certificateImage && (
                      <button
                        onClick={() => {
                          playClick()
                          setSelectedArtwork({
                            title: pub.title,
                            subtitle: `Official Publication Certificate // Author: Saish Sanas (Paper ID: IRJMETS71100089260)`,
                            imageSrc: pub.certificateImage!,
                            type: 'CERTIFICATE',
                            linkUrl: pub.link,
                          })
                        }}
                        data-cursor="CERTIFICATE"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#16171C] hover:bg-[#1D1E24] text-[#F4EFE6] border border-white/10 hover:border-[#FF056D]/50 font-mono text-xs font-semibold uppercase tracking-wider transition-all"
                      >
                        <Award className="w-3.5 h-3.5 text-[#FF056D]" />
                        <span>VIEW CERTIFICATE</span>
                      </button>
                    )}

                    {/* DOI External Link */}
                    {pub.link && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playClick}
                        data-cursor="DOI"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF056D] hover:bg-[#B8004C] text-[#F4EFE6] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#FF056D]/20"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>ACCESS VIA DOI ↗</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Description & Key Contributions Column (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-[#F4EFE6] tracking-tight leading-snug uppercase group-hover:text-[#FF056D] transition-colors">
                      {pub.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-[#8E8A94] font-sans leading-relaxed">
                    {pub.description}
                  </p>

                  {/* Compact REPORTED RESULTS Panel for Publication 02 */}
                  {pub.reportedResults && pub.reportedResults.length > 0 && (
                    <div className="rounded-2xl bg-[#0B0C0F] border border-[#FF056D]/30 p-5 sm:p-6 space-y-4 shadow-xl">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2 font-mono text-xs text-[#FF056D]">
                          <BarChart3 className="w-4 h-4 text-[#FF056D]" />
                          <span className="font-bold tracking-wider uppercase">REPORTED IN CONTROLLED EVALUATION</span>
                        </div>
                        <span className="font-mono text-[10px] text-[#8E8A94] uppercase bg-white/5 px-2 py-0.5 rounded">
                          EMPIRICAL STUDY DATA
                        </span>
                      </div>

                      {/* 3 Metric Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {pub.reportedResults.map((res, rIdx) => (
                          <div
                            key={rIdx}
                            className="p-3.5 rounded-xl bg-[#121318] border border-white/5 space-y-1"
                          >
                            <span className="font-mono text-[10px] text-[#8E8A94] block uppercase">
                              {res.metric}
                            </span>
                            <span className="font-display font-extrabold text-2xl text-[#FF056D] block">
                              {res.value}
                            </span>
                            <span className="font-mono text-[10px] text-[#5E5D66] block">
                              {res.sample}
                            </span>
                            <p className="font-sans text-[11px] text-[#F4EFE6]/80 pt-1 leading-snug">
                              {res.detail}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Explicit Limitations Note */}
                      {pub.limitationsNote && (
                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5 font-mono text-[11px] text-[#8E8A94] leading-relaxed">
                          <ShieldAlert className="w-4 h-4 text-[#FF056D] shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-[#F4EFE6] font-semibold">Evaluation Context & Scope: </strong>
                            {pub.limitationsNote}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Key Empirical Contributions */}
                  <div className="p-5 rounded-2xl bg-[#090A0D] border border-white/5 space-y-3">
                    <span className="font-mono text-[10px] text-[#FF056D] uppercase tracking-wider font-bold block">
                      KEY EMPIRICAL & RESEARCH CONTRIBUTIONS:
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm font-sans text-[#8E8A94]">
                      {pub.keyContributions.map((contrib, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#FF056D] mt-0.5 shrink-0" />
                          <span className="text-[#F4EFE6]/90">{contrib}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Publication & Certificate Lightbox Modal */}
      <PublicationLightboxModal
        data={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />
    </section>
  )
}

