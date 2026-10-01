import { Credential } from '../types'

export const credentials: Credential[] = [
  {
    id: 'oci-2025',
    title: 'Oracle Cloud Infrastructure 2025 — Certified Foundations Associate',
    issuer: 'Oracle',
    issuedDate: '2025',
    credentialId: '103057743OCI25FNDCFA',
    certificateImage: '/certificates/oracle-badge.jpeg',
    verifyUrl:
      'https://catalog-education.oracle.com/ords/certview/sharebadge?id=AC22289CE2412240347A70EDFD0472D147C258FBFD39894AA10381647B7B7780I',
    type: 'CERTIFICATION',
    description:
      'Official Oracle accreditation validating foundational understanding of public-cloud principles, OCI core services (compute, storage, networking, identity & access), and cloud-architecture fundamentals.',
    badges: ['Cloud Architecture', 'IAM Security', 'OCI Networking', 'Compute & Storage']
  },
  {
    id: 'tcs-ion-ai',
    title: 'TCS iON Career Edge - AI Foundation',
    issuer: 'Tata Consultancy Services (TCS iON)',
    issuedDate: '06 Aug 2026 – 21 Aug 2026',
    credentialId: '279243-33346757-1016',
    certificateImage: '/certificates/tcs-cert.png',
    type: 'CERTIFICATION',
    description:
      'Professional certification demonstrating core competencies in Artificial Intelligence fundamentals, machine learning concepts, data-driven reasoning, and ethical AI deployment principles.',
    badges: ['Artificial Intelligence', 'Data Fundamentals', 'Machine Learning Basics', 'Applied AI']
  },
  {
    id: 'be-computer-engg',
    title: 'Bachelor of Engineering (Computer Engineering)',
    issuer: 'Savitribai Phule Pune University',
    issuedDate: '2026 • First Class',
    credentialId: 'SPPU Degree Document Verified',
    certificateImage: '/certificates/degree-certificate-p1.png',
    type: 'DEGREE',
    description:
      'Comprehensive four-year computer engineering curriculum covering Operating Systems, Database Management Systems, Computer Networks, Data Structures & Algorithms, and Software Engineering. Graduated with First Class distinction.',
    badges: ['First Class', 'Computer Engineering', 'DBMS & SQL', 'Operating Systems', 'Algorithms']
  }
]

