import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, CheckCircle2, Terminal } from 'lucide-react'
import { useAudioFx } from '../hooks/useAudioFx'

export function ArchitectureFlow() {
  const { playClick, playHover, playSelect } = useAudioFx()
  const [activeMode, setActiveMode] = useState<'request' | 'outbox'>('outbox')
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const requestPipelineSteps = [
    {
      id: 'step-1',
      title: '01. HTTP CLIENT REQUEST',
      role: 'Client Gateway Entrypoint',
      tag: 'TRANSPORT',
      annotation: 'POST /api/v1/emergency/dispatch',
      description:
        'Incoming client HTTP request with JSON payload and Bearer JWT in the Authorization header. Processed over HTTPS to enforce TLS termination.',
      snippet: `POST /api/v1/emergency/dispatch HTTP/1.1\nHost: api.carewave.io\nAuthorization: Bearer eyJhbGciOi...\nContent-Type: application/json\n\n{\n  "incidentId": "INC-8941",\n  "severity": "CRITICAL",\n  "coordinates": [18.5204, 73.8567]\n}`,
      protection: 'Strict TLS enforcement & payload size limits',
    },
    {
      id: 'step-2',
      title: '02. SECURITY FILTER CHAIN',
      role: 'Stateless Authentication & RBAC',
      tag: 'SECURITY',
      annotation: 'OncePerRequestFilter & JwtAuthFilter',
      description:
        'Intercepts the request before hitting controllers. Validates cryptographic signature of JWT token, checks expiration, and populates SecurityContextHolder with user roles.',
      snippet: `@Component\npublic class JwtAuthFilter extends OncePerRequestFilter {\n  @Override\n  protected void doFilterInternal(HttpServletRequest req,\n                                  HttpServletResponse res,\n                                  FilterChain chain) {\n    String token = extractJwt(req);\n    if (jwtService.isValid(token)) {\n      var auth = jwtService.getAuthentication(token);\n      SecurityContextHolder.getContext().setAuthentication(auth);\n    }\n    chain.doFilter(req, res);\n  }\n}`,
      protection: 'Zero-session overhead; immediate 401/403 for untrusted requests',
    },
    {
      id: 'step-3',
      title: '03. CONTROLLER & VALIDATION',
      role: 'DispatcherServlet & DTO Contract',
      tag: 'WEB LAYER',
      annotation: '@RestController & @Valid',
      description:
        'Spring DispatcherServlet maps URI to controller method. Hibernate Validator validates DTO field constraints before any business execution.',
      snippet: `@RestController\n@RequestMapping("/api/v1/emergency")\npublic class EmergencyController {\n  @PostMapping("/dispatch")\n  public ResponseEntity<DispatchResponse> dispatch(\n      @Valid @RequestBody DispatchRequestDTO dto) {\n    var result = dispatchService.createDispatch(dto);\n    return ResponseEntity.status(HttpStatus.CREATED).body(result);\n  }\n}`,
      protection: 'Invalid formats fail fast with RFC-7807 problem details',
    },
    {
      id: 'step-4',
      title: '04. TRANSACTION BOUNDARY (SERVICE)',
      role: 'Business Invariants & ACID Boundary',
      tag: 'SERVICE LAYER',
      annotation: '@Transactional(isolation = READ_COMMITTED)',
      description:
        'Spring declarative transaction manager begins local database transaction. Coordinates business logic, calculates nearest available unit, and binds session to thread.',
      snippet: `@Service\n@Transactional(readOnly = true)\npublic class DispatchServiceImpl implements DispatchService {\n  @Transactional(isolation = Isolation.READ_COMMITTED)\n  public DispatchResponse createDispatch(DispatchRequestDTO dto) {\n    Responder responder = findNearestAvailable(dto.getCoordinates());\n    responder.assignToIncident(dto.getIncidentId());\n    return mapper.toResponse(responderRepo.save(responder));\n  }\n}`,
      protection: 'Automatic rollback on RuntimeException to prevent dirty state',
    },
    {
      id: 'step-5',
      title: '05. PERSISTENCE & ORM',
      role: 'Spring Data JPA & Hibernate Session',
      tag: 'ORM MAPPING',
      annotation: '@Version & EntityGraph',
      description:
        'Hibernate translates domain mutations into optimized SQL statements. Leverages optimistic locking (@Version) to prevent lost updates during concurrent assignments.',
      snippet: `@Entity\n@Table(name = "responders")\npublic class Responder {\n  @Id @GeneratedValue\n  private UUID id;\n  \n  @Enumerated(EnumType.STRING)\n  private ResponderStatus status;\n  \n  @Version\n  private Long version; // Optimistic concurrency lock\n}`,
      protection: 'OptimisticLockException protects against concurrent overwrites',
    },
    {
      id: 'step-6',
      title: '06. DATABASE ENGINE & POOL',
      role: 'PostgreSQL & HikariCP Pool',
      tag: 'STORAGE',
      annotation: 'HikariDataSource & ACID Commit',
      description:
        'HikariCP leases physical connection. PostgreSQL executes atomic insert/update and commits to WAL (Write-Ahead Logging).',
      snippet: `# PostgreSQL Engine Execution\nBEGIN;\nUPDATE responders SET status = 'DISPATCHED', version = version + 1 \nWHERE id = '9a7e...' AND version = 3;\nINSERT INTO dispatch_audit (id, incident_id, timestamp) VALUES (...);\nCOMMIT;`,
      protection: 'Zero connection leak; maximum throughput with 10-20ms lease',
    },
  ]

  const outboxPipelineSteps = [
    {
      id: 'outbox-1',
      title: '01. INCOMING COMMAND',
      role: 'State Change Trigger',
      tag: 'COMMAND',
      annotation: 'POST /api/v1/emergency/alert or Order',
      description:
        'A critical business action requires both updating local state and alerting downstream subscribers (e.g. notifications, logging, external tracking).',
      snippet: `@PostMapping("/alerts")\npublic ResponseEntity<AlertCreatedDTO> createAlert(\n    @Valid @RequestBody CreateAlertCommand cmd) {\n  Alert alert = alertService.processAlert(cmd);\n  return ResponseEntity.status(HttpStatus.CREATED)\n                       .body(mapper.toDto(alert));\n}`,
      protection: 'Explicit command object with immutable payload',
    },
    {
      id: 'outbox-2',
      title: '02. ATOMIC DUAL-INSERT',
      role: 'Single ACID Transaction',
      tag: 'ATOMICITY',
      annotation: '@Transactional: Business Entity + Outbox Record',
      description:
        'Crucial step: The business entity mutation and an outbox event entry are inserted inside the EXACT SAME relational database transaction.',
      snippet: `@Transactional\npublic Alert processAlert(CreateAlertCommand cmd) {\n  Alert alert = alertRepository.save(new Alert(cmd));\n  \n  OutboxEvent event = OutboxEvent.builder()\n      .aggregateType("EMERGENCY_ALERT")\n      .aggregateId(alert.getId())\n      .eventType("ALERT_TRIGGERED")\n      .payload(objectMapper.writeValueAsString(alert))\n      .status(OutboxStatus.PENDING)\n      .createdAt(Instant.now())\n      .build();\n  \n  outboxRepository.save(event);\n  return alert;\n  // COMMIT: Both persist or both fail together\n}`,
      protection: 'Completely eliminates dual-write failures (DB commit succeeds, Broker fails)',
    },
    {
      id: 'outbox-3',
      title: '03. ASYNC OUTBOX WORKER',
      role: 'Non-Blocking Lockless Poller',
      tag: 'BACKGROUND DAEMON',
      annotation: 'SELECT FOR UPDATE SKIP LOCKED',
      description:
        'A dedicated background worker periodically polls un-published outbox records. Using PostgreSQL SKIP LOCKED prevents contention across multiple app replicas.',
      snippet: `@Scheduled(fixedDelayString = "250")\n@Transactional\npublic void publishOutboxEvents() {\n  // Fetches next batch without blocking peer worker nodes\n  List<OutboxEvent> events = outboxRepository\n      .findPendingEventsForUpdate(PageRequest.of(0, 50));\n  \n  for (OutboxEvent event : events) {\n    messagePublisher.publish(event.getTopic(), event.getPayload())\n                    .whenComplete((result, ex) -> {\n                      if (ex == null) markProcessed(event.getId());\n                      else scheduleRetry(event.getId());\n                    });\n  }\n}`,
      protection: 'No distributed 2PC deadlock; zero thread blocking',
    },
    {
      id: 'outbox-4',
      title: '04. BROKER STREAMING',
      role: 'Message Broker Publication',
      tag: 'EVENT STREAM',
      annotation: 'Message Streaming with At-Least-Once Semantics',
      description:
        'Event payload is published to message broker topic. Worker only marks outbox record as PROCESSED after receiving broker confirmation ACK.',
      snippet: `// Broker Publishing Confirmation\nRecordMetadata metadata = messagePublisher.send(topic, payload).get();\nlogger.info("Published to partition {}, offset {}",\n            metadata.partition(), metadata.offset());\noutboxRepository.updateStatus(event.getId(), OutboxStatus.PUBLISHED);`,
      protection: 'Guaranteed at-least-once message delivery without loss',
    },
    {
      id: 'outbox-5',
      title: '05. IDEMPOTENT CONSUMER',
      role: 'Downstream Consumer Safety',
      tag: 'CONSUMER',
      annotation: 'Idempotency Key & Deduplication Table',
      description:
        'Consumers receive the event and check their processed_message table before executing side-effects. Protects against duplicate processing.',
      snippet: `@KafkaListener(topics = "alert-events", groupId = "notifications")\npublic void handleAlertEvent(ConsumerRecord<String, String> record) {\n  String eventId = record.key();\n  if (processedEventRepo.existsById(eventId)) {\n    logger.warn("Duplicate event {} skipped", eventId);\n    return;\n  }\n  notificationService.sendNotification(record.value());\n  processedEventRepo.save(new ProcessedEvent(eventId));\n}`,
      protection: 'Guarantees strictly once business side-effects',
    },
  ]

  const activeSteps = activeMode === 'request' ? requestPipelineSteps : outboxPipelineSteps
  const currentStep = activeSteps[activeStepIndex] || activeSteps[0]

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStepIndex((prev) => (prev + 1) % activeSteps.length)
      }, 3500)
    }
    return () => clearInterval(interval)
  }, [isPlaying, activeSteps.length])

  const handleModeChange = (mode: 'request' | 'outbox') => {
    playClick()
    setActiveMode(mode)
    setActiveStepIndex(0)
    setIsPlaying(false)
  }

  return (
    <section id="architecture" className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#07080A] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#FF056D] tracking-widest uppercase font-bold">
                // 05 ARCHITECTURAL DEEP DIVE
              </span>
              <div className="h-[1px] w-12 bg-white/20" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#F4EFE6] tracking-tight uppercase">
              INTERACTIVE <span className="text-[#FF056D]">PIPELINE</span> SIMULATOR
            </h2>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#141519] border border-white/10">
            <button
              onClick={() => handleModeChange('outbox')}
              onMouseEnter={playHover}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                activeMode === 'outbox'
                  ? 'bg-[#FF056D] text-[#F4EFE6] font-bold shadow-md shadow-[#FF056D]/20'
                  : 'text-[#8E8A94] hover:text-[#F4EFE6]'
              }`}
            >
              TRANSACTIONAL OUTBOX (SYSTEMS)
            </button>

            <button
              onClick={() => handleModeChange('request')}
              onMouseEnter={playHover}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                activeMode === 'request'
                  ? 'bg-[#FF056D] text-[#F4EFE6] font-bold shadow-md shadow-[#FF056D]/20'
                  : 'text-[#8E8A94] hover:text-[#F4EFE6]'
              }`}
            >
              SPRING BOOT REQUEST PIPELINE
            </button>
          </div>
        </div>

        {/* Playback Controls & Progress Bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playClick()
                setIsPlaying(!isPlaying)
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141519] hover:bg-[#1D1E24] border border-white/10 text-xs font-mono text-[#F4EFE6] transition-all"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#FF056D]" /> : <Play className="w-3.5 h-3.5 text-[#FF056D]" />}
              <span>{isPlaying ? 'PAUSE PACKET' : 'SIMULATE FLOW'}</span>
            </button>

            <button
              onClick={() => {
                playClick()
                setActiveStepIndex(0)
                setIsPlaying(false)
              }}
              className="p-1.5 rounded-lg bg-[#141519] hover:bg-[#1D1E24] border border-white/10 text-[#8E8A94] hover:text-[#F4EFE6] transition-all"
              title="Reset Simulation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="font-mono text-xs text-[#8E8A94]">
            STEP <span className="text-[#FF056D] font-bold">{activeStepIndex + 1}</span> OF {activeSteps.length}
          </div>
        </div>

        {/* Visual Pipeline Steps Track */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 mb-10">
          {activeSteps.map((step, idx) => {
            const isActive = idx === activeStepIndex
            const isPassed = idx < activeStepIndex

            return (
              <button
                key={step.id}
                onClick={() => {
                  playSelect()
                  setActiveStepIndex(idx)
                  setIsPlaying(false)
                }}
                onMouseEnter={playHover}
                data-cursor="SELECT"
                className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                  isActive
                    ? 'bg-[#18191E] border-[#FF056D] ring-1 ring-[#FF056D]/50 shadow-lg shadow-[#FF056D]/15'
                    : isPassed
                    ? 'bg-[#111215] border-[#FF056D]/30 text-[#F4EFE6]'
                    : 'bg-[#0B0C0E] border-white/10 text-[#8E8A94] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] font-bold text-[#FF056D]">
                    0{idx + 1}
                  </span>
                  {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-[#FF056D]" />}
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#FF056D] animate-ping" />}
                </div>

                <div className="font-display font-bold text-xs uppercase truncate text-[#F4EFE6]">
                  {step.title.split('. ')[1]}
                </div>
                <div className="font-mono text-[10px] text-[#8E8A94] truncate mt-0.5">
                  {step.tag}
                </div>
              </button>
            )
          })}
        </div>

        {/* Stage Inspector: Visual Architecture Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#111215] border border-white/10 space-y-5">
              <div>
                <span className="font-mono text-xs text-[#FF056D] font-bold uppercase tracking-wider block mb-1">
                  // {currentStep.tag} LAYER
                </span>
                <h3 className="font-display font-extrabold text-2xl text-[#F4EFE6] tracking-tight uppercase">
                  {currentStep.title}
                </h3>
                <p className="font-mono text-xs text-[#8E8A94] mt-1">
                  {currentStep.role}
                </p>
              </div>

              <p className="font-sans text-sm text-[#F4EFE6]/80 leading-relaxed">
                {currentStep.description}
              </p>

              <div className="p-3.5 rounded-xl bg-[#16171C] border border-white/5 space-y-1">
                <span className="font-mono text-[10px] text-[#8E8A94] uppercase tracking-wider block">
                  DEFENSIVE ARCHITECTURE GUARANTEE:
                </span>
                <span className="font-mono text-xs text-[#FF056D] font-semibold block">
                  ✓ {currentStep.protection}
                </span>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => {
                    playClick()
                    setActiveStepIndex((prev) => Math.max(0, prev - 1))
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 disabled:opacity-30 text-xs font-mono text-[#F4EFE6] hover:text-white"
                >
                  PREVIOUS
                </button>

                <button
                  disabled={activeStepIndex === activeSteps.length - 1}
                  onClick={() => {
                    playClick()
                    setActiveStepIndex((prev) => Math.min(activeSteps.length - 1, prev + 1))
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#FF056D] hover:bg-[#B8004C] disabled:opacity-30 text-xs font-mono font-bold text-[#F4EFE6] shadow-md shadow-[#FF056D]/20"
                >
                  NEXT STAGE
                </button>
              </div>
            </div>
          </div>

          {/* Right Code & Mechanistic Snippet (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#090A0C] border border-white/15 overflow-hidden shadow-2xl">
              {/* Code window chrome */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-[#141519] border-b border-white/10 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#FF056D]" />
                  <span className="text-[#F4EFE6] font-medium">{currentStep.annotation}</span>
                </div>
                <span className="text-[#8E8A94] text-[10px]">JAVA / SPRING SOURCE</span>
              </div>

              {/* Code content */}
              <div className="p-6 font-mono text-xs sm:text-sm text-[#F4EFE6] overflow-x-auto leading-relaxed bg-[#0A0B0E]">
                <pre className="text-[#F4EFE6]/90 whitespace-pre">
                  <code>{currentStep.snippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
