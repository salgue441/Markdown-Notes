import { notesMock } from '@renderer/store/mocks'

export const NotePreviewList = () => {
  return (
    <ul>
      {notesMock.map((note) => (
        <li key={note.id}>{note.title}</li>
      ))}
    </ul>
  )
}
