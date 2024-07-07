import { MDXEditorMethods } from '@mdxeditor/editor'
import { saveNoteAtom, selectedNoteAtom } from '@renderer/store'
import { autoSavingTime } from '../../../shared/constants'
import { NoteContent } from '@shared/models'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import { useRef } from 'react'

/**
 * Custom hook to use the markdown editor.
 *
 * @returns {object} - The markdown editor object
 */
export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods>(null)

  /**
   * Handle auto-saving the note content.
   *
   * @param {NoteContent} content - The note content
   * @returns {Promise<void>} - The promise
   *
   * @async
   * @function
   */
  const handleAutoSaving = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) {
        return
      }

      console.info(`Auto-saving note ${selectedNote.title}`)
      await saveNote(content)
    },
    autoSavingTime,
    {
      leading: false,
      trailing: true
    }
  )

  /**
   * Handle the blur event of the editor.
   *
   * @returns {Promise<void>} - The promise
   * @async
   * @function
   */
  const handleBlur = async () => {
    if (!selectedNote) {
      return
    }

    handleAutoSaving.cancel()

    const content = editorRef.current?.getMarkdown()
    if (content != null) {
      await saveNote(content)
    }
  }

  return {
    editorRef,
    selectedNote,
    handleAutoSaving,
    handleBlur
  }
}
