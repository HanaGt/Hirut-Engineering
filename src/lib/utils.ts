import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const CATEGORY_LABELS: Record<string, string> = {
  HEAVY_MACHINERY: 'Heavy Machinery',
  STRUCTURAL_STEEL: 'Structural Steel',
  ELECTRICAL: 'Electrical',
  PLUMBING: 'Plumbing',
  FINISHING_MATERIALS: 'Finishing Materials',
  SAFETY_EQUIPMENT: 'Safety Equipment',
  OTHER: 'Other',
}
