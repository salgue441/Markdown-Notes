import { ActionButton, ActionButtonProps } from './ActionButton'
import { FaRegTrashCan } from 'react-icons/fa6'

/**
 * Button to delete a note
 * @component
 *
 * @param {object} props - Component props
 */
export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <FaRegTrashCan className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
