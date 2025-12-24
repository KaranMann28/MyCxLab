import { motion } from 'framer-motion'
import { cardHoverVariants } from '@/constants/animations'
import type { ReactNode, CSSProperties } from 'react'
import styles from './Card.module.css'

interface CardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  hoverable?: boolean
}

export function Card({ children, className, style, hoverable = false }: CardProps) {
  if (hoverable) {
    return (
      <motion.div
        className={`${styles.card} ${className || ''}`}
        style={style}
        variants={cardHoverVariants}
        initial="rest"
        whileHover="hover"
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={`${styles.card} ${className || ''}`} style={style}>
      {children}
    </div>
  )
}
