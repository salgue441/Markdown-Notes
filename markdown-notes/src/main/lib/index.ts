import { appDirectoryName, fileEncoding, welcomeNoteFilename } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import { isEmpty } from 'lodash'
import { homedir } from 'os'
import path from 'path'
import welcomeNoteFile from '../../../resources/welcome.md?asset'

/**
 * Returns the root directory where the notes are stored.
 * The root directory is the user's home directory
 * appended with the application directory name.
 * @returns The root directory path.
 */
export const getRootDir = (): string => {
  return `${homedir()}/${appDirectoryName}`
}

/**
 * Retrieves the list of notes.
 * If no notes are found, a welcome note is created.
 * @returns A promise that resolves to an array of
 *          NoteInfo objects representing the notes.
 */
export const getNotes: GetNotes = async (): Promise<NoteInfo[]> => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)

  const noteFilenames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = noteFilenames.filter((fileName) => fileName.endsWith('.md'))
  if (isEmpty(notes)) {
    console.info('No notes found, creating a welcome note')
    const content = await readFile(welcomeNoteFile, { encoding: fileEncoding })

    await writeFile(`${rootDir}/${welcomeNoteFilename}`, content, {
      encoding: fileEncoding
    })

    notes.push(welcomeNoteFilename)
  }

  return Promise.all(notes.map(getNoteInfoFromFilename))
}

/**
 * Retrieves the NoteInfo object from a given filename.
 * @param filename - The name of the note file.
 * @returns A promise that resolves to the NoteInfo object.
 */
export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const filePath = await stat(`${getRootDir()}/${filename}`)

  return {
    title: filename.replace(/\.md$/, ''),
    lastEditTime: filePath.mtimeMs
  }
}

/**
 * Reads the content of a note file.
 * @param filename - The name of the note file.
 * @returns A promise that resolves to the content of the note.
 */
export const readNote: ReadNote = async (filename: string): Promise<string> => {
  const rootDir = getRootDir()

  return readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
}

/**
 * Writes content to a note file.
 * @param filename - The name of the note file.
 * @param content - The content to write to the note file.
 * @returns A promise that resolves when the note is successfully written.
 */
export const writeNote: WriteNote = async (filename: string, content: string): Promise<void> => {
  const rootDir = getRootDir()

  console.info(`Writing note ${filename}`)
  return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
}

/**
 * Creates a new note.
 * @returns The filename of the created note, or
 *          false if the note creation was canceled or failed.
 */
export const createNote: CreateNote = async (): Promise<string | false> => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.info('Note creation canceled')
    return false
  }

  const { name: filename, dir: parentDir } = path.parse(filePath)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation failed',
      message: `All notes must be saved under ${rootDir}.
      Avoid using other directories!`
    })

    return false
  }

  console.info(`Creating note: ${filePath}`)
  await writeFile(filePath, '')

  return filename
}

/**
 * Deletes a note with the specified filename.
 * @see 0 is delete, 1 is cancel
 *
 * @param filename - The name of the note to delete.
 * @returns A boolean indicating whether the note was successfully deleted.
 */
export const deleteNote: DeleteNote = async (filename: string): Promise<boolean> => {
  const rootDir = getRootDir()

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete note',
    message: `Are you sure you want to delete ${filename}?`,
    buttons: ['Delete', 'Cancel'],
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info('Note deletion canceled')
    return false
  }

  console.info(`Deleting note: ${filename}`)
  await remove(`${rootDir}/${filename}.md`)
  return true
}
