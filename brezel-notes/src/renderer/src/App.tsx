import {
  Content,
  DraggableTopbar,
  FloatingNoteTitle,
  MarkdownEditor,
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

        <Content className="border-l bg-zinc-900/50 border-l-white/20">
          <FloatingNoteTitle className="pt-2" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
