import { notesMock } from './mocks'
import { NoteInfo } from '@shared/models'
import { atom } from 'jotai'

const notesAtom = atom<NoteInfo[]>(notesMock)
const selectedNoteIndexAtom = atom<number | null>(null)

/**
 * This atom is used to get the selected note from the notes list.
 *
 * @details Uses the `notesAtom` and `selectedNoteIndexAtom` atoms
 *          to get the selected note from the notes list.
 *
 * @param {NoteInfo[]} get - The get function from Jotai
 * @returns {NoteInfo | null} - The selected note or null if no note is selected
 */
const selectedNoteAtom = atom((get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (selectedNoteIndex == null) {
    return null
  }

  const selectedNote = notes[selectedNoteIndex]
  return {
    ...selectedNote,
    content: `Hello from Note ${selectedNoteIndex}`
  }
})

export { notesAtom, selectedNoteIndexAtom, selectedNoteAtom }
