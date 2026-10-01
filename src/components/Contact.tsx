import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, FileText, Mail, ArrowUpRight, Send, MapPin, Clock, Globe, Phone } from 'lucide-react'
import { GithubIcon, LinkedinIcon, DiscordIcon } from './SocialIcons'
import confetti from 'canvas-confetti'
import { useAudioFx } from '../hooks/useAudioFx'

interface ContactProps {
  onOpenResume: () => void
}

export function Contact({ onOpenResume }: ContactProps) {
  const { playClick, playHover, playSuccess } = useAudioFx()
  const [copied, setCopied] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState('Java Backend Role / Opportunity')
  const [customNote, setCustomNote] = useState('')

  const emailAddress = 'saishsanas@gmail.com'
  const phoneNumber = '+91 9322546613'
  const telLink = 'tel:+919322546613'

  const subjects = [
    'Java Backend Role / Opportunity',
    'Spring Boot Microservices Inquiry',
    'Technical Interview / Discussion',
    'General Collaboration',
  ]

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
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

  const handleCopyPhone = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    playSuccess()
    navigator.clipboard.writeText(phoneNumber)
    setCopiedPhone(true)
    setTimeout(() => setCopiedPhone(false), 2500)
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
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#FF056D] tracking-widest uppercase font-bold">
            // 09 CONTACT & RECRUITER DESK
          </span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        {/* Massive Editorial Headline */}
        <div className="space-y-4">
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

        {/* ============================================================ */}
        {/* CONTACT HUB — COMPACT RECOGNIZABLE CHANNELS GRID (6 CARDS)  */}
        {/* ============================================================ */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs text-[#8E8A94] uppercase tracking-wider font-bold">
              // INSTANT RECRUITER CONNECT HUB & CHANNELS
            </span>
            <span className="font-mono text-[10px] text-[#FF056D] bg-[#FF056D]/10 border border-[#FF056D]/30 px-2.5 py-1 rounded-full uppercase font-bold">
              ● DIRECT ACCESS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Direct Email Card */}
            <div className="p-5 rounded-2xl bg-[#111216] border border-white/10 hover:border-[#FF056D]/50 transition-all flex flex-col justify-between group shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#18191E] border border-white/10 flex items-center justify-center text-[#FF056D] group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] text-[#8E8A94] tracking-wider uppercase bg-white/5 px-2 py-0.5 rounded">
                    PRIMARY
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#8E8A94] uppercase tracking-wider block">
                  ELECTRONIC MAIL
                </span>
                <a
                  href={`mailto:${emailAddress}`}
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="font-display font-bold text-base text-[#F4EFE6] group-hover:text-[#FF056D] transition-colors truncate block mt-0.5"
                >
                  {emailAddress}
                </a>
                <p className="text-xs text-[#8E8A94] font-sans mt-1">
                  Technical opportunities & engineering conversations.
                </p>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5">
                <a
                  href={`mailto:${emailAddress}`}
                  onClick={playClick}
                  onMouseEnter={playHover}
                  data-cursor="EMAIL"
                  className="flex-1 py-2 px-3 rounded-lg bg-[#FF056D] hover:bg-[#B8004C] text-[#F4EFE6] font-mono text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>SEND EMAIL</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  onMouseEnter={playHover}
                  data-cursor="COPY"
                  className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-[#8E8A94] hover:text-[#F4EFE6] border border-white/10 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 shrink-0"
                  aria-label="Copy email address"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#FF056D]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            </div>

            {/* 2. Phone / WhatsApp Card */}
            <div className="p-5 rounded-2xl bg-[#111216] border border-white/10 hover:border-[#FF056D]/50 transition-all flex flex-col justify-between group shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#18191E] border border-white/10 flex items-center justify-center text-[#FF056D] group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] text-[#8E8A94] tracking-wider uppercase bg-white/5 px-2 py-0.5 rounded">
                    DIRECT CALL
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#8E8A94] uppercase tracking-wider block">
                  TELEPHONE / MOBILE
                </span>
                <a
                  href={telLink}
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="font-display font-bold text-base text-[#F4EFE6] group-hover:text-[#FF056D] transition-colors truncate block mt-0.5"
                >
                  {phoneNumber}
                </a>
                <p className="text-xs text-[#8E8A94] font-sans mt-1">
                  Urgent recruiter syncs, screen calls, and WhatsApp.
                </p>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5">
                <a
                  href={telLink}
                  onClick={playClick}
                  onMouseEnter={playHover}
                  data-cursor="CALL"
                  className="flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-[#FF056D] text-[#F4EFE6] border border-white/10 hover:border-[#FF056D] font-mono text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>CALL DIRECT</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  onMouseEnter={playHover}
                  data-cursor="COPY"
                  className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-[#8E8A94] hover:text-[#F4EFE6] border border-white/10 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 shrink-0"
                  aria-label="Copy phone number"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-[#FF056D]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPhone ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            </div>

            {/* 3. LinkedIn Card */}
            <a
              href="https://www.linkedin.com/in/saish-sanas-48932433/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              data-cursor="CONNECT"
              className="p-5 rounded-2xl bg-[#111216] border border-white/10 hover:border-[#FF056D]/50 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#18191E] border border-white/10 flex items-center justify-center text-[#8E8A94] group-hover:text-[#FF056D] group-hover:scale-110 transition-all">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#8E8A94] group-hover:text-[#FF056D] transition-colors" />
                </div>
                <span className="font-mono text-[10px] text-[#8E8A94] uppercase tracking-wider block">
                  PROFESSIONAL NETWORK
                </span>
                <span className="font-display font-bold text-base text-[#F4EFE6] group-hover:text-[#FF056D] transition-colors block mt-0.5">
                  LinkedIn Profile ↗
                </span>
                <p className="text-xs text-[#8E8A94] font-sans mt-1">
                  Endorsements, recommendations, and industry network.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[11px] text-[#8E8A94] flex items-center justify-between">
                <span>saish-sanas-48932433</span>
                <span className="text-[#FF056D] font-bold group-hover:underline">VIEW PROFILE</span>
              </div>
            </a>

            {/* 4. GitHub Card */}
            <a
              href="https://github.com/saishsanas"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              data-cursor="EXPLORE"
              className="p-5 rounded-2xl bg-[#111216] border border-white/10 hover:border-[#FF056D]/50 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#18191E] border border-white/10 flex items-center justify-center text-[#8E8A94] group-hover:text-[#FF056D] group-hover:scale-110 transition-all">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#8E8A94] group-hover:text-[#FF056D] transition-colors" />
                </div>
                <span className="font-mono text-[10px] text-[#8E8A94] uppercase tracking-wider block">
                  SOURCE CODE & REPOSITORIES
                </span>
                <span className="font-display font-bold text-base text-[#F4EFE6] group-hover:text-[#FF056D] transition-colors block mt-0.5">
                  GitHub Organization ↗
                </span>
                <p className="text-xs text-[#8E8A94] font-sans mt-1">
                  CareWave, Chronos, OutBox-Sync, and open codebases.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[11px] text-[#8E8A94] flex items-center justify-between">
                <span>@saishsanas</span>
                <span className="text-[#FF056D] font-bold group-hover:underline">INSPECT COMMITS</span>
              </div>
            </a>

            {/* 5. Discord Card */}
            <div className="p-5 rounded-2xl bg-[#111216] border border-white/10 hover:border-[#FF056D]/40 transition-all flex flex-col justify-between group shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#18191E] border border-white/10 flex items-center justify-center text-[#8E8A94] group-hover:text-[#FF056D] group-hover:scale-110 transition-all">
                    <DiscordIcon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] text-[#8E8A94] tracking-wider uppercase bg-white/5 px-2 py-0.5 rounded">
                    ON REQUEST
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#8E8A94] uppercase tracking-wider block">
                  COMMUNICATION HUB
                </span>
                <span className="font-display font-bold text-base text-[#F4EFE6] block mt-0.5">
                  Discord Channel
                </span>
                <p className="text-xs text-[#8E8A94] font-sans mt-1">
                  Available on request for engineering dialogue and pair-screen sessions.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[11px] text-[#8E8A94] flex items-center justify-between">
                <span className="text-[#F4EFE6]/70">Handle: Shared via Email</span>
                <span className="text-[#FF056D] font-bold">READY</span>
              </div>
            </div>

            {/* 6. Location & Time Zone Card */}
            <div className="p-5 rounded-2xl bg-[#111216] border border-white/10 hover:border-[#FF056D]/40 transition-all flex flex-col justify-between group shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#18191E] border border-white/10 flex items-center justify-center text-[#FF056D]">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] text-[#FF056D] tracking-wider uppercase bg-[#FF056D]/10 border border-[#FF056D]/30 px-2 py-0.5 rounded font-bold">
                    UTC +5:30
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#8E8A94] uppercase tracking-wider block">
                  BASE LOCATION & TIME ZONE
                </span>
                <span className="font-display font-bold text-base text-[#F4EFE6] block mt-0.5">
                  Pune, Maharashtra, India
                </span>
                <p className="text-xs text-[#8E8A94] font-sans mt-1">
                  IST (Asia/Kolkata). Flexible across Indian & European operational schedules.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[11px] text-[#8E8A94] flex items-center justify-between">
                <span className="text-[#F4EFE6]/70">Relocation / Remote</span>
                <span className="text-[#FF056D] font-bold">HIGH FLEXIBILITY</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Action Layout: Mail Dispatcher + Telemetry Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Recruiter Command Card (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-[#111216] border border-white/10 space-y-8 shadow-2xl">
              {/* Copy Email Box */}
              <div>
                <span className="font-mono text-xs text-[#8E8A94] uppercase tracking-wider block mb-3 font-bold">
                  // QUICK DISPATCH CLIPBOARD
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

          {/* Right Column: Secondary Portrait & Recruiter Telemetry (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Availability & Recruiter Profile Card (SECONDARY PORTRAIT LOCATION 2) */}
            <div className="p-6 rounded-2xl bg-[#111216] border border-white/10 hover:border-[#FF056D]/40 transition-all space-y-5 shadow-xl">
              {/* Secondary Passport Portrait Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                <div className="relative w-16 h-20 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-black/60 shadow-md">
                  <img
                    src="/images/saish-photo-passport.jpg"
                    alt="Saish Sanas - Professional Portrait"
                    className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-[#FF056D] animate-ping" />
                  <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-[#FF056D]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-[#FF056D] font-bold tracking-wider">
                    <span>// CANDIDATE TELEMETRY</span>
                  </div>
                  <h3 className="font-display font-extrabold text-lg text-[#F4EFE6] tracking-wide uppercase mt-0.5">
                    Saish Sanas
                  </h3>
                  <p className="font-mono text-xs text-[#8E8A94]">
                    Java Backend & Systems Developer
                  </p>
                  <span className="inline-block mt-1 font-mono text-[9px] text-[#FF056D] bg-[#FF056D]/10 border border-[#FF056D]/30 px-2 py-0.5 rounded font-bold uppercase">
                    AVAILABLE FOR HIRE
                  </span>
                </div>
              </div>

              {/* Based in */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#18191E] border border-white/10 flex items-center justify-center text-[#FF056D] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#8E8A94] uppercase tracking-wider block">
                    CURRENT LOCATION
                  </span>
                  <p className="font-display font-bold text-sm text-[#F4EFE6]">
                    Pune, Maharashtra, India
                  </p>
                  <span className="text-xs text-[#8E8A94] font-sans">
                    Open to hybrid / on-site relocation & distributed engineering teams.
                  </span>
                </div>
              </div>

              {/* Time Zone */}
              <div className="flex items-start gap-3 pt-3 border-t border-white/5">
                <div className="w-8 h-8 rounded-lg bg-[#18191E] border border-white/10 flex items-center justify-center text-[#FF056D] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#8E8A94] uppercase tracking-wider block">
                    LOCAL TIME ZONE
                  </span>
                  <p className="font-display font-bold text-sm text-[#F4EFE6]">
                    IST (UTC+5:30) • Asia/Kolkata
                  </p>
                  <span className="text-xs text-[#8E8A94] font-sans">
                    Synchronous overlap with key operational hours worldwide.
                  </span>
                </div>
              </div>

              {/* Work Availability */}
              <div className="flex items-start gap-3 pt-3 border-t border-white/5">
                <div className="w-8 h-8 rounded-lg bg-[#18191E] border border-white/10 flex items-center justify-center text-[#FF056D] shrink-0 mt-0.5">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#8E8A94] uppercase tracking-wider block">
                    WORK AVAILABILITY
                  </span>
                  <p className="font-display font-bold text-sm text-[#F4EFE6]">
                    Flexible across Indian & European Time Zones
                  </p>
                  <span className="text-xs text-[#8E8A94] font-sans">
                    Adaptable schedules for cross-timezone collaboration, including US overlaps as needed. Not restricted to specific regions.
                  </span>
                </div>
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
          </div>
        </div>
      </div>
    </section>
  )
}

