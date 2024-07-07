import {
  Content,
  DraggableTopbar,
  NoteActionsRow,
  NotePreviewList,
  RootLayout,
  Sidebar
} from './components'

function App(): JSX.Element {
  return (
    <>
      <DraggableTopbar />

      <RootLayout>
        <Sidebar className="p-2">
          <NoteActionsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" />
        </Sidebar>

        <Content className="bg-gray-100"></Content>
      </RootLayout>
    </>
  )
}

export default App
