import type { NoteContent, NoteInfo } from './models'

type GetNotes = () => Promise<NoteInfo[]>
type ReadNote = (title: NoteInfo['title']) => Promise<NoteContent>
type WriteNote = (title: NoteInfo['title'], content: NoteContent) => Promise<void>

type CreateNote = () => Promise<NoteInfo['title'] | false>
type DeleteNote = (title: NoteInfo['title']) => Promise<boolean>

export type { GetNotes, ReadNote, WriteNote, CreateNote, DeleteNote }
