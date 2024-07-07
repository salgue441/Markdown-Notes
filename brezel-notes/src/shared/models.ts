import { UUID } from 'uuid'

type NoteInfo = {
  id: UUID
  title: string
  lastEditedTime: number
}

type NoteContent = string

export type { NoteInfo, NoteContent }
