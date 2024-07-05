import { ActionButtonRow, Content, RootLayout, Sidebar, DraggableTopBar } from './components'
import {} from './components/generic/ActionButtonRow'

const App = () => {
  return (
    <>
      <DraggableTopBar />

      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonRow className="flex justify-between mt-1" />
        </Sidebar>

        <Content className="border-l bg-zinc-900/50 border-l-white/20">Content</Content>
      </RootLayout>
    </>
  )
}

export default App
