import { cn, formatDate } from '@renderer/utils'
import { NoteInfo } from '@shared/models'
import { UUID } from 'crypto'
import { ComponentProps } from 'react'

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
} & ComponentProps<'div'>

/**
 * Note preview component
 *
 * @param {UUID} id - The note's id
 * @param {string} title - The note's title
 * @param {string} content - The note's content
 * @param {number} lastEditedTime - The note's last edited time
 * @param {boolean} isActive - Whether the note is active
 * @param {string} className - The class name to apply to the component
 * @param {ComponentProps<'div'>} props - The props to spread to the component
 *
 * @returns {JSX.Element} - The note preview component
 */
export const NotePreview = ({
  id,
  title,
  content,
  lastEditedTime,
  isActive = false,
  className,
  ...props
}: NotePreviewProps) => {
  const date = formatDate(lastEditedTime)

  return (
    <div
      className={cn(
        'cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75',
        {
          'bg-zinc-400/75': isActive,
          'hover:bg-zinc-500/75': !isActive
        },
        className
      )}
      {...props}
    >
      <h3 className="mb-1 font-bold truncate">{title}</h3>
      <span className="inline-block w-full mb-2 text-xs font-light text-left">{date}</span>
    </div>
  )
}
