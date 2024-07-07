import { useSetAtom } from 'jotai'
import { ActionButton, ActionButtonProps } from './ActionButton'
import { FaRegTrashCan } from 'react-icons/fa6'
import { deleteNoteAtom } from '@renderer/store'

/**
 * Button to delete a note
 * @component
 *
 * @param {object} props - Component props
 */
export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const deleteNote = useSetAtom(deleteNoteAtom)
  const handleDeletion = () => {
    deleteNote()
  }

  return (
    <ActionButton onClick={handleDeletion} {...props}>
      <FaRegTrashCan className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
