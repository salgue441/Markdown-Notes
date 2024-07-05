import { DeleteNoteButton } from './DeleteNoteButton'
import { NewNoteButton } from './NewNoteButton'
import { ComponentProps } from 'react'

/**
 * Row of action buttons
 * @component
 */
export const ActionButtonRow = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  )
}
