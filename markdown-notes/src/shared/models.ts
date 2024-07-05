import { UUID } from 'crypto'

export type NoteInfo = {
  id: UUID
  title: string
  lastEditTime: number
}

export type NoteContent = string
