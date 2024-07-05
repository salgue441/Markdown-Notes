import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

/**
 * Sidebar component
 * @component
 *
 * @param className - The Tailwind CSS classes
 * @param children - The children components
 * @param props - The component props
 * @returns The sidebar component
 */
export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside
      className={twMerge('w-[250px] mt-10 h-[100vh + 10px] overflow-auto', className)}
      {...props}
    >
      {children}
    </aside>
  )
}
