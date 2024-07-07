import { notesMock } from './mocks'
import { NoteInfo } from '@shared/models'
import { atom } from 'jotai'
import { v4 as uuidv4 } from 'uuid'

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

/**
 * This atom is used to create an empty note with a unique ID.
 *
 * @details Uses the `notesAtom` atom to get the current notes list
 *         and creates a new note with a unique ID.
 *
 * @param {NoteInfo[]} get - The get function from Jotai
 * @param {NoteInfo[]} set - The set function from Jotai
 * @returns {NoteInfo} - The new note
 */
const createEmptyNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)
  const title = `Note ${notes.length + 1}`

  const newNote: NoteInfo = {
    id: uuidv4(),
    title,
    lastEditedTime: Date.now()
  }

  set(notesAtom, [newNote, ...notes.filter((note) => note.id !== newNote.id)])
  set(selectedNoteIndexAtom, 0)
})

/**
 * This atom is used to delete the selected note.
 *
 * @details Uses the `notesAtom` and `selectedNoteAtom` atoms
 *          to delete the selected note from the notes list.
 *
 * @param {NoteInfo[]} get - The get function from Jotai
 * @param {NoteInfo[]} set - The set function from Jotai
 */
const deleteNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  set(
    notesAtom,
    notes.filter((note) => note.id !== selectedNote.id)
  )

  set(selectedNoteIndexAtom, null)
})

export { notesAtom, selectedNoteIndexAtom, selectedNoteAtom, createEmptyNoteAtom, deleteNoteAtom }
