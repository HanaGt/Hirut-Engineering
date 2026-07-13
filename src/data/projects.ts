export interface Project {
  id: string
  name: string
  category: string
  location: string
  year: number
  duration: string
  scale: string
  description: string
  longDescription: string
  coverImage: string
  gallery: string[]
  highlights: string[]
}

export const projects: Project[] = [
  {
    id: 'addis-ababa-interchange',
    name: 'Addis Ababa Grade-Separated Interchange',
    category: 'Infrastructure',
    location: 'Addis Ababa, Ethiopia',
    year: 2023,
    duration: '36 months',
    scale: '4.2 km of elevated roadway',
    description:
      'A landmark multi-level interchange eliminating critical urban bottlenecks and reducing cross-city travel time by 40%.',
    longDescription:
      'This landmark infrastructure project involved the design and construction of a complex multi-level grade-separated interchange in the heart of Addis Ababa. The project encompassed 4.2 km of elevated roadway, 12 bridge spans, and integrated pedestrian walkways. Hirut Engineering managed the full project lifecycle from geotechnical surveys through final commissioning, delivering ahead of schedule with zero safety incidents.',
    coverImage:
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=800&q=80',
    ],
    highlights: [
      '12 bridge spans across active urban corridors',
      'Zero lost-time safety incidents across 36 months',
      'Delivered 3 weeks ahead of schedule',
      '40% reduction in cross-city travel time',
    ],
  },
  {
    id: 'hawassa-industrial-park',
    name: 'Hawassa Industrial Park Expansion',
    category: 'Industrial',
    location: 'Hawassa, Ethiopia',
    year: 2022,
    duration: '24 months',
    scale: '180,000 m² industrial floor area',
    description:
      'Expansion of one of East Africa\'s largest industrial parks, adding 12 new manufacturing sheds and comprehensive utility infrastructure.',
    longDescription:
      'Hirut Engineering led the structural and civil works for the Phase 2 expansion of Hawassa Industrial Park. The scope included 12 large-span steel manufacturing sheds, a central power substation, water treatment facility, and 8 km of internal road network. The project was executed concurrently with live operations in Phase 1, requiring meticulous construction sequencing and dust/noise mitigation protocols.',
    coverImage:
      'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&q=80',
    ],
    highlights: [
      '180,000 m² of new industrial floor area',
      'Live-site execution with zero operational disruption',
      'LEED-aligned design standards',
      'Created 4,200 direct jobs upon completion',
    ],
  },
  {
    id: 'dire-dawa-water-treatment',
    name: 'Dire Dawa Water Treatment Plant',
    category: 'Water & Sanitation',
    location: 'Dire Dawa, Ethiopia',
    year: 2021,
    duration: '18 months',
    scale: '50,000 m³/day capacity',
    description:
      'A modern water treatment facility serving 500,000 residents, using advanced filtration technology sourced from Europe.',
    longDescription:
      'The Dire Dawa Water Treatment Plant represents a transformative investment in public health infrastructure. Hirut Engineering handled all civil, structural, and mechanical installation works for this 50,000 m³/day facility. The plant incorporates rapid sand filtration, UV disinfection, and automated SCADA control systems. The project was procured under a design-build contract with a 15-year performance guarantee.',
    coverImage:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
    ],
    highlights: [
      '500,000 residents served daily',
      'WHO-compliant water quality standards',
      'Automated SCADA monitoring system',
      '15-year performance guarantee',
    ],
  },
  {
    id: 'bole-mixed-use-tower',
    name: 'Bole Mixed-Use Development',
    category: 'Commercial',
    location: 'Bole District, Addis Ababa',
    year: 2023,
    duration: '30 months',
    scale: '42-storey, 68,000 m² GFA',
    description:
      'A 42-storey mixed-use tower combining Grade A office space, luxury residences, and a 5-star hotel podium.',
    longDescription:
      'The Bole Mixed-Use Development is one of the tallest structures in Addis Ababa, and a defining landmark of the city\'s modernization. Hirut Engineering delivered the complete structural and façade package, including a post-tensioned concrete core, structural steel transfer floors, and a unitized glass curtain wall system. Coordination of 28 specialist subcontractors across a constrained urban site required advanced BIM-based clash detection and 4D scheduling.',
    coverImage:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=800&q=80',
      'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80',
    ],
    highlights: [
      'One of Addis Ababa\'s tallest structures at 42 storeys',
      'BIM Level 3 coordination across 28 subcontractors',
      'Unitized curtain wall system — first in Ethiopia',
      'FIDIC Gold Book design-build contract',
    ],
  },
  {
    id: 'mekelle-highway',
    name: 'Mekelle–Adigrat Highway Rehabilitation',
    category: 'Infrastructure',
    location: 'Tigray Region, Ethiopia',
    year: 2020,
    duration: '20 months',
    scale: '126 km dual carriageway',
    description:
      'Full rehabilitation and upgrade of 126 km of critical national highway to dual-carriageway standard.',
    longDescription:
      'This project rehabilitated and widened a critical 126 km section of the Ethiopian national road network to dual-carriageway standard. Works included full-depth pavement reclamation, installation of reinforced concrete box culverts, slope stabilization with rock anchors, and intelligent traffic management systems. Hirut Engineering self-performed over 70% of the works using its own heavy fleet.',
    coverImage:
      'https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=800&q=80',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    ],
    highlights: [
      '126 km upgraded to dual-carriageway standard',
      '70% self-performed with own heavy fleet',
      'Rock anchor slope stabilization in challenging terrain',
      'Intelligent traffic management system installed',
    ],
  },
  {
    id: 'jimma-university-campus',
    name: 'Jimma University Hospital Campus',
    category: 'Healthcare',
    location: 'Jimma, Ethiopia',
    year: 2022,
    duration: '28 months',
    scale: '32,000 m², 600-bed facility',
    description:
      'A state-of-the-art teaching hospital campus comprising a 600-bed main tower, outpatient block, and medical school building.',
    longDescription:
      'Hirut Engineering constructed the new teaching hospital campus for Jimma University, a 600-bed facility that serves as the primary referral hospital for southwest Ethiopia. The project involved complex MEP coordination across the hospital tower, outpatient department, and medical school. All construction met Ministry of Health facility standards for infection control, medical gas systems, and seismic resilience.',
    coverImage:
      'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80',
    ],
    highlights: [
      '600-bed capacity serving southwest Ethiopia',
      'Full medical gas and infection-control MEP systems',
      'Seismic Zone 3 structural design',
      'Primary referral hospital for 4 million people',
    ],
  },
]
