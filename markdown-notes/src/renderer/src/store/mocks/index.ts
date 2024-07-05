import { NoteInfo } from '@shared/models'
import { randomUUID } from 'crypto'

export const notesMock: NoteInfo[] = [
  {
    id: randomUUID(),
    title: 'Welcome 👋🏻',
    lastEditTime: new Date().getTime()
  },
  {
    id: randomUUID(),
    title: 'Getting Started',
    lastEditTime: new Date().getTime()
  },
  {
    id: randomUUID(),
    title: 'Customization Options',
    lastEditTime: new Date().getTime()
  }
]
