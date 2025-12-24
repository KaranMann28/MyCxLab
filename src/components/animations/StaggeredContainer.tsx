import { motion } from 'framer-motion'
import { viewportSettings } from '@/constants/animations'
import type { ReactNode, CSSProperties } from 'react'

interface StaggeredContainerProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
}

export function StaggeredContainer({
  children,
  className,
  style,
  delay = 0.1
}: StaggeredContainerProps) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: delay,
            delayChildren: 0.2,
          },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={viewportSettings}
    >
      {children}
    </motion.div>
  )
}
