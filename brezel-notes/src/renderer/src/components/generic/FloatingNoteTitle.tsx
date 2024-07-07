import { selectedNoteAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

/**
 * FloatingNoteTitle component
 * @component
 *
 * @param {string} className - The class name of the element
 * @param {ComponentProps<'div'>} props - The props of the element
 * @returns JSX.Element - FloatingNoteTitle component
 */
export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  if (!selectedNote) {
    return null
  }

  console.log(selectedNote)

  return (
    <div className={twMerge('flex justify-center', className)} {...props}>
      <span className="text-gray-400">{selectedNote.title}</span>
    </div>
  )
}
