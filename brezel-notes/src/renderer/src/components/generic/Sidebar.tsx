import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

/**
 * Sidebar component
 * @component
 *
 * @param {string} className - The Tailwind CSS classes
 * @param {ReactNode} children - The children components
 * @param {Props} props - The component props
 * @returns {JSX.Element} The sidebar component
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
