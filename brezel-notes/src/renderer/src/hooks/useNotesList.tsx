import { notesAtom, selectedNoteIndexAtom } from '../store'
import { useAtom, useAtomValue } from 'jotai'

/**
 * This hook is used to get the notes list and the selected note index.
 *
 * @returns {object} - The notes list and the selected note index
 */
export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)
  const notes = useAtomValue(notesAtom)

  /**
   * Handles the note selection
   *
   * @param {number} index - The index of the selected note
   * @returns {void}
   */
  const handleSelectNote = (index: number) => {
    setSelectedNoteIndex(index)

    if (onSelect) {
      onSelect()
    }
  }

  return {
    notes,
    selectedNoteIndex,
    handleSelectNote
  }
}
