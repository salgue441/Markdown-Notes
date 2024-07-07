import { DeleteNoteButton } from './DeleteNoteButton'
import { NewNoteButton } from './NewNoteButton'
import { ComponentProps } from 'react'

/**
 * Row of action buttons
 * @component
 * 
 * @param {ComponentProps<'div'>} props - The props to spread to the component
 */
export const NoteActionsRow = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  )
}
