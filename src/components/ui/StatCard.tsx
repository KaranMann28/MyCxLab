import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { gradients } from '@/constants/colors'
import { scaleInVariants } from '@/constants/animations'
import styles from './StatCard.module.css'

interface StatCardProps {
  number: string
  label: string
  delay?: number
}

export function StatCard({ number, label, delay = 0 }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [displayNumber, setDisplayNumber] = useState('0')

  // Animate number counting
  useEffect(() => {
    if (!isInView) return

    // Extract numeric part for animation
    const numericMatch = number.match(/[\d.]+/)
    if (!numericMatch) {
      setDisplayNumber(number)
      return
    }

    const targetNum = parseFloat(numericMatch[0])
    const prefix = number.substring(0, number.indexOf(numericMatch[0]))
    const suffix = number.substring(number.indexOf(numericMatch[0]) + numericMatch[0].length)
    const isFloat = number.includes('.')
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const currentValue = targetNum * easeProgress

      if (isFloat) {
        setDisplayNumber(`${prefix}${currentValue.toFixed(1)}${suffix}`)
      } else {
        setDisplayNumber(`${prefix}${Math.round(currentValue)}${suffix}`)
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayNumber(number)
      }
    }

    const timeout = setTimeout(() => {
      requestAnimationFrame(animate)
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [isInView, number, delay])

  return (
    <motion.div
      ref={ref}
      className={styles.statCard}
      style={{ background: gradients.statCard }}
      variants={scaleInVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay }}
    >
      <motion.div
        className={styles.number}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        {displayNumber}
      </motion.div>
      <div className={styles.label}>{label}</div>
    </motion.div>
  )
}
