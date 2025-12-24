import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { pageVariants } from '@/constants/animations'
import type { ReactNode } from 'react'

interface AnimatedPageProps {
  children: ReactNode
}

export function AnimatedPage({ children }: AnimatedPageProps) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ width: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
