import { notesMock } from '@renderer/store/mocks'
import { ComponentProps } from 'react'

export const NotePreviewList = ({ ...props }: ComponentProps<'ul'>) => {
  return (
    <ul {...props}>
      {notesMock.map((note) => (
        <NotePreviewList key={note.id} {...note} />
      ))}
    </ul>
  )
}
