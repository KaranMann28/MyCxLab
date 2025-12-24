import { motion } from 'framer-motion'
import { fadeInUpVariants, viewportSettings } from '@/constants/animations'
import type { ReactNode, CSSProperties } from 'react'

interface FadeInUpProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
  as?: 'div' | 'section' | 'article' | 'aside'
}

export function FadeInUp({
  children,
  className,
  style,
  delay = 0,
  as = 'div'
}: FadeInUpProps) {
  const Component = motion[as]

  return (
    <Component
      className={className}
      style={style}
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="show"
      viewport={viewportSettings}
      transition={{ delay }}
    >
      {children}
    </Component>
  )
}

// Variant for use inside StaggeredContainer (uses parent animation)
export function FadeInUpChild({
  children,
  className,
  style,
}: Omit<FadeInUpProps, 'delay' | 'as'>) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={fadeInUpVariants}
    >
      {children}
    </motion.div>
  )
}
