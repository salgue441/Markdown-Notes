import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    // electron: typeof ElectronAPI
    context: {}
  }
}
