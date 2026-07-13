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

/** Predefined per-category images, shown when an item has no custom image. */
export const CATEGORY_IMAGES: Record<string, string> = {
  HEAVY_MACHINERY: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
  STRUCTURAL_STEEL: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  ELECTRICAL: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?w=800&q=80',
  PLUMBING: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
  FINISHING_MATERIALS: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  SAFETY_EQUIPMENT: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
  OTHER: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
}

/** Custom image if the admin provided one, otherwise the category default. */
export function getItemImage(item: { imageUrl?: string | null; category: string }): string {
  return item.imageUrl || CATEGORY_IMAGES[item.category] || CATEGORY_IMAGES.OTHER
}
