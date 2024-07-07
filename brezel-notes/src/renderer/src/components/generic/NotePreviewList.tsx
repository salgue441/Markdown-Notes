import { notesMock } from '@renderer/store/mocks'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { NotePreview } from './NotePreview'
import { useNotesList } from '@renderer/hooks/useNotesList'

type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

/**
 * Preview list of notes
 *
 * @param {() => void} onSelect - Callback when a note is selected
 * @param {string} className - Additional classes
 * @param {ComponentProps<'ul'>} props - Additional props
 *
 * @returns JSX.Element - Note preview list
 */
export const NotePreviewList = ({ onSelect, className, ...props }: NotePreviewListProps) => {
  const { notes, selectedNoteIndex, handleSelectNote } = useNotesList({ onSelect })

  if (notes.length === 0) {
    return (
      <ul className={twMerge('text-center pt-4', className)}>
        <span>No Notes Yet!</span>
      </ul>
    )
  }

  return (
    <ul {...props}>
      {notes.map((note, index) => (
        <NotePreview
          key={note.id}
          isActive={selectedNoteIndex === index}
          onClick={() => handleSelectNote(index)}
          {...note}
        />
      ))}
    </ul>
  )
}
