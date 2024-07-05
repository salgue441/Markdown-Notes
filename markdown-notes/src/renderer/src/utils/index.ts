import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combine Tailwind CSS classes with custom classes
 *
 * @param args - Tailwind CSS classes and custom classes
 * @returns Combined classes
 */
export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}
