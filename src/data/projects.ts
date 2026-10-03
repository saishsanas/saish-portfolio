import { Project } from '../types'
import { getPublicUrl } from '../utils/getPublicUrl'

export const projects: Project[] = [
  {
    id: 'carewave',
    number: '01',
    title: 'CAREWAVE',
    tagline: 'Mobile-Based Emergency Response & Distributed Backend Dispatch',
    status: 'In Progress',
    category: 'Mobile Application & Cloud Backend',
    year: '2024 – 2025',
    isMobileApp: true,
    whatItIs:
      'A cross-platform mobile emergency response application designed for rapid distress communication, real-time GPS tracking, GeoFence boundary monitoring, guardian connectivity, and AI-powered crisis guidance.',
    whatSaishBuilt:
      'Served as Team Leader and Backend Developer. Built robust Spring Boot 3.x microservices, engineered the GeoFencing module and emergency alert dispatch pipelines, integrated Firebase FCM push notifications, STOMP/WebSocket live location streaming, and secure JWT authentication with MySQL storage.',
    description:
      'Mobile-based emergency response platform featuring one-tap SOS activation, real-time geolocation streaming, GeoFence monitoring, and AI-driven crisis assistance.',
    longDescription:
      'CareWave addresses critical delays in life-threatening situations where users struggle to notify family quickly or broadcast precise coordinates. Engineered with Java 21 and Spring Boot on the server side and React Native / Expo on mobile, CareWave integrates one-tap SOS triggers, continuous GPS coordinate streaming over STOMP/WebSockets, automated GeoFence breach alerts, Firebase Cloud Messaging (FCM) pushes, and Gemini AI for real-time first-aid guidance.',
    tags: ['Java 21', 'Spring Boot 3.x', 'React Native / Expo', 'MySQL', 'STOMP / WebSockets', 'Redis / Valkey', 'Apache Kafka', 'Firebase FCM', 'JWT Security'],
    architecture: [
      { layer: 'Mobile Presentation', detail: 'React Native & Expo cross-platform mobile interface with OpenStreetMap geolocation' },
      { layer: 'Real-Time Transport', detail: 'STOMP over WebSockets for bi-directional live GPS coordinate streaming & location updates' },
      { layer: 'Security Boundary', detail: 'Stateless Spring Security filter chain with JWT tokens and email OTP verification' },
      { layer: 'Event & Notification', detail: 'Firebase Cloud Messaging (FCM) for low-latency emergency push notifications' },
      { layer: 'Domain Services', detail: 'GeoFencing boundary calculator, priority SOS dispatch queues, and Gemini AI assistant' },
      { layer: 'Persistence Layer', detail: 'MySQL relational database with Spring Data JPA & Hibernate entity mappings' },
    ],
    engineeringDecisions: [
      'Engineered bi-directional location broadcasting using STOMP protocol over WebSockets for continuous live coordinate streams',
      'Implemented server-side GeoFencing boundary calculation to automatically alert guardians on boundary breaches',
      'Configured Firebase Cloud Messaging (FCM) and asynchronous event dispatch to deliver urgent notifications with zero delay',
      'Integrated Gemini AI API to provide users with instantaneous, structured emergency assistance and guidance'
    ],
    githubUrl: 'https://github.com/saishsanas/CareWave',
    accentColor: '#FF056D',
    flowDiagramType: 'carewave',
    screenshots: [
      { title: 'Home Dashboard', src: getPublicUrl('carewave/HomeScreen.jpg') },
      { title: 'One-Tap SOS', src: getPublicUrl('carewave/Sos.jpg') },
      { title: 'Live Location Streaming', src: getPublicUrl('carewave/livelocationscreen.jpg') },
      { title: 'GeoFence Monitoring', src: getPublicUrl('carewave/geofencing.jpg') },
      { title: 'AI Emergency Chatbot', src: getPublicUrl('carewave/aichatbot.jpg') },
      { title: 'Nearby Hospitals', src: getPublicUrl('carewave/NearbyHospitalScreen.jpg') },
    ]
  },
  {
    id: 'chronos',
    number: '02',
    title: 'CHRONOS',
    tagline: 'Time-Traveling State Reconstruction Engine & Event Stream Replay',
    status: 'Systems Architecture',
    category: 'Distributed Systems & Event Sourcing',
    year: '2025',
    isMobileApp: false,
    whatItIs:
      'A temporal state reconstruction engine designed to preserve application history as immutable domain events, enabling point-in-time state reconstruction, event stream inspection, and deterministic historical replay.',
    whatSaishBuilt:
      'Designed and implemented the core event-sourcing runtime with immutable versioned domain events, snapshot-assisted replay mechanisms, optimistic concurrency control, and an interactive state inspection dashboard for tracking aggregate histories.',
    description:
      'Time-traveling state reconstruction engine built on event sourcing principles, temporal queries, snapshot-assisted replay, and immutable audit logs.',
    longDescription:
      'Conventional systems retain only the latest state or fragmented secondary logs, making historical debugging and auditability brittle. Chronos treats immutable domain events as the absolute source of truth. Every valid aggregate transition generates a cryptographically ordered event. Given any point in recorded timeline, Chronos reconstructs the exact state deterministically via forward replay and snapshot interpolation.',
    tags: ['Java 21', 'Spring Boot', 'Event Sourcing', 'Temporal Replay', 'CQRS', 'PostgreSQL', 'Immutability', 'State Inspection'],
    architecture: [
      { layer: 'Event Store Core', detail: 'Append-only immutable event log with strict monotonic sequence numbering and partition keys' },
      { layer: 'Temporal Replay Engine', detail: 'Point-in-time state reconstructor combining periodic snapshots with delta event streams' },
      { layer: 'Concurrency Boundary', detail: 'Optimistic locking enforcing expected version invariants to prevent split-brain aggregate mutations' },
      { layer: 'Inspection Dashboard', detail: 'Real-time timeline visualizer, event payload inspector, and historical state comparator' },
      { layer: 'Persistence Layer', detail: 'Relational event schema optimized with composite indexes on aggregate_id and version' },
    ],
    engineeringDecisions: [
      'Treated immutable domain events as the single source of truth rather than mutating row states directly',
      'Engineered snapshot-assisted replay to reconstruct aggregate states in sub-linear time without full history scans',
      'Enforced strict optimistic concurrency checks preventing concurrent conflicting transitions on identical aggregates',
      'Developed temporal comparison view to inspect state deltas across historical discrete timestamps'
    ],
    githubUrl: 'https://github.com/saishsanas/chronos',
    accentColor: '#FF056D',
    flowDiagramType: 'outbox',
    screenshots: [
      { title: 'Chronos Live Dashboard & Metrics', src: getPublicUrl('chronos/chronos-dashboard.png') },
      { title: 'Temporal Replay & State Inspection', src: getPublicUrl('chronos/chronos-temporal-replay.png') },
    ]
  },
  {
    id: 'outbox-sync',
    number: '03',
    title: 'OUTBOX-SYNC',
    tagline: 'Reliable Event-Driven Distributed Outbox Architecture',
    status: 'Systems Architecture',
    category: 'Backend / Distributed Systems',
    year: '2025',
    isMobileApp: false,
    featuredVisualType: 'outbox-flow',
    whatItIs:
      'A dedicated backend systems architecture implementing the Transactional Outbox Pattern to guarantee reliable event processing, automated retry mechanisms, and failure handling without distributed dual-write inconsistency.',
    whatSaishBuilt:
      'Engineered the atomic transactional persistence layer combining business entity mutations and outbox records in a single ACID commit with JPA/Hibernate and MySQL. Developed asynchronous polling and event dispatch with automated retry policies and dead-letter failure handling.',
    description:
      'Robust backend systems implementation of the Transactional Outbox pattern with automated retries, event processing, and MySQL persistence.',
    longDescription:
      'In distributed architectures, writing to a database and publishing an event to a message stream cannot be safely executed as independent operations without risking dual-write inconsistencies. OutBox-Sync implements the Transactional Outbox Pattern: persisting domain changes and corresponding event records within a single atomic relational transaction, combined with an asynchronous polling processor featuring exponential retry mechanisms and failure handling.',
    tags: ['Java', 'Spring Boot', 'JPA / Hibernate', 'MySQL', 'Maven', 'Transactional Outbox', 'Event Processing', 'Retry Mechanism', 'REST APIs'],
    architecture: [
      { layer: 'Command Ingestion', detail: 'RESTful API controllers accepting commands and validating domain payloads' },
      { layer: 'Atomic Transaction', detail: 'Single ACID boundary: Business entity state + Outbox event record committed together' },
      { layer: 'Event Processing Engine', detail: 'Asynchronous event poller querying pending records with concurrency safeguards' },
      { layer: 'Retry & Failure Handler', detail: 'Configurable retry mechanism with backoff policies and dead-letter record tracking' },
      { layer: 'Persistence Layer', detail: 'MySQL database with JPA / Hibernate entity mappings and transaction management' },
    ],
    engineeringDecisions: [
      'Completely eliminated dual-write failure windows where database commit succeeds but message publishing fails',
      'Engineered an atomic database transaction combining business entity state and outbox table persistence',
      'Implemented robust retry mechanism with failure handling to ensure resilient at-least-once message delivery',
      'Structured modular Spring Boot and Maven project architecture with clean domain event encapsulation'
    ],
    githubUrl: 'https://github.com/saishsanas/OutBox-Sync-TeamProject',
    accentColor: '#FF056D',
    flowDiagramType: 'outbox'
  },
  {
    id: 'saishtask',
    number: '04',
    title: 'SAISHTASK',
    tagline: 'Full-Stack Task & Workflow Management Application',
    status: 'Completed',
    category: 'Full-Stack Enterprise Web Application',
    year: '2024 – 2025',
    isMobileApp: false,
    whatItIs:
      'A complete full-stack task management application enabling users to create, update, categorize, filter, and track tasks with a clean and responsive user interface.',
    whatSaishBuilt:
      'Developed RESTful APIs using Java 21 and Spring Boot structured under a clean Controller → Service → Repository architecture. Designed normalized PostgreSQL database schema, implemented DTOs and mappers, configured global exception handling, and built the responsive frontend using React + Vite + TypeScript with Axios and NextUI.',
    description:
      'Full-stack task management application with Spring Boot REST APIs, PostgreSQL relational modeling, and a responsive React.js (Vite) interface.',
    longDescription:
      'SaishTask demonstrates production-grade full-stack discipline: building a predictable, deterministic task orchestration platform. Emphasizing clean relational modeling, optimistic locking to prevent concurrent overwrite collisions, and type-safe integration between Spring Boot REST endpoints and the React + Vite client.',
    tags: ['Java 21', 'Spring Boot', 'PostgreSQL', 'JPA / Hibernate', 'React + Vite', 'TypeScript', 'Axios', 'Tailwind / NextUI'],
    architecture: [
      { layer: 'Client Presentation', detail: 'React + Vite + TypeScript with NextUI & Tailwind CSS for modern responsive UI' },
      { layer: 'API Gateway & DTOs', detail: 'RESTful endpoints with Bean Validation (@Valid), request DTOs, and response mappers' },
      { layer: 'Controller → Service', detail: 'Clear separation of concerns with Controller mapping, transactional service business rules' },
      { layer: 'Global Exception Layer', detail: '@ControllerAdvice centralized exception handler with standardized RFC-7807 problem details' },
      { layer: 'Persistence Layer', detail: 'Spring Data JPA & Hibernate repositories over a normalized PostgreSQL relational database' },
    ],
    engineeringDecisions: [
      'Enforced Controller → Service → Repository architectural pattern with DTO request/response isolation',
      'Designed and implemented a normalized PostgreSQL database schema ensuring efficient storage and data integrity',
      'Built a type-safe client with React + Vite + TypeScript, Axios HTTP client, and responsive NextUI components',
      'Integrated centralized exception handling with @ControllerAdvice to return predictable error responses'
    ],
    githubUrl: 'https://github.com/saishsanas/saish-task-app',
    repoLinks: [
      { label: 'Combined Repo ↗', url: 'https://github.com/saishsanas/saish-task-app' },
      { label: 'Backend Source ↗', url: 'https://github.com/saishsanas/saish-task-backend' },
      { label: 'Frontend Source ↗', url: 'https://github.com/saishsanas/saish-task-frontend' }
    ],
    accentColor: '#FF056D',
    flowDiagramType: 'saishtask',
    screenshots: [
      { title: 'SaishTask Dashboard & List Management', src: getPublicUrl('saishtask/homepageSaishTask.png') },
      { title: 'Create Task & Categorization Workflow', src: getPublicUrl('saishtask/create-tasklist.png') },
    ]
  }
]
