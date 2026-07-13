import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { prisma } from './prisma'

const CategoryValues = [
  'HEAVY_MACHINERY',
  'STRUCTURAL_STEEL',
  'ELECTRICAL',
  'PLUMBING',
  'FINISHING_MATERIALS',
  'SAFETY_EQUIPMENT',
  'OTHER',
] as const

export const getInventory = createServerFn({ method: 'GET' })
  .validator(z.object({ q: z.string().optional(), category: z.string().optional() }))
  .handler(async ({ data }) => {
    return prisma.importedItem.findMany({
      where: {
        ...(data.q
          ? {
              OR: [
                { name: { contains: data.q, mode: 'insensitive' } },
                { specs: { contains: data.q, mode: 'insensitive' } },
              ],
            }
          : {}),
        ...(data.category ? { category: data.category as (typeof CategoryValues)[number] } : {}),
      },
      orderBy: { arrivalDate: 'desc' },
    })
  })

export const getInventoryItem = createServerFn({ method: 'GET' })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    return prisma.importedItem.findUnique({ where: { id: data.id } })
  })

export const createInventoryItem = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      name: z.string().min(1),
      category: z.enum(CategoryValues),
      arrivalDate: z.string(),
      specs: z.string().min(1),
      imageUrl: z.string().url().optional(),
      quantity: z.number().int().min(1),
      unit: z.string().min(1),
      available: z.boolean(),
    })
  )
  .handler(async ({ data }) => {
    return prisma.importedItem.create({
      data: { ...data, arrivalDate: new Date(data.arrivalDate) },
    })
  })

export const deleteInventoryItem = createServerFn({ method: 'POST' })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    return prisma.importedItem.delete({ where: { id: data.id } })
  })

export const toggleAvailability = createServerFn({ method: 'POST' })
  .validator(z.object({ id: z.string(), available: z.boolean() }))
  .handler(async ({ data }) => {
    return prisma.importedItem.update({
      where: { id: data.id },
      data: { available: data.available },
    })
  })
