export interface ProjectRepoLinks {
  label: string
  url: string
}

export interface Project {
  id: string
  number: string
  title: string
  tagline: string
  status: 'In Progress' | 'Completed' | 'Systems Architecture'
  category: string
  year: string
  isMobileApp?: boolean
  whatItIs: string
  whatSaishBuilt: string
  description: string
  longDescription: string
  tags: string[]
  architecture: {
    layer: string
    detail: string
  }[]
  engineeringDecisions: string[]
  githubUrl: string
  repoLinks?: ProjectRepoLinks[]
  liveUrl?: string
  accentColor: string
  flowDiagramType: 'carewave' | 'saishtask' | 'outbox'
  featuredVisualType?: 'screenshots' | 'outbox-flow'
  screenshots?: {
    title: string
    src: string
  }[]
}

export interface TechItem {
  id: string
  name: string
  category: 'Core & Runtime' | 'Data & Persistence' | 'Distributed & Reliability' | 'Interface & Tools'
  role: string
  explanation: string
  keyFeatures: string[]
  usedInProject: string
  badge: string
}

export interface TimelineItem {
  year: string
  period: string
  title: string
  subtitle: string
  tag: string
  organization?: string
  description: string
  deliverables: string[]
  status: 'COMPLETED' | 'ACTIVE' | 'PUBLISHED' | 'INTERNSHIP'
}

export interface Credential {
  id: string
  title: string
  issuer: string
  issuedDate: string
  credentialId?: string
  certificateImage?: string
  verifyUrl?: string
  type: 'CERTIFICATION' | 'DEGREE'
  description: string
  badges: string[]
}

export interface ReportedResultItem {
  metric: string
  value: string
  sample: string
  detail: string
}

export interface Publication {
  id: string
  number: string
  title: string
  journal: string
  volumeIssue: string
  date: string
  doi?: string
  issn?: string
  authors: string[]
  description: string
  keyContributions: string[]
  link?: string
  thumbnailImage?: string
  certificateImage?: string
  reportedResults?: ReportedResultItem[]
  limitationsNote?: string
}
