import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

/**
 * Content component.
 * @component
 *
 * @param {ComponentProps<'div'>} props - The props.
 * @param {string} [props.className] - The class name.
 * @param {ReactNode} [props.children] - The children.
 *
 * @returns {JSX.Element} The content component.
 */
export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={twMerge('flex-1 h-full overflow-auto', className)} {...props}>
      {children}
    </div>
  )
)
