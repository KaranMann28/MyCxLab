import { motion } from 'framer-motion'
import { scaleInVariants, viewportSettings } from '@/constants/animations'
import type { ReactNode, CSSProperties } from 'react'

interface ScaleInProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
}

export function ScaleIn({
  children,
  className,
  style,
  delay = 0
}: ScaleInProps) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={scaleInVariants}
      initial="hidden"
      whileInView="show"
      viewport={viewportSettings}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

// For use inside StaggeredContainer
export function ScaleInChild({
  children,
  className,
  style,
}: Omit<ScaleInProps, 'delay'>) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={scaleInVariants}
    >
      {children}
    </motion.div>
  )
}
