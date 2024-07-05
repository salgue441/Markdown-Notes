import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { Content } from './generic/Content'

/**
 * Root component.
 * @component
 *
 * @param children - The children components.
 * @param className - The tailwind class name.
 * @param props - The props for the root component.
 * @return The root component.
 */
export const RootLayout = ({ children, className, ...props }: ComponentProps<'main'>) => {
  return (
    <main className={twMerge('flex flex-row h-screen', className)} {...props}>
      {children}
    </main>
  )
}

Content.displayName = 'Content'
