import { Publication } from '../types'
import { getPublicUrl } from '../utils/getPublicUrl'

export const publications: Publication[] = [
  {
    id: 'irjmets-emergency-alert',
    number: '01',
    title: 'Design and Development of a Mobile-Based Emergency Alert System for Public Safety Using GPS and Real-Time Tracking',
    journal: 'International Research Journal of Modernization in Engineering Technology and Science (IRJMETS)',
    volumeIssue: 'Volume 07 / Issue 11',
    date: 'November 2025',
    doi: '10.56726/IRJMETS85227',
    authors: [
      'Saish Sanas',
      'Nakul Siricilla',
      'Moin Mankar',
      'Mohd. Shaban Ali',
      'Prof. Vidya Rajput'
    ],
    description:
      'Scholarly paper investigating mobile distress communication protocols, automated GPS location broadcasts, and fault-tolerant server-side dispatching mechanisms during critical safety emergencies.',
    keyContributions: [
      'Engineered bi-directional location broadcasting architecture for sub-second distress dispatch',
      'Modeled fallback communication pipelines for unstable network conditions',
      'Empirical analysis of alert dispatch latencies across heterogeneous cellular environments'
    ],
    link: 'https://doi.org/10.56726/IRJMETS85227',
    thumbnailImage: getPublicUrl('/publications/irjmets-paper-p1.png'),
    certificateImage: getPublicUrl('/publications/irjmets-saish-certificate.png')
  },
  {
    id: 'ijerste-emergency-alert',
    number: '02',
    title: 'Design and Implementation of a Mobile-Based Emergency Alert System for Public Safety',
    journal: 'International Journal of Enhanced Research in Science, Technology & Engineering (IJERSTE)',
    volumeIssue: 'Volume 15 / Issue 3',
    date: 'March 2026',
    issn: '2319-7463',
    authors: [
      'Prof. Vidya Rajput',
      'Saish Sanas',
      'Nakul Siricilla',
      'Moin Mankar',
      'Mohd. Shaban Tabarak Ali'
    ],
    description:
      'Empirical study detailing the end-to-end implementation and controlled evaluation of a mobile emergency alert system, assessing dispatch latency, GPS coordinate resolution, and multi-user task completion efficiency.',
    keyContributions: [
      'Architected end-to-end emergency notification pipeline with multi-recipient routing',
      'Conducted controlled usability trials evaluating user interaction depth under stress',
      'Evaluated spatial resolution accuracy and dispatch round-trip response intervals'
    ],
    thumbnailImage: getPublicUrl('/publications/ijerste-paper-p1.png'),
    reportedResults: [
      {
        metric: 'Notification Delivery Latency',
        value: '< 1.0s',
        sample: 'n = 50 test cases',
        detail: 'Notification delivery within one second under stable network conditions'
      },
      {
        metric: 'GPS Spatial Resolution',
        value: '≤ 10m',
        sample: 'n = 50 test cases',
        detail: 'Location resolution within 10 metres across test scenarios'
      },
      {
        metric: 'Task Interaction Depth',
        value: '≤ 3 taps',
        sample: 'n = 10 usability participants',
        detail: 'Core critical actions completed with no more than three interactions'
      }
    ],
    limitationsNote:
      'Reported in controlled evaluation. Results observed under controlled network conditions, modern mobile hardware, a limited usability sample (n = 10), and without direct municipal emergency-service integration.'
  }
]
