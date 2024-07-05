import { NoteInfo } from '@shared/models'
import { v4 as uuidv4 } from 'uuid'

export const notesMock: NoteInfo[] = [
  {
    id: uuidv4(),
    title: 'Welcome 👋🏻',
    lastEditTime: new Date().getTime()
  },
  {
    id: uuidv4(),
    title: 'Getting Started',
    lastEditTime: new Date().getTime()
  },
  {
    id: uuidv4(),
    title: 'Customization Options',
    lastEditTime: new Date().getTime()
  }
]
