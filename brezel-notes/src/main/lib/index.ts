import { NoteInfo } from '@shared/models'
import { GetNotes, ReadNote } from '@shared/types'
import { ensureDir, readFile, readdir, stat, writeFile } from 'fs-extra'
import { isEmpty } from 'lodash'
import { homedir } from 'os'
import { v4 as uuidv4 } from 'uuid'
import { appDirectoryName, fileEncoding, welcomeNoteFileName } from '../../shared/constants'

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

export { getMetadataDir, getNotes, getRootDir, readNote }
