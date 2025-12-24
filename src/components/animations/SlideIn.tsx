import { motion } from 'framer-motion'
import { slideInLeftVariants, slideInRightVariants, viewportSettings } from '@/constants/animations'
import type { ReactNode, CSSProperties } from 'react'

interface SlideInProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  direction?: 'left' | 'right'
  delay?: number
}

export function SlideIn({
  children,
  className,
  style,
  direction = 'left',
  delay = 0
}: SlideInProps) {
  const variants = direction === 'left' ? slideInLeftVariants : slideInRightVariants

  return (
    <motion.div
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportSettings}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
