import { motion } from 'framer-motion'
import { ShieldCheck, GraduationCap, CheckCircle, Cpu, ExternalLink, Eye } from 'lucide-react'
import { credentials } from '../data/credentials'
import { Credential } from '../types'
import { useAudioFx } from '../hooks/useAudioFx'

interface CredentialsProps {
  onSelectCredential?: (cred: Credential) => void
}

export function Credentials({ onSelectCredential }: CredentialsProps) {
  const { playClick, playHover } = useAudioFx()

  const getIcon = (type: string, id: string) => {
    if (id === 'tcs-ion-ai') return Cpu
    if (type === 'CERTIFICATION') return ShieldCheck
    return GraduationCap
  }

  return (
    <section id="credentials" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#07080A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#FF056D] tracking-widest uppercase font-bold">
                // 05 VERIFIED CREDENTIALS
              </span>
              <div className="h-[1px] w-12 bg-white/20" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#F4EFE6] tracking-tight uppercase">
              ACCREDITED <span className="text-[#FF056D]">CERTIFICATIONS</span> & DEGREE
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#8E8A94] font-sans">
            Formal accreditations validating public cloud infrastructure architecture, foundational AI competencies, and computer engineering rigor.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {credentials.map((cred, idx) => {
            const Icon = getIcon(cred.type, cred.id)

            return (
              <motion.div
                key={cred.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={playHover}
                className="group relative p-6 sm:p-8 rounded-2xl bg-[#101115] border border-white/10 hover:border-[#FF056D]/50 transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Top Bar with Icon & Status */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#17181D] border border-white/10 flex items-center justify-center text-[#FF056D] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="font-mono text-[10px] text-[#FF056D] bg-[#FF056D]/10 border border-[#FF056D]/30 px-2 py-0.5 rounded flex items-center gap-1 font-bold">
                      <CheckCircle className="w-3 h-3 text-[#FF056D]" />
                      VERIFIED
                    </span>
                  </div>

                  <span className="font-mono text-[10px] text-[#8E8A94] uppercase tracking-widest block mb-1">
                    {cred.issuer} • {cred.issuedDate}
                  </span>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#F4EFE6] tracking-tight uppercase group-hover:text-[#FF056D] transition-colors mb-3">
                    {cred.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#8E8A94] font-sans leading-relaxed mb-6">
                    {cred.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {cred.badges.map((b) => (
                      <span
                        key={b}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-[#F4EFE6] border border-white/5"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  {cred.credentialId && (
                    <div className="font-mono text-[10px] text-[#5E5B56]">
                      RECORD: <span className="text-[#8E8A94] font-semibold">{cred.credentialId}</span>
                    </div>
                  )}

                  {/* Certificate preview modal trigger if certificate image is present */}
                  {cred.certificateImage && (
                    <button
                      onClick={() => {
                        playClick()
                        onSelectCredential?.(cred)
                      }}
                      onMouseEnter={playHover}
                      data-cursor="CERTIFICATE"
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#FF056D]/10 hover:bg-[#FF056D] text-[#FF056D] hover:text-[#F4EFE6] border border-[#FF056D]/30 font-mono text-[11px] font-bold uppercase tracking-wider transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>VIEW CERTIFICATE ↗</span>
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
