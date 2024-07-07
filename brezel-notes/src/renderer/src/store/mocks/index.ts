import { NoteInfo } from '@shared/models'
import { v4 as uuidv4 } from 'uuid'

export const notesMock: NoteInfo[] = [
  {
    id: uuidv4(),
    title: 'Welcome to Brezel Notes!',
    lastEditedTime: new Date().getTime()
  },
  {
    id: uuidv4(),
    title: 'My first note',
    lastEditedTime: new Date().getTime()
  },
  {
    id: uuidv4(),
    title: 'Another note',
    lastEditedTime: new Date().getTime()
  },
  {
    id: uuidv4(),
    title: 'One more note',
    lastEditedTime: new Date().getTime()
  },
  {
    id: uuidv4(),
    title: 'Final note',
    lastEditedTime: new Date().getTime()
  }
]
