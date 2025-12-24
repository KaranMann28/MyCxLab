import { motion } from 'framer-motion'
import { Card } from '@/components/ui'
import { fadeInUpVariants, viewportSettings } from '@/constants/animations'
import styles from './IntroSection.module.css'

interface IntroSectionProps {
  title: string
  children: React.ReactNode
}

export function IntroSection({ title, children }: IntroSectionProps) {
  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="show"
      viewport={viewportSettings}
    >
      <Card className={styles.intro}>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </Card>
    </motion.div>
  )
}
