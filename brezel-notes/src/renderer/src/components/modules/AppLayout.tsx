import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentProps<'main'>

/**
 * Defines the root layout component
 *
 * @param {ReactNode} children - The children to render
 * @param {string} className - The class name to apply
 * @param {Props} props - The props to spread to the component
 * @returns {JSX.Element} - The root layout component
 */
export const RootLayout = ({ children, className, ...props }: Props) => {
  return (
    <main className={twMerge('flex flex-row h-screen', className)} {...props}>
      {children}
    </main>
  )
}
