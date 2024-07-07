import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type ActionButtonProps = ComponentProps<'button'>

/**
 * Action button component.
 * @component
 *
 * @param {string} className - The class name to apply
 * @param {ReactNode} children - The children to render
 * @param {Props} props - The props to spread to the component
 * @returns JSX.Element - The action button component
 */
export const ActionButton = ({ className, children, ...props }: ActionButtonProps) => {
  return (
    <button
      className={twMerge(
        'px-2 py-1 rounded-md border border-zinc-400/50 hover:bg-zinc-600/50 transition-colors duration-100',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
