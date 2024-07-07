import { NoteContent, NoteInfo } from '@shared/models'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'
import { v4 as uuidv4 } from 'uuid'

/**
 * Loads the notes from the window context and sorts them based on
 * last edited time.
 *
 * @returns {Promise<Note[]>} The sorted array of notes.
 */
const loadNotes = async () => {
  const notes = await window.context.getNotes()
  return notes.sort((a, b) => b.lastEditedTime - a.lastEditedTime)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())
const notesAtom = unwrap(notesAtomAsync, (prev) => prev)
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
const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (selectedNoteIndex == null || !notes) {
    return null
  }

  const selectedNote = notes[selectedNoteIndex]
  const noteContent = await window.context.readNote(selectedNote.title)
  return {
    ...selectedNote,
    content: noteContent
  }
})

const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) =>
    prev ?? {
      id: '',
      title: '',
      lastEditedTime: 0,
      content: ''
    }
)

const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) {
    return
  }

  await window.context.writeNote(selectedNote.title, newContent)
  set(
    notesAtom,
    notes.map((note) => {
      if (note.id === selectedNote.id || note.title === selectedNote.title) {
        return {
          ...note,
          lastEditedTime: Date.now()
        }
      }

      return note
    })
  )
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
const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  if (!notes) {
    return
  }

  const title = await window.context.createNote()
  if (!title) {
    return
  }

  const newNote: NoteInfo = {
    id: uuidv4(),
    title: title,
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
const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  const isDeleted = await window.context.deleteNote(selectedNote.title)
  if (!isDeleted) {
    return
  }

  set(
    notesAtom,
    notes.filter((note) => note.id !== selectedNote.id)
  )

  set(selectedNoteIndexAtom, null)
})

export {
  notesAtom,
  selectedNoteIndexAtom,
  selectedNoteAtom,
  saveNoteAtom,
  createEmptyNoteAtom,
  deleteNoteAtom
}
