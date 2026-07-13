import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client.js'
import { PrismaNeon } from '@prisma/adapter-neon'

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0])

async function main() {
  console.log('Seeding inventory...')

  // Clear existing items
  await prisma.importedItem.deleteMany()

  await prisma.importedItem.createMany({
    data: [
      {
        name: 'Liebherr LTM 1100-5.2 Mobile Crane',
        category: 'HEAVY_MACHINERY',
        arrivalDate: new Date('2026-06-10'),
        specs:
          '100-tonne capacity mobile crane. 5-axle all-terrain carrier. Max lift height: 84m. Boom length: 60m. Country of origin: Germany. Condition: New. Includes lattice jib extension and VarioSuper counterweight system.',
        imageUrl:
          'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
        quantity: 1,
        unit: 'unit',
        available: true,
      },
      {
        name: 'HD Grade 60 Reinforcing Steel Bar (16mm)',
        category: 'STRUCTURAL_STEEL',
        arrivalDate: new Date('2026-06-14'),
        specs:
          'High-ductility Grade 60 deformed reinforcing bar, 16mm diameter. Yield strength: 420 MPa. Tensile strength: 620 MPa. Length: 12m per bar. Certification: ASTM A615. Country of origin: Turkey. Quantity: 45 tonnes.',
        imageUrl: null,
        quantity: 45,
        unit: 'tonnes',
        available: true,
      },
      {
        name: 'Caterpillar 336 Hydraulic Excavator',
        category: 'HEAVY_MACHINERY',
        arrivalDate: new Date('2026-06-08'),
        specs:
          '36-tonne hydraulic excavator. Engine: Cat C9.3B, 210 kW (281 hp). Operating weight: 36,400 kg. Bucket capacity: 1.69 m³. Max dig depth: 7.0m. Includes Grade Control ready sensors. Country of origin: USA. Condition: New.',
        imageUrl:
          'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&q=80',
        quantity: 2,
        unit: 'units',
        available: true,
      },
      {
        name: 'Structural Steel H-Beam (HEB 300)',
        category: 'STRUCTURAL_STEEL',
        arrivalDate: new Date('2026-06-17'),
        specs:
          'HEB 300 wide flange H-beam. Flange width: 300mm, height: 300mm, web thickness: 11mm. Grade S355JR. Length: 12m. Surface: hot-dip galvanized. Country of origin: China. Suitable for multi-storey structural frames.',
        imageUrl: null,
        quantity: 120,
        unit: 'pieces',
        available: true,
      },
      {
        name: 'Schneider Electric LV Switchgear Panel (MNS)',
        category: 'ELECTRICAL',
        arrivalDate: new Date('2026-06-12'),
        specs:
          'Low-voltage switchgear panel, MNS system. Rated voltage: 400V/690V. Short-circuit withstand: 50 kA. IP54 protection. Includes motorized ACBs, MCCBs, and metering modules. Country of origin: France. Pre-tested at factory.',
        imageUrl: null,
        quantity: 3,
        unit: 'panels',
        available: true,
      },
      {
        name: 'HDPE Pressure Pipe DN200 PN16',
        category: 'PLUMBING',
        arrivalDate: new Date('2026-06-05'),
        specs:
          'High-density polyethylene pressure pipe. Nominal diameter: DN200. Pressure rating: PN16 (16 bar). Material: PE100, SDR11. Length: 6m sticks. Standard: ISO 4427 / EN 12201. Country of origin: Germany. Suitable for water supply and industrial process lines.',
        imageUrl: null,
        quantity: 500,
        unit: 'sticks',
        available: true,
      },
      {
        name: 'KOMATSU PC210LC-11 Track Excavator',
        category: 'HEAVY_MACHINERY',
        arrivalDate: new Date('2026-06-01'),
        specs:
          '21-tonne class crawler excavator. Engine: SAA6D107E-3, 122 kW. Operating weight: 21,400 kg. Bucket capacity: 0.8 m³. KOMTRAX fleet management installed. Country of origin: Japan. Condition: Used (1,200 hours). Full service history available.',
        imageUrl:
          'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
        quantity: 1,
        unit: 'unit',
        available: false,
      },
      {
        name: 'Italian Marble Floor Tiles (Carrara White, 60×60)',
        category: 'FINISHING_MATERIALS',
        arrivalDate: new Date('2026-06-19'),
        specs:
          'Carrara white marble floor tiles. Size: 600×600×20mm. Finish: polished. Grade A, book-matched slabs. Water absorption: <0.5%. Flexural strength: 14 MPa. Country of origin: Italy. Suitable for lobbies, hotel floors, and premium residential projects.',
        imageUrl: null,
        quantity: 2400,
        unit: 'm²',
        available: true,
      },
      {
        name: 'Honeywell Gas Detector System (XNX)',
        category: 'SAFETY_EQUIPMENT',
        arrivalDate: new Date('2026-06-15'),
        specs:
          'Fixed-point gas detection transmitter. Detects H₂S, CO, O₂, and combustible gases. Display: 4-digit LCD. Output: 4–20mA + HART. Enclosure: IP66/67. Certifications: ATEX, IECEx, CSA. Country of origin: USA. Includes sensor head, transmitter, and calibration kit.',
        imageUrl: null,
        quantity: 12,
        unit: 'units',
        available: true,
      },
      {
        name: 'Liebherr Tower Crane 280 EC-H (Flat-Top)',
        category: 'HEAVY_MACHINERY',
        arrivalDate: new Date('2026-05-28'),
        specs:
          'Flat-top tower crane. Max jib length: 80m. Max lifting capacity: 16 tonnes. Tip load (80m): 2.0 tonnes. Freestanding height: 48m (with mast extension to 200m). Hoist speed: 0–120 m/min. Country of origin: Germany. Condition: Refurbished (2022).',
        imageUrl:
          'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80',
        quantity: 1,
        unit: 'unit',
        available: true,
      },
      {
        name: 'Precast Concrete Hollow-Core Slabs (200mm)',
        category: 'STRUCTURAL_STEEL',
        arrivalDate: new Date('2026-06-20'),
        specs:
          '200mm prestressed hollow-core floor slabs. Width: 1.2m, length: up to 15m. Concrete class: C45/55. Pre-tensioned strands: 12.5mm dia. Fire resistance: REI90. Country of origin: UAE. Ready for immediate installation on structural frames.',
        imageUrl: null,
        quantity: 320,
        unit: 'panels',
        available: true,
      },
      {
        name: 'Siemens HV Transformer (1.6 MVA)',
        category: 'ELECTRICAL',
        arrivalDate: new Date('2026-06-11'),
        specs:
          'Oil-immersed distribution transformer. Rating: 1,600 kVA, 15kV/0.4kV. Vector group: Dyn11. Losses: No-load 2.5 kW, Load 16 kW. Protection: DGPT2 (gas, pressure, temperature). Certification: IEC 60076. Country of origin: Germany. Includes cable boxes and thermometer.',
        imageUrl: null,
        quantity: 2,
        unit: 'units',
        available: true,
      },
    ],
  })

  const count = await prisma.importedItem.count()
  console.log(`✓ Seeded ${count} inventory items.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
