import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Defines the date format used in the application
 *
 * @type {object} - Date format options object
 * @property {string} dateStyle - Date style ('short', 'medium', 'long', 'full')
 * @property {string} timeStyle - Time style ('short', 'medium', 'long', 'full')
 * @property {string} timeZone - Time zone ('UTC', 'GMT', 'Asia/Tokyo', etc.)
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 */
export const dateFormatter = new Intl.DateTimeFormat(window.context.locale, {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'UTC'
})

/**
 * Formats the date based off ms since epoch
 *
 * @param {number} ms - Milliseconds since epoch
 * @returns {string} - Formatted date
 */
export const formatDate = (ms: number): string => {
  return dateFormatter.format(ms)
}

/**
 * Merges the given class names into a single string
 *
 * @param {ClassValue[]} classes - Array of class names to merge
 * @returns {string} - Merged class names
 */
export const cn = (...args: ClassValue[]): string => {
  return twMerge(clsx(...args))
}
