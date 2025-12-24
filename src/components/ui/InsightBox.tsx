import { motion } from 'framer-motion'
import { borderSlideVariants, viewportSettings } from '@/constants/animations'
import styles from './InsightBox.module.css'

interface InsightBoxProps {
  title: string
  content: string
}

export function InsightBox({ title, content }: InsightBoxProps) {
  return (
    <motion.div
      className={styles.insightBox}
      variants={borderSlideVariants}
      initial="hidden"
      whileInView="show"
      viewport={viewportSettings}
    >
      <motion.h4
        className={styles.title}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportSettings}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h4>
      <motion.p
        className={styles.content}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportSettings}
        transition={{ delay: 0.3 }}
      >
        {content}
      </motion.p>
    </motion.div>
  )
}
