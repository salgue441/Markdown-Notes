import { useSetAtom } from 'jotai'
import { ActionButton, ActionButtonProps } from './ActionButton'
import { LuFileSignature } from 'react-icons/lu'
import { createEmptyNoteAtom } from '@renderer/store'

/**
 * Button to create a new note
 * @component
 *
 * @param {object} props - Component props
 * @param {string} props.className - Additional class names
 * @param {function} props.onClick - Click event handler
 */
export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)
  const handleCreation = () => createEmptyNote()

  return (
    <ActionButton onClick={handleCreation} {...props}>
      <LuFileSignature className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
