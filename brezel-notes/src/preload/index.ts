import { contextBridge } from 'electron'

if (!process.contextIsolated) {
  throw new Error(
    'contextIsolation must be enabled in the BrowserWindow constructor to use contextBridge'
  )
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language
  })
} catch (error) {
  console.error('Error in preload/index.ts: ', error)
}
