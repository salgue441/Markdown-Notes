import { contextBridge } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserMenu')
}

try {
  contextBridge.exposeInMainWorld('context', {
    // TODO: Add your preload functions here
  })
} catch (error) {
  console.error('preload/index.ts', error)
}
