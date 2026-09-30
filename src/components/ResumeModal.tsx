import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Printer, Copy, Check, ShieldCheck, BookOpen, GraduationCap, Mail, Phone, MapPin, Briefcase, Cpu } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './SocialIcons'
import { useAudioFx } from '../hooks/useAudioFx'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { playClick, playSuccess } = useAudioFx()
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handlePrint = () => {
    playClick()
    window.print()
  }

  const handleCopyText = () => {
    playSuccess()
    const resumeText = `SAISH SANAS
Java Backend Developer | Software Engineer
Phone: +91-9322546613 | Email: saishsanas@gmail.com | Location: Pune, Maharashtra, India
GitHub: https://github.com/saishsanas | LinkedIn: https://www.linkedin.com/in/saish-sanas-48932433/

PROFESSIONAL SUMMARY
Final-year Computer Engineering student proficient in Java 21, Spring Boot, PostgreSQL, and React.js with experience developing and deploying production-ready backend architectures, mobile services, and high-reliability event pipelines.

EDUCATION
Savitribai Phule Pune University (SPPU), Pune, India
Bachelor of Engineering in Computer Engineering (June 2022 – June 2026)

PROFESSIONAL INTERNSHIP EXPERIENCE
App Developer Intern — Codec Technologies Pvt. Ltd. (March 2025 – April 2025)
• Completed 1-month AICTE & ICAC approved internship focused on application development.
• Gained hands-on experience in building app features, debugging, and API integration.
• Improved understanding of real-world development workflows and testing practices.

ACCREDITATIONS & CERTIFICATIONS
• Oracle Cloud Infrastructure 2025 Certified Foundations Associate (1Z0-1085-25)
  Issued Oct 31, 2025 | Credential ID: 103057743OCI25FNDCFA
  Demonstrated foundational understanding of public-cloud principles, OCI core services (compute, storage, networking, identity & access), and cloud-architecture fundamentals.
• TCS iON Career Edge – AI Foundation
  Issued Aug 21, 2026 | Certificate ID: 279243-33346757-1016
  Comprehensive understanding of Artificial Intelligence foundations, machine learning concepts, and applied data models.

RESEARCH PUBLICATIONS
1. "Design and Development of a Mobile-Based Emergency Alert System for Public Safety Using GPS and Real-Time Tracking"
   International Research Journal of Modernization in Engineering Technology and Science (IRJMETS), Vol. 07, Issue 11, November 2025. DOI: 10.56726/IRJMETS85227
   Authors: Saish Sanas, Nakul Siricilla, Moin Mankar, Mohd. Shaban Ali, Prof. Vidya Rajput
2. "Design and Implementation of a Mobile-Based Emergency Alert System for Public Safety"
   International Journal of Enhanced Research in Science, Technology & Engineering (IJERSTE), Vol. 15, Issue 3, March 2026. ISSN: 2319-7463
   Co-authored with Prof. Vidya Rajput, Nakul Siricilla, Moin Mankar, Mohd. Shaban Ali

TECHNICAL SKILLS
• Languages: Java 21, JavaScript, TypeScript, SQL, HTML, CSS
• Frameworks & Backend: Spring Boot 3.x, Spring Data JPA/Hibernate, Spring Security, REST APIs, STOMP/WebSockets, Maven
• Mobile & Frontend: React Native / Expo, React 18, Vite, Tailwind CSS
• Databases & Messaging: PostgreSQL, MySQL, Redis/Valkey, Apache Kafka
• Tools & Platforms: Git & GitHub, Docker, IntelliJ IDEA, VS Code, Postman, Oracle Cloud Infrastructure (OCI)

FEATURED PROJECTS
1. Chronos — Distributed Temporal State Reconstruction Engine
   Repository: https://github.com/saishsanas/chronos
   Stack: Java 21, Spring Boot, PostgreSQL, Apache Kafka, Temporal Slices, Event Sourcing
   • Engineered deterministic temporal state engine reconstructing point-in-time entity models from immutable event logs.
   • Implemented bi-temporal indexing strategy in PostgreSQL and event replay pipelines processing 10,000+ events/sec.
   • Replaced destructive SQL UPDATE mutations with immutable append-only event streams and automated audit trails.

2. CareWave — Emergency Distress & Assistance Mobile Application (In Progress)
   Repository: https://github.com/saishsanas/CareWave
   Stack: React Native (Expo), Spring Boot 3.5.13, Java 21, MySQL, STOMP/WebSockets, Firebase Cloud Messaging (FCM), Kafka, Redis/Valkey
   • Engineered low-latency mobile distress dispatch backend delivering sub-500ms SOS broadcast delivery.
   • Implemented persistent WebSocket/STOMP bidirectional duplex channels with heartbeat failover.
   • Designed relational schema with spatial index structures for high-speed nearest-responder Euclidean queries.

3. SaishTask — Full-Stack Task & Workflow Management Platform (Completed)
   Repositories:
   - Combined Repo: https://github.com/saishsanas/saish-task-app
   - Backend Source: https://github.com/saishsanas/saish-task-backend
   - Frontend Source: https://github.com/saishsanas/saish-task-frontend
   Stack: Java 21, Spring Boot, Spring Data JPA, Hibernate, PostgreSQL, React, Vite, TypeScript
   • Built complete multi-tier enterprise task management architecture enforcing strict Controller-Service-Repository boundaries.
   • Engineered optimistic concurrency control (@Version) and global exception isolation via @ControllerAdvice.
   • Implemented normalized PostgreSQL schema ensuring zero-drift transactional integrity.

4. OutBox-Sync — Distributed Transactional Outbox Engine (Systems Architecture)
   Repository: https://github.com/saishsanas/OutBox-Sync-TeamProject
   Stack: Java 21, Spring Boot, MySQL, Transactional Outbox Pattern, Asynchronous Polling Daemon
   • Persisted domain mutations and outbox records in a single local ACID transaction, eliminating dual-write inconsistencies.
   • Implemented lockless asynchronous polling daemon using SELECT FOR UPDATE SKIP LOCKED to prevent duplicate pickups across replicas.`

    navigator.clipboard.writeText(resumeText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0D0E12] border border-white/20 shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#14151A] border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#FF056D] tracking-wider uppercase">
                // CURRICULUM VITAE PREVIEW
              </span>
              <span className="text-[#5E5B56]">|</span>
              <span className="font-mono text-xs text-[#F4EFE6]">SAISH_SANAS_RESUME.pdf</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-[#8E8A94] hover:text-[#F4EFE6] transition-all"
                title="Copy Resume as Text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#FF056D]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED' : 'COPY TEXT'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF056D] hover:bg-[#B8004C] text-xs font-mono font-bold text-[#F4EFE6] transition-all shadow-md shadow-[#FF056D]/20"
                title="Print or Save PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>PRINT / SAVE PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#8E8A94] hover:text-[#F4EFE6] transition-colors ml-2"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable & Scrollable Resume Content */}
          <div className="overflow-y-auto p-6 sm:p-10 font-sans text-[#F4EFE6] space-y-8 bg-[#090A0D]">
            {/* Header Info */}
            <div className="border-b border-white/10 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#F4EFE6] tracking-tight uppercase">
                  SAISH SANAS
                </h1>
                <span className="font-mono text-sm text-[#FF056D] font-bold">
                  JAVA BACKEND DEVELOPER
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-4 font-mono text-xs text-[#8E8A94]">
                <span className="flex items-center gap-1.5 text-[#F4EFE6]/90">
                  <Phone className="w-3.5 h-3.5 text-[#FF056D]" />
                  +91-9322546613
                </span>
                <span className="flex items-center gap-1.5 text-[#F4EFE6]/90">
                  <Mail className="w-3.5 h-3.5 text-[#FF056D]" />
                  saishsanas@gmail.com
                </span>
                <span className="flex items-center gap-1.5 text-[#F4EFE6]/90">
                  <MapPin className="w-3.5 h-3.5 text-[#FF056D]" />
                  Pune, Maharashtra, India
                </span>
                <a
                  href="https://github.com/saishsanas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#F4EFE6]/90 hover:text-[#FF056D] transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/saish-sanas-48932433/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#F4EFE6]/90 hover:text-[#FF056D] transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  LinkedIn ↗
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h2 className="font-mono text-xs text-[#FF056D] uppercase tracking-wider font-bold mb-2">
                // PROFESSIONAL SUMMARY
              </h2>
              <p className="text-sm text-[#F4EFE6]/80 leading-relaxed font-sans">
                Final-year Computer Engineering student proficient in Java 21, Spring Boot, PostgreSQL, and React.js with experience developing and deploying production-ready backend architectures, mobile services, and high-reliability event pipelines.
              </p>
            </div>

            {/* Experience */}
            <div>
              <h2 className="font-mono text-xs text-[#FF056D] uppercase tracking-wider font-bold mb-3">
                // PROFESSIONAL INTERNSHIP EXPERIENCE
              </h2>
              <div className="p-4 rounded-xl bg-[#121318] border border-white/5 space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <span className="font-semibold text-[#F4EFE6] text-sm">
                    App Developer Intern — Codec Technologies Pvt. Ltd.
                  </span>
                  <span className="font-mono text-xs text-[#FF056D] font-bold">Mar 2025 – Apr 2025</span>
                </div>
                <p className="text-xs text-[#8E8A94] leading-relaxed">
                  Completed a 1-month AICTE & ICAC approved internship program focused on application development. Gained hands-on experience in building app features, debugging, and API integration. Improved understanding of real-world development workflow and testing practices.
                </p>
              </div>
            </div>

            {/* Certifications & Publications */}
            <div>
              <h2 className="font-mono text-xs text-[#FF056D] uppercase tracking-wider font-bold mb-3">
                // ACHIEVEMENTS, CERTIFICATIONS & PUBLICATIONS
              </h2>
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#121318] border border-white/5 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#FF056D] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#F4EFE6] text-sm block">
                      Oracle Cloud Infrastructure 2025 Certified Foundations Associate (1Z0-1085-25)
                    </span>
                    <span className="text-xs text-[#8E8A94]">
                      Issued Oct 31, 2025 • Credential ID: 103057743OCI25FNDCFA • Public cloud architecture, compute, networking, and security primitives.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121318] border border-white/5 flex items-start gap-3">
                  <Cpu className="w-5 h-5 text-[#FF056D] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#F4EFE6] text-sm block">
                      TCS iON Career Edge – AI Foundation
                    </span>
                    <span className="text-xs text-[#8E8A94]">
                      Issued Aug 21, 2026 • Certificate ID: 279243-33346757-1016 • Artificial Intelligence foundations, machine learning concepts, and applied data models.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121318] border border-white/5 flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-[#FF056D] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#F4EFE6] text-sm block">
                      Published: &quot;Design and Development of a Mobile-Based Emergency Alert System for Public Safety Using GPS and Real-Time Tracking&quot;
                    </span>
                    <span className="text-xs text-[#8E8A94]">
                      IRJMETS, Vol. 07, Issue 11, November 2025 &bull; DOI: 10.56726/IRJMETS85227 &bull; Authors: Saish Sanas, Nakul Siricilla, Moin Mankar, Mohd. Shaban Ali, Prof. Vidya Rajput
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121318] border border-white/5 flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-[#FF056D] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#F4EFE6] text-sm block">
                      Published: &quot;Design and Implementation of a Mobile-Based Emergency Alert System for Public Safety&quot;
                    </span>
                    <span className="text-xs text-[#8E8A94]">
                      IJERSTE, Vol. 15, Issue 3, March 2026 &bull; ISSN: 2319-7463 &bull; Co-authored with Prof. Vidya Rajput, Nakul Siricilla, Moin Mankar, Mohd. Shaban Ali
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Skills Matrix */}
            <div>
              <h2 className="font-mono text-xs text-[#FF056D] uppercase tracking-wider font-bold mb-3">
                // TECHNICAL SKILLS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-[#121318] border border-white/5">
                  <span className="text-[#8E8A94] block mb-1">LANGUAGES:</span>
                  <span className="text-[#F4EFE6] font-medium">Java 21, JavaScript, TypeScript, SQL, HTML, CSS</span>
                </div>
                <div className="p-3 rounded-lg bg-[#121318] border border-white/5">
                  <span className="text-[#8E8A94] block mb-1">FRAMEWORKS & BACKEND:</span>
                  <span className="text-[#F4EFE6] font-medium">Spring Boot 3.x, Spring Data JPA, Hibernate, REST APIs, WebSockets, STOMP</span>
                </div>
                <div className="p-3 rounded-lg bg-[#121318] border border-white/5">
                  <span className="text-[#8E8A94] block mb-1">DATABASES & BROKERS:</span>
                  <span className="text-[#F4EFE6] font-medium">PostgreSQL, MySQL, Redis/Valkey, Apache Kafka</span>
                </div>
                <div className="p-3 rounded-lg bg-[#121318] border border-white/5">
                  <span className="text-[#8E8A94] block mb-1">MOBILE & PLATFORMS:</span>
                  <span className="text-[#F4EFE6] font-medium">React Native (Expo), Docker, Oracle Cloud Infrastructure (OCI), Git, Maven</span>
                </div>
              </div>
            </div>

            {/* Featured Projects */}
            <div>
              <h2 className="font-mono text-xs text-[#FF056D] uppercase tracking-wider font-bold mb-4">
                // PROJECTS
              </h2>

              <div className="space-y-6">
                {/* Project 1: Chronos */}
                <div className="border-l-2 border-[#FF056D] pl-4 space-y-1.5">
                  <div className="flex flex-wrap items-baseline justify-between">
                    <span className="font-display font-bold text-base text-[#F4EFE6] uppercase">
                      Chronos — Distributed Temporal State Reconstruction Engine [Active]
                    </span>
                    <span className="font-mono text-xs text-[#8E8A94]">Java 21 &bull; Spring Boot &bull; PostgreSQL &bull; Kafka &bull; Event Sourcing</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-[#8E8A94] space-y-1 leading-relaxed">
                    <li>Engineered deterministic temporal state engine reconstructing historical models from immutable append-only event logs.</li>
                    <li>Designed PostgreSQL bi-temporal partition schema and high-throughput event replay pipeline capable of &gt;10,000 events/sec.</li>
                    <li>Guaranteed zero state mutation by replacing destructive SQL updates with immutable event sequencing and cryptographic audit chains.</li>
                  </ul>
                </div>

                {/* Project 2: CareWave */}
                <div className="border-l-2 border-[#FF056D] pl-4 space-y-1.5">
                  <div className="flex flex-wrap items-baseline justify-between">
                    <span className="font-display font-bold text-base text-[#F4EFE6] uppercase">
                      CareWave — Emergency Alert & Assistance Mobile Application [In Progress]
                    </span>
                    <span className="font-mono text-xs text-[#8E8A94]">React Native &bull; Spring Boot 3.5.13 &bull; MySQL &bull; STOMP &bull; FCM &bull; Kafka &bull; Redis</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-[#8E8A94] space-y-1 leading-relaxed">
                    <li>Backend developer for CareWave, a cross-platform mobile distress app facilitating ultra-fast emergency medical routing.</li>
                    <li>Engineered Spring Boot RESTful APIs and duplex STOMP WebSocket communication for real-time location broadcasts under 500ms.</li>
                    <li>Designed MySQL relational schema with geospatial coordinates for calculating nearest emergency units and responders.</li>
                  </ul>
                </div>

                {/* Project 3: SaishTask */}
                <div className="border-l-2 border-[#FF056D] pl-4 space-y-1.5">
                  <div className="flex flex-wrap items-baseline justify-between">
                    <span className="font-display font-bold text-base text-[#F4EFE6] uppercase">
                      SaishTask — Full-Stack Task & Workflow Management Platform [Completed]
                    </span>
                    <span className="font-mono text-xs text-[#8E8A94]">Java 21 &bull; Spring Boot &bull; PostgreSQL &bull; React &bull; Vite &bull; TypeScript</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-[#8E8A94] space-y-1 leading-relaxed">
                    <li>Engineered an enterprise-grade full-stack task application adhering to strict Controller-Service-Repository architecture.</li>
                    <li>Implemented optimistic concurrency locking (@Version), global exception handling (@ControllerAdvice), and normalized PostgreSQL schemas.</li>
                    <li>Designed clean REST contracts validated via Postman and integrated with a high-speed Vite + React frontend.</li>
                  </ul>
                </div>

                {/* Project 4: OutBox-Sync */}
                <div className="border-l-2 border-[#FF056D] pl-4 space-y-1.5">
                  <div className="flex flex-wrap items-baseline justify-between">
                    <span className="font-display font-bold text-base text-[#F4EFE6] uppercase">
                      OutBox-Sync — Distributed Transactional Outbox Engine [Systems Architecture]
                    </span>
                    <span className="font-mono text-xs text-[#8E8A94]">Java 21 &bull; Spring Boot &bull; MySQL &bull; Event-Driven &bull; SKIP LOCKED</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-[#8E8A94] space-y-1 leading-relaxed">
                    <li>Eliminated dual-write failure modes by committing database state mutations and outbox records in a unified ACID transaction.</li>
                    <li>Engineered high-throughput background polling daemon utilizing SELECT FOR UPDATE SKIP LOCKED to prevent duplicate pickups across replicas.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="border-t border-white/10 pt-6">
              <h2 className="font-mono text-xs text-[#FF056D] uppercase tracking-wider font-bold mb-2">
                // EDUCATION
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="font-semibold text-[#F4EFE6] text-sm block">
                    Savitribai Phule Pune University (SPPU), Pune, India
                  </span>
                  <span className="text-xs text-[#8E8A94]">
                    Bachelor of Engineering in Computer Engineering
                  </span>
                </div>
                <span className="font-mono text-xs text-[#FF056D] font-bold">June 2022 – June 2026</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
