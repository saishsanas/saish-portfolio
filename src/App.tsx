import { useState } from 'react'
import { AudioProvider } from './hooks/useAudioFx'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { CustomCursor } from './components/CustomCursor'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Identity } from './components/Identity'
import { TechStack } from './components/TechStack'
import { FeaturedWork } from './components/FeaturedWork'
import { ArchitectureFlow } from './components/ArchitectureFlow'
import { Timeline } from './components/Timeline'
import { Credentials } from './components/Credentials'
import { ResearchPublications } from './components/ResearchPublications'
import { BuildPhilosophy } from './components/BuildPhilosophy'
import { Personality } from './components/Personality'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ResumeModal } from './components/ResumeModal'
import { ProjectModal } from './components/ProjectModal'
import { CertificateModal } from './components/CertificateModal'
import { Project, Credential } from './types'

function PortfolioContent() {
  useSmoothScroll()
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null)

  return (
    <div className="min-h-screen bg-[#090A0C] text-[#F4EFE6] relative selection:bg-[#FF056D] selection:text-[#F4EFE6]">
      {/* Magnetic spring custom cursor with Hot Pink identity */}
      <CustomCursor />

      {/* Primary Navigation */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* 01 — OPENING / HERO */}
      <Hero onOpenResume={() => setIsResumeOpen(true)} />

      {/* 02 — IDENTITY / INTRODUCTION */}
      <Identity />

      {/* 03 — ENGINEERING STACK */}
      <TechStack />

      {/* 04 — FEATURED WORK */}
      <FeaturedWork onSelectProject={(project) => setSelectedProject(project)} />

      {/* 05 — PROJECT DEEP DIVE / ARCHITECTURE */}
      <ArchitectureFlow />

      {/* 06 — JOURNEY / TIMELINE & EXPERIENCE */}
      <Timeline />

      {/* 07 — CREDENTIALS & ACCREDITATIONS */}
      <Credentials onSelectCredential={(cred) => setSelectedCredential(cred)} />

      {/* 08 — RESEARCH & PUBLICATIONS */}
      <ResearchPublications />

      {/* 09 — GITHUB & BUILD PHILOSOPHY */}
      <BuildPhilosophy />

      {/* 10 — PERSONALITY / BEYOND THE CODE */}
      <Personality />

      {/* 11 — CONTACT / FINAL EXPERIENCE */}
      <Contact onOpenResume={() => setIsResumeOpen(true)} />

      {/* Minimalist High-Craft Footer */}
      <Footer />

      {/* In-Site Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Project Case Study Deep Dive Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Certificate Artwork & Verification Lightbox Modal */}
      <CertificateModal credential={selectedCredential} onClose={() => setSelectedCredential(null)} />
    </div>
  )
}

export default function App() {
  return (
    <AudioProvider>
      <PortfolioContent />
    </AudioProvider>
  )
}
