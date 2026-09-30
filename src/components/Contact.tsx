import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, FileText, Mail, ArrowUpRight, Send, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './SocialIcons'
import confetti from 'canvas-confetti'
import { useAudioFx } from '../hooks/useAudioFx'

interface ContactProps {
  onOpenResume: () => void
}

export function Contact({ onOpenResume }: ContactProps) {
  const { playClick, playHover, playSuccess } = useAudioFx()
  const [copied, setCopied] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState('Java Backend Role / Opportunity')
  const [customNote, setCustomNote] = useState('')

  const emailAddress = 'saishsanas@gmail.com'

  const subjects = [
    'Java Backend Role / Opportunity',
    'Spring Boot Microservices Inquiry',
    'Technical Interview / Discussion',
    'General Collaboration',
  ]

  const handleCopyEmail = () => {
    playSuccess()
    navigator.clipboard.writeText(emailAddress)
    setCopied(true)

    // Trigger subtle hot pink & warm white confetti burst
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#FF056D', '#F4EFE6', '#B8004C'],
    })

    setTimeout(() => setCopied(false), 2500)
  }

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault()
    playClick()
    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      selectedSubject
    )}&body=${encodeURIComponent(customNote || 'Hi Saish,\n\nI reviewed your portfolio and would like to connect regarding an opportunity...')}`
    window.location.href = mailtoUrl
  }

  return (
    <section id="contact" className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#090A0C] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12 sm:mb-16">
          <span className="font-mono text-xs text-[#FF056D] tracking-widest uppercase font-bold">
            // 09 CONTACT & RECRUITER DESK
          </span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        {/* Massive Editorial Headline */}
        <div className="space-y-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display font-extrabold text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] tracking-tight uppercase text-[#F4EFE6]"
          >
            LET'S BUILD <span className="text-[#FF056D]">SOMETHING</span> RELIABLE.
          </motion.h2>

          <p className="max-w-2xl text-base sm:text-lg text-[#8E8A94] font-sans leading-relaxed">
            I am actively open to high-impact Java Backend Developer and Software Engineering roles. If your team values deterministic architecture, clean code, and solid engineering discipline, let's talk.
          </p>
        </div>

        {/* 2-Column Action Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Recruiter Command Card (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#111216] border border-white/10 space-y-8 shadow-2xl">
              {/* Copy Email Box */}
              <div>
                <span className="font-mono text-xs text-[#8E8A94] uppercase tracking-wider block mb-3 font-bold">
                  // DIRECT ELECTRONIC MAIL
                </span>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="flex-1 p-4 rounded-xl bg-[#090A0D] border border-white/10 font-mono text-sm sm:text-base text-[#F4EFE6] flex items-center justify-between">
                    <span>{emailAddress}</span>
                    <Mail className="w-4 h-4 text-[#8E8A94]" />
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    onMouseEnter={playHover}
                    data-cursor="COPY"
                    className="px-6 py-4 rounded-xl bg-[#FF056D] hover:bg-[#B8004C] text-[#F4EFE6] font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#FF056D]/20 shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#F4EFE6]" />
                        <span>COPIED TO CLIPBOARD</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#F4EFE6]" />
                        <span>COPY EMAIL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Preset Mail Dispatcher */}
              <form onSubmit={handleSendMail} className="space-y-4 pt-4 border-t border-white/10">
                <span className="font-mono text-xs text-[#8E8A94] uppercase tracking-wider block font-bold">
                  // QUICK MAILTO GENERATOR
                </span>

                <div className="space-y-2">
                  <label className="font-mono text-[11px] text-[#8E8A94] block">
                    TOPIC:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map((subj) => (
                      <button
                        type="button"
                        key={subj}
                        onClick={() => {
                          playClick()
                          setSelectedSubject(subj)
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                          selectedSubject === subj
                            ? 'bg-[#FF056D]/20 text-[#FF056D] border border-[#FF056D]/60 font-bold'
                            : 'bg-white/5 text-[#8E8A94] hover:text-[#F4EFE6] border border-white/5'
                        }`}
                      >
                        {subj}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[11px] text-[#8E8A94] block">
                    CUSTOM NOTE (OPTIONAL):
                  </label>
                  <textarea
                    rows={3}
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="We have an open Java / Spring Boot backend position and would like to review your background..."
                    className="w-full p-3.5 rounded-xl bg-[#090A0D] border border-white/10 text-[#F4EFE6] font-sans text-xs focus:border-[#FF056D] focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={playHover}
                  className="w-full py-3.5 rounded-xl bg-[#FF056D] hover:bg-[#B8004C] text-[#F4EFE6] font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-[#FF056D]/20"
                >
                  <Send className="w-3.5 h-3.5 text-[#F4EFE6]" />
                  <span>OPEN IN DEFAULT EMAIL CLIENT</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Direct Channels & Verified Location (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Status & Location Card */}
            <div className="p-6 rounded-2xl bg-[#111216] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#FF056D]">
                <span className="w-2 h-2 rounded-full bg-[#FF056D] animate-pulse"></span>
                <span className="font-bold">SYSTEM TELEMETRY: READY</span>
              </div>
              <p className="font-sans text-xs text-[#8E8A94] leading-relaxed">
                Available for full-time backend software engineer roles, remote or on-site. Immediate start capability.
              </p>
              <div className="pt-2 border-t border-white/5 font-mono text-xs text-[#8E8A94] flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF056D]" />
                <span>Pune, Maharashtra, India (Open to Relocation)</span>
              </div>
            </div>

            {/* Resume Fast Action Card */}
            <button
              onClick={() => {
                playClick()
                onOpenResume()
              }}
              onMouseEnter={playHover}
              data-cursor="RESUME"
              className="w-full text-left p-6 rounded-2xl bg-[#111216] hover:bg-[#18191F] border border-white/10 hover:border-[#FF056D]/50 transition-all group flex items-center justify-between shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#18191E] border border-white/10 flex items-center justify-center text-[#FF056D] group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-display font-bold text-base text-[#F4EFE6] group-hover:text-[#FF056D] transition-colors block uppercase">
                    CURRICULUM VITAE
                  </span>
                  <span className="font-mono text-xs text-[#8E8A94]">
                    Interactive Preview & PDF Export ↗
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#8E8A94] group-hover:text-[#FF056D] transition-colors" />
            </button>

            {/* LinkedIn Card */}
            <a
              href="https://www.linkedin.com/in/saish-sanas-48932433/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              data-cursor="CONNECT"
              className="w-full p-6 rounded-2xl bg-[#111216] hover:bg-[#18191F] border border-white/10 hover:border-[#FF056D]/50 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#18191E] border border-white/10 flex items-center justify-center text-[#8E8A94] group-hover:text-[#FF056D] group-hover:scale-110 transition-transform">
                  <LinkedinIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-display font-bold text-base text-[#F4EFE6] group-hover:text-[#FF056D] transition-colors block uppercase">
                    LINKEDIN ↗
                  </span>
                  <span className="font-mono text-xs text-[#8E8A94]">
                    Professional Network & Recommendations
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#8E8A94] group-hover:text-[#FF056D] transition-colors" />
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/saishsanas"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              data-cursor="EXPLORE"
              className="w-full p-6 rounded-2xl bg-[#111216] hover:bg-[#18191F] border border-white/10 hover:border-[#FF056D]/50 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#18191E] border border-white/10 flex items-center justify-center text-[#8E8A94] group-hover:scale-110 group-hover:text-[#FF056D] transition-all">
                  <GithubIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-display font-bold text-base text-[#F4EFE6] group-hover:text-[#FF056D] transition-colors block uppercase">
                    GITHUB ↗
                  </span>
                  <span className="font-mono text-xs text-[#8E8A94]">
                    Open Source Codebases & Commit History
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#8E8A94] group-hover:text-[#FF056D] transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
