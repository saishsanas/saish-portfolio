import { useState } from 'react'
import { motion } from 'framer-motion'
import { Terminal, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import { useAudioFx } from '../hooks/useAudioFx'

export function BuildPhilosophy() {
  const { playClick, playHover } = useAudioFx()
  const [activeTab, setActiveTab] = useState<'log' | 'test'>('log')

  const gitLogs = [
    { hash: 'e92f1b4', branch: 'main', msg: 'feat(outbox): implement PostgreSQL SKIP LOCKED polling worker', tag: 'STABLE' },
    { hash: 'c84a0d9', branch: 'main', msg: 'test(concurrency): add multi-threaded optimistic lock collision tests', tag: 'PASS' },
    { hash: '7f12e88', branch: 'feature/ws', msg: 'feat(carewave): add STOMP heartbeat and reconnect protocol', tag: 'FEATURE' },
    { hash: '3d91b40', branch: 'main', msg: 'security(jwt): add token revocation filter to OncePerRequestFilter chain', tag: 'SECURITY' },
    { hash: '1b89ef2', branch: 'main', msg: 'perf(db): add B-Tree index on incident status and spatial coords', tag: 'PERF' },
  ]

  const testOutputs = [
    { name: 'CareWaveWebSocketAuthTest.shouldRejectExpiredBearerToken()', time: '142ms', status: 'PASSED' },
    { name: 'OutboxEventPublisherTest.shouldMaintainAtomicCommitOnFailure()', time: '310ms', status: 'PASSED' },
    { name: 'TaskServiceConcurrencyTest.shouldThrowOptimisticLockException()', time: '208ms', status: 'PASSED' },
    { name: 'HikariConnectionPoolTest.shouldReleaseLeaseWithinTimeout()', time: '95ms', status: 'PASSED' },
    { name: 'SpatialProximityQueryTest.shouldOrderRespondersByDistance()', time: '185ms', status: 'PASSED' },
  ]

  return (
    <section id="philosophy" className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#090A0C] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12 sm:mb-16">
          <span className="font-mono text-xs text-[#FF056D] tracking-widest uppercase font-bold">
            // 07 BUILD PHILOSOPHY & WORKFLOW
          </span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        {/* The 4 Tenets */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { word: 'I BUILD.', sub: 'Clean architecture from first principles', num: '01' },
            { word: 'I TEST.', sub: 'Deterministic behavior under stress', num: '02' },
            { word: 'I IMPROVE.', sub: 'Profiling queries & memory allocations', num: '03' },
            { word: 'I SHIP.', sub: 'Dockerized and ready for production', num: '04' },
          ].map((item, idx) => (
            <motion.div
              key={item.word}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={playHover}
              className="p-6 sm:p-7 rounded-2xl bg-[#111216] border border-white/10 hover:border-[#FF056D]/60 transition-all group"
            >
              <span className="font-mono text-xs text-[#FF056D] font-bold block mb-3">
                {item.num} // TENET
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#F4EFE6] tracking-tight uppercase group-hover:text-[#FF056D] transition-colors">
                {item.word}
              </h3>
              <p className="font-mono text-xs text-[#8E8A94] mt-2">
                {item.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* GitHub Terminal Activity Visualizer */}
        <div className="rounded-3xl bg-[#0B0C0E] border border-white/15 overflow-hidden shadow-2xl">
          {/* Terminal Title Bar */}
          <div className="px-6 py-4 bg-[#141519] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF056D]/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-xs text-[#8E8A94]">
                saishsanas // telemetry-session
              </span>
            </div>

            {/* Terminal Tab Switchers */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playClick()
                  setActiveTab('log')
                }}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeTab === 'log'
                    ? 'bg-white/10 text-[#FF056D] font-semibold'
                    : 'text-[#8E8A94] hover:text-[#F4EFE6]'
                }`}
              >
                git log --graph
              </button>
              <button
                onClick={() => {
                  playClick()
                  setActiveTab('test')
                }}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeTab === 'test'
                    ? 'bg-white/10 text-[#FF056D] font-semibold'
                    : 'text-[#8E8A94] hover:text-[#F4EFE6]'
                }`}
              >
                mvn test (suite)
              </button>
            </div>
          </div>

          {/* Terminal Content Body */}
          <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm">
            {activeTab === 'log' ? (
              <div className="space-y-4">
                <div className="text-[#8E8A94] text-xs pb-2 border-b border-white/5">
                  $ git log --oneline --decorate -n 5
                </div>
                {gitLogs.map((log) => (
                  <div key={log.hash} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[#FF056D] font-bold">*{log.hash}</span>
                      <span className="text-[#8E8A94] text-xs">({log.branch})</span>
                      <span className="text-[#F4EFE6]">{log.msg}</span>
                    </div>
                    <span className="text-[10px] text-[#FF056D] bg-[#FF056D]/10 px-2 py-0.5 rounded border border-[#FF056D]/20 shrink-0 self-start sm:self-center font-bold">
                      {log.tag}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-[#8E8A94] text-xs pb-2 border-b border-white/5 flex items-center justify-between">
                  <span>$ mvn test -Dtest=*BackendTestSuite</span>
                  <span className="text-[#FF056D] font-bold">BUILD SUCCESS (5/5 PASS)</span>
                </div>
                {testOutputs.map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4 py-1 text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF056D] shrink-0" />
                      <span className="text-[#F4EFE6]/90 truncate">{t.name}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[#8E8A94] font-mono">{t.time}</span>
                      <span className="text-[#FF056D] font-bold">{t.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Call to Action */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-[#8E8A94] font-sans">
                Explore full repositories, commit history, and technical writeups on GitHub.
              </span>

              <a
                href="https://github.com/saishsanas"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                data-cursor="GITHUB"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF056D] hover:bg-[#B8004C] text-[#F4EFE6] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#FF056D]/20 shrink-0"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GITHUB PROFILE ↗</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
