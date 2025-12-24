import type { ReactNode, CSSProperties } from 'react'
import styles from './Container.module.css'

interface ContainerProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function Container({ children, className, style }: ContainerProps) {
  return (
    <div
      className={`${styles.container} ${className || ''}`}
      style={style}
    >
      {children}
    </div>
  )
}
