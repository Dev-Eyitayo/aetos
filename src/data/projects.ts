import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'mycliq',
    title: 'MyCliq',
    tags: ['Fintech', 'Mobile App Design & Development.'],
    description:
      'Fintech & payment platform — enabling businesses to collect payments and manage cash flow.',
    heroGradient: 'linear-gradient(160deg, #fff5ee 0%, #ffd4a8 40%, #ff8c3a 75%, #cc5500 100%)',
    logoText: '✦ mycliq',
    accentColor: '#f97316',
    details: {
      category: 'Mobile App\nDevelopment.',
      timeTaken: '4 Months',
      startDate: 'January 15, 2023',
      completedDate: 'May 15, 2023',
      technologies: ['Figma', 'CSS3', 'Bootstrap', 'Bootstrap'],
      teamGroups: [
        {
          role: 'Web Developers',
          members: [
            { name: 'John Smith' },
            { name: 'Emily Johnson' },
          ],
        },
        {
          role: 'UI UX Designer',
          members: [{ name: 'Jessica Lee' }],
        },
        {
          role: 'Project Manager',
          members: [{ name: 'Michael Williams' }],
        },
      ],
      methodsUsed: ['Agile Development', 'User Testing', 'A/B Testing'],
    },
  },
  {
    id: 'chatrizz',
    title: 'Chatrizz',
    tags: ['Social E-commerce', 'Mobile App Design & Development.'],
    description:
      'Social media + global marketplace enabling users to connect, chat and trade seamlessly.',
    heroGradient: 'linear-gradient(160deg, #002233 0%, #004466 30%, #00bbcc 75%, #00e5ff 100%)',
    logoText: 'Chatrizz',
    accentColor: '#00b4d8',
    details: {
      category: 'Mobile App\nDevelopment.',
      timeTaken: '6 Months',
      startDate: 'March 1, 2023',
      completedDate: 'September 1, 2023',
      technologies: ['Figma', 'CSS3', 'Bootstrap', 'Bootstrap'],
      teamGroups: [
        {
          role: 'Web Developers',
          members: [
            { name: 'Alex Turner' },
            { name: 'Sara Kim' },
          ],
        },
        {
          role: 'UI UX Designer',
          members: [{ name: 'David Park' }],
        },
        {
          role: 'Project Manager',
          members: [{ name: 'Lisa Chen' }],
        },
      ],
      methodsUsed: ['Agile Development', 'User Testing', 'A/B Testing'],
    },
  },
  {
    id: 'sync360',
    title: 'Sync360 (ERP Inventory)',
    tags: ['Web Design'],
    description:
      'Business operations platform — manage inventory, sales, expenses & payments. All in one place.',
    heroGradient: 'linear-gradient(160deg, #001a00 0%, #003300 30%, #006600 70%, #33aa33 100%)',
    logoText: 'Sync360',
    accentColor: '#4ade80',
    details: {
      category: 'Web Design.',
      timeTaken: '5 Months',
      startDate: 'June 1, 2022',
      completedDate: 'November 1, 2022',
      technologies: ['Figma', 'CSS3', 'Bootstrap', 'Bootstrap'],
      teamGroups: [
        {
          role: 'Web Developers',
          members: [{ name: 'Chris Evans' }, { name: 'Nina Patel' }],
        },
        {
          role: 'UI UX Designer',
          members: [{ name: 'Tom Hayes' }],
        },
        {
          role: 'Project Manager',
          members: [{ name: 'Rachel Moore' }],
        },
      ],
      methodsUsed: ['Agile Development', 'User Testing', 'QA Testing'],
    },
  },
  {
    id: 'tolkin',
    title: 'Toltim (Health Connect)',
    tags: ['Healthcare', 'Web Design'],
    description:
      'Healthcare addition: connecting nurses & community health workers to patients for home care services.',
    heroGradient: 'linear-gradient(160deg, #001133 0%, #002255 30%, #003388 70%, #0055cc 100%)',
    logoText: 'Tolkin',
    accentColor: '#60a5fa',
    details: {
      category: 'Web Design.',
      timeTaken: '3 Months',
      startDate: 'August 1, 2022',
      completedDate: 'November 1, 2022',
      technologies: ['Figma', 'CSS3', 'Bootstrap', 'Bootstrap'],
      teamGroups: [
        {
          role: 'Web Developers',
          members: [{ name: 'Jake Morris' }, { name: 'Amy Grant' }],
        },
        {
          role: 'UI UX Designer',
          members: [{ name: 'Priya Shah' }],
        },
        {
          role: 'Project Manager',
          members: [{ name: 'Steve Brown' }],
        },
      ],
      methodsUsed: ['Agile Development', 'User Research', 'Usability Testing'],
    },
  },
]
