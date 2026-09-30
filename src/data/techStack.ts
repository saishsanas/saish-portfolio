import { TechItem } from '../types'

export const techStack: TechItem[] = [
  {
    id: 'java',
    name: 'Java',
    category: 'Core & Runtime',
    role: 'Primary Language for Systems & Business Logic',
    explanation:
      'Leveraged for strong typing, modern JDK 17/21 features (records, sealed classes, pattern matching, virtual threads), memory model predictability, and battle-tested garbage collection tuning in high-throughput services.',
    keyFeatures: ['JDK 17/21 LTS', 'OOP & SOLID Principles', 'Stream API & Functional Patterns', 'JVM Memory Tuning'],
    usedInProject: 'CAREWAVE & OUTBOX ENGINE',
    badge: 'CORE'
  },
  {
    id: 'spring-boot',
    name: 'Spring Boot',
    category: 'Core & Runtime',
    role: 'Enterprise Application Framework & IoC Container',
    explanation:
      'Used as the core engineering backbone: Spring IoC/DI, Spring Security filter chains for stateless JWT auth, Spring Data for clean repository patterns, and autoconfigured production-ready metrics via Actuator.',
    keyFeatures: ['Spring Boot 3.x', 'Dependency Injection & IoC', 'Spring Security & JWT', 'Actuator Health & Metrics'],
    usedInProject: 'ALL PROJECTS',
    badge: 'FRAMEWORK'
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    category: 'Core & Runtime',
    role: 'Idempotent, Predictable API Architecture',
    explanation:
      'Designing clean, contract-first HTTP endpoints with strict resource naming, proper status code semantics, RFC-7807 problem details, pagination/filtering query contracts, and comprehensive Swagger/OpenAPI documentation.',
    keyFeatures: ['HTTP Semantics & Idempotency', 'DTO Request/Response Modeling', 'Bean Validation (@Valid)', 'Global Exception Handling (@ControllerAdvice)'],
    usedInProject: 'SAISHTASK & CAREWAVE',
    badge: 'PROTOCOL'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Data & Persistence',
    role: 'Primary Relational Engine & ACID Storage',
    explanation:
      'Selected for strict ACID guarantees, JSONB document flexibility, advanced indexing (B-Tree, GIN, GiST for geospatial coordinates), connection pooling via HikariCP, and robust row-level locking primitives.',
    keyFeatures: ['ACID Compliance', 'B-Tree & Spatial Indexing', 'SELECT FOR UPDATE SKIP LOCKED', 'HikariCP Pool Tuning'],
    usedInProject: 'OUTBOX PATTERN & CAREWAVE',
    badge: 'STORAGE'
  },
  {
    id: 'hibernate-jpa',
    name: 'JPA / Hibernate',
    category: 'Data & Persistence',
    role: 'Object-Relational Mapping & Transaction Management',
    explanation:
      'Used for schema abstraction and domain persistence. Deep focus on avoiding N+1 query traps with JOIN FETCH / EntityGraphs, managing 1st/2nd level cache semantics, and enforcing declarative transaction boundaries via @Transactional.',
    keyFeatures: ['Declarative Transactions (@Transactional)', 'N+1 Query Prevention & EntityGraphs', 'Optimistic Locking (@Version)', 'Auditing & Lifecycle Callbacks'],
    usedInProject: 'SAISHTASK & CAREWAVE',
    badge: 'ORM'
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Data & Persistence',
    role: 'Secondary Relational Engine & Data Modeling',
    explanation:
      'Relational schema design, normalization (1NF through BCNF), InnoDB storage engine mechanics, foreign key constraints, and query profiling using EXPLAIN execution plans.',
    keyFeatures: ['InnoDB Engine', 'Schema Normalization', 'Index Query Optimization', 'Relational Integrity'],
    usedInProject: 'ENTERPRISE LABS & BENCHMARKS',
    badge: 'DATABASE'
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Distributed & Reliability',
    role: 'Containerization & Environment Determinism',
    explanation:
      'Crafting optimized multi-stage Dockerfiles that build Maven packages inside build containers and copy thin JAR layers onto distroless/Eclipse Temurin JRE images for minimal attack surface and fast spin-up.',
    keyFeatures: ['Multi-Stage Docker Builds', 'Docker Compose Orchestration', 'Layer Caching & Minimal Images', 'Volume & Network Isolation'],
    usedInProject: 'ALL PROJECTS',
    badge: 'DEVOPS'
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Distributed & Reliability',
    role: 'Version Control, Branching & GitOps',
    explanation:
      'Clean commit hygiene, semantic commits (feat, fix, refactor, chore), feature branching workflows, rebasing, and GitHub Actions CI pipelines for automated linting, test suites, and Docker image builds.',
    keyFeatures: ['Semantic Commit Discipline', 'Trunk-based & Feature Branching', 'Interactive Rebasing & Cherry-pick', 'CI Pipeline Integration'],
    usedInProject: 'CORE WORKFLOW',
    badge: 'VCS'
  },
  {
    id: 'typescript',
    name: 'JavaScript / TypeScript',
    category: 'Interface & Tools',
    role: 'Type-Safe Client Integration & Tooling',
    explanation:
      'Enables end-to-end type safety between backend DTO contracts and client-side consumption. Strong focus on interfaces, discriminated unions, and reliable asynchronous state handling.',
    keyFeatures: ['Strict Type Checking', 'Discriminated Unions', 'Async / Await Promises', 'API Contract Alignment'],
    usedInProject: 'SAISHTASK UI',
    badge: 'CLIENT CORE'
  },
  {
    id: 'react',
    name: 'React',
    category: 'Interface & Tools',
    role: 'Frontend Presentation & State Orchestration',
    explanation:
      'Constructing responsive, accessible user interfaces to showcase backend APIs. Utilizing clean component composition, custom hooks for API polling/WebSockets, and fluid animations with Framer Motion.',
    keyFeatures: ['Functional Components & Hooks', 'Real-Time WebSocket State', 'Tailwind CSS Integration', 'Framer Motion Transitions'],
    usedInProject: 'SAISHTASK & CAREWAVE UI',
    badge: 'UI ENGINE'
  }
]
