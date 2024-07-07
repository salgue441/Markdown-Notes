import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

/**
 * Defines the content component with a value of
 * forwardRef<HTMLDivElement, ComponentProps<'div'>>
 *
 * @param {ReactNode} children - The children to render
 * @param {string} className - The class name to apply
 * @param {ComponentProps<'div'>} props - The props to spread to the component
 * @returns {JSX.Element} - The content component
 */
export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={twMerge('flex-1 h-full overflow-auto', className)} {...props}>
      {children}
    </div>
  )
)
