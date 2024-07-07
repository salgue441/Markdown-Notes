import { NoteInfo } from '@shared/models'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { appDirectoryName, fileEncoding, welcomeNoteFileName } from '../../shared/constants'
import { isEmpty } from 'lodash'
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset'

/**
 * Get the root directory for the application.
 *
 * @returns {string} - The root directory for the application
 */
const getRootDir = (): string => {
  return `${homedir()}/${appDirectoryName}`
}

/**
 * Get the metadata directory for the application.
 *
 * @returns {string} - The metadata directory for the application
 */
const getMetadataDir = (): string => {
  return `${getRootDir()}/.metadata`
}

/**
 * Get the notes from the root directory.
 *
 * @returns {Promise<void>} - The notes from the root directory
 */
const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))
  if (isEmpty(notes)) {
    console.info('No notes were found, creating a welcome note')
    const welcomeNote = await readFile(welcomeNoteFile, { encoding: fileEncoding })

    await writeFile(`${rootDir}/${welcomeNoteFileName}`, welcomeNote, { encoding: fileEncoding })

    notes.push(welcomeNoteFileName)
  }
  return Promise.all(notes.map(getNoteInfoFromFilename))
}

/**
 * Get the note information from the filename using the metadata.
 *
 * @param {string} fileName - The filename
 * @returns {Promise<object>} - The note information
 */
const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)

  const metadataDir = getMetadataDir()
  await ensureDir(metadataDir)

  const filePath = `${rootDir}/${filename}`
  const metadataFilePath = `${metadataDir}/${filename}.json`
  const fileStats = await stat(filePath)

  let uuid = ''
  try {
    const metadata = await readFile(metadataFilePath, { encoding: fileEncoding })
      .then(JSON.parse)
      .catch(() => ({}))

    if (metadata.id) {
      uuid = metadata.id
    } else {
      uuid = uuidv4()
      const newMetadata = { id: uuid }
      await writeFile(metadataFilePath, JSON.stringify(newMetadata), { encoding: fileEncoding })
    }
  } catch (error) {
    console.error(`Error reading metadata for ${filename}: ${(error as Error).message}`)

    uuid = uuidv4()
    await writeFile(metadataFilePath, JSON.stringify({ id: uuid }), { encoding: fileEncoding })
  }

  return {
    id: uuid,
    title: filename.replace('.md', ''),
    lastEditedTime: fileStats.mtimeMs
  }
}

/**
 * Read a note from the filesystem.
 *
 * @param {string} filename - The filename
 * @returns {Promise<string>} - The note content
 */
const readNote: ReadNote = async (filename: string) => {
  const rootDir = getRootDir()
  return readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
}

/**
 * Write a note to the filesystem.
 *
 * @param {string} filename - The filename
 * @param {string} content - The content
 * @returns {Promise<void>} - A promise that resolves when the note is written
 */
const writeNote: WriteNote = async (filename: string, content: string) => {
  const rootDir = getRootDir()

  console.info(`Writing note ${filename}`)

  return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
}

const createNote: CreateNote = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)

  const metadataDir = getMetadataDir()
  await ensureDir(metadataDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New Note',
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
      message: `All notes must be saved under ${rootDir}. Avoid using other directories!`
    })

    return false
  }

  console.info(`Creating note ${filePath}`)
  await writeFile(filePath, '')

  const uuid = uuidv4()
  const metadataPath = `${metadataDir}/${filename}.json`
  await writeFile(metadataPath, JSON.stringify({ id: uuid }), { encoding: fileEncoding })

  return filename
}

/**
 * Delete a note from the filesystem.
 *
 * @param {string} filename - The filename
 * @returns {Promise<boolean>} - A promise that resolves to true if the note is deleted
 */
const deleteNote: DeleteNote = async (filename: string) => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)

  const metadataDir = getMetadataDir()
  await ensureDir(metadataDir)

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete Note',
    message: `Are you sure you want to delete ${filename}?`,
    buttons: ['Yes', 'No'],
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info('Note deletion canceled')
    return false
  }

  console.info(`Deleting note ${filename}`)
  await remove(`${rootDir}/${filename}.md`)
  await remove(`${metadataDir}/${filename}.json`)
  return true
}

export { createNote, deleteNote, getMetadataDir, getNotes, getRootDir, readNote, writeNote }
